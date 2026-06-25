import { cache } from "react";
import { createSupabaseServerClient } from "../supabase/server";
import { getFooterFallback } from "./fallback";
import type { FooterContact, FooterData } from "./types";

type ContactKey = keyof FooterContact;

function buildContact(
  rows: { item_key: string; value: string }[] | null,
): FooterContact {
  const contact: FooterContact = {};

  for (const row of rows ?? []) {
    if (row.item_key === "address") contact.address = row.value;
    if (row.item_key === "email") contact.email = row.value;
    if (row.item_key === "phone") contact.phone = row.value;
    if (row.item_key === "hours") contact.hours = row.value;
  }

  return contact;
}

async function fetchFooterFromSupabase(): Promise<FooterData | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const [
    settingsResult,
    contactResult,
    socialResult,
    columnsResult,
    columnLinksResult,
    bottomLinksResult,
  ] = await Promise.all([
    supabase.from("footer_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("footer_contact_items")
      .select("item_key, value")
      .order("sort_order"),
    supabase
      .from("footer_social_links")
      .select("platform_id, label, href")
      .order("sort_order"),
    supabase.from("footer_columns").select("id, heading").order("sort_order"),
    supabase
      .from("footer_column_links")
      .select("column_id, label, href, badge")
      .order("sort_order"),
    supabase
      .from("footer_bottom_links")
      .select("label, href")
      .order("sort_order"),
  ]);

  if (settingsResult.error) {
    const message = settingsResult.error.message ?? "Unknown Supabase error";
    if (settingsResult.error.code === "PGRST205") {
      console.warn(
        "[footer] Supabase tables not found. Run supabase/migrations/001_footer_schema.sql in the SQL Editor.",
      );
    } else {
      console.error("[footer] settings fetch failed:", message, settingsResult.error);
    }
    return null;
  }

  if (!settingsResult.data) {
    console.warn(
      "[footer] footer_settings is empty. Run supabase/migrations/001_footer_schema.sql to seed data.",
    );
    return null;
  }

  const settings = settingsResult.data;

  const linksByColumn = new Map<string, FooterData["columns"][number]["links"]>();
  for (const link of columnLinksResult.data ?? []) {
    const existing = linksByColumn.get(link.column_id) ?? [];
    existing.push({
      label: link.label,
      href: link.href,
      badge: link.badge,
    });
    linksByColumn.set(link.column_id, existing);
  }

  const columns = (columnsResult.data ?? [])
    .map((column) => ({
      heading: column.heading,
      links: linksByColumn.get(column.id) ?? [],
    }))
    .filter((column) => column.links.length > 0);

  return {
    description: settings.description,
    copyright: settings.copyright,
    followUsLabel: settings.follow_us_label,
    followUsVisible: settings.follow_us_visible,
    contact: buildContact(contactResult.data),
    social: (socialResult.data ?? []).map((item) => ({
      id: item.platform_id,
      label: item.label,
      href: item.href,
    })),
    columns,
    bottomLinks: bottomLinksResult.data ?? [],
    newsletter: settings.newsletter_visible
      ? {
          title: settings.newsletter_title,
          text: settings.newsletter_text,
        }
      : null,
    support: settings.support_visible
      ? {
          title: settings.support_title,
          text: settings.support_text,
          linkLabel: settings.support_link_label,
          linkHref: settings.support_link_href,
        }
      : null,
  };
}

export const getFooterData = cache(async (): Promise<FooterData> => {
  try {
    const fromDb = await fetchFooterFromSupabase();
    if (fromDb) {
      return fromDb;
    }
  } catch (error) {
    console.error("[footer] Supabase fetch error:", error);
  }

  return getFooterFallback();
});

export async function getFooterContact(): Promise<FooterContact> {
  const data = await getFooterData();
  return data.contact;
}

export function getFooterContactValue(
  contact: FooterContact,
  key: ContactKey,
): string | undefined {
  return contact[key];
}
