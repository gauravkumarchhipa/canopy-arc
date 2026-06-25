-- Footer CMS schema for Canopy Arc
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.footer_settings (
  id int primary key default 1 check (id = 1),
  description text not null,
  copyright text not null,
  follow_us_label text not null default 'Follow Us',
  follow_us_visible boolean not null default true,
  newsletter_title text not null default 'Stay Updated',
  newsletter_text text not null,
  newsletter_visible boolean not null default true,
  support_title text not null default 'Need Support?',
  support_text text not null,
  support_link_label text not null default 'Contact Support',
  support_link_href text not null default '/contact',
  support_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.footer_contact_items (
  id uuid primary key default gen_random_uuid(),
  item_key text not null unique check (item_key in ('address', 'email', 'phone', 'hours')),
  value text not null,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.footer_social_links (
  id uuid primary key default gen_random_uuid(),
  platform_id text not null unique,
  label text not null,
  href text not null,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.footer_columns (
  id uuid primary key default gen_random_uuid(),
  heading text not null,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.footer_column_links (
  id uuid primary key default gen_random_uuid(),
  column_id uuid not null references public.footer_columns (id) on delete cascade,
  label text not null,
  href text not null,
  badge text,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.footer_bottom_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Row Level Security (public read for site visitors)
-- ---------------------------------------------------------------------------

alter table public.footer_settings enable row level security;
alter table public.footer_contact_items enable row level security;
alter table public.footer_social_links enable row level security;
alter table public.footer_columns enable row level security;
alter table public.footer_column_links enable row level security;
alter table public.footer_bottom_links enable row level security;

create policy "footer_settings_public_read"
  on public.footer_settings for select
  using (true);

create policy "footer_contact_public_read"
  on public.footer_contact_items for select
  using (is_visible = true);

create policy "footer_social_public_read"
  on public.footer_social_links for select
  using (is_visible = true);

create policy "footer_columns_public_read"
  on public.footer_columns for select
  using (is_visible = true);

create policy "footer_column_links_public_read"
  on public.footer_column_links for select
  using (is_visible = true);

create policy "footer_bottom_links_public_read"
  on public.footer_bottom_links for select
  using (is_visible = true);

-- ---------------------------------------------------------------------------
-- Seed data (matches app/content/layout/footer.json)
-- ---------------------------------------------------------------------------

insert into public.footer_settings (
  id,
  description,
  copyright,
  follow_us_label,
  follow_us_visible,
  newsletter_title,
  newsletter_text,
  newsletter_visible,
  support_title,
  support_text,
  support_link_label,
  support_link_href,
  support_visible
) values (
  1,
  'We build innovative, scalable and future-ready digital solutions that empower businesses to grow, adapt and succeed in the digital world.',
  'Canopy Arc. Enterprise-grade tech. World-class delivery.',
  'Follow Us',
  true,
  'Stay Updated',
  'Subscribe to our newsletter and get the latest updates, insights and exclusive offers.',
  true,
  'Need Support?',
  'We''re here to help 24/7. Get in touch!',
  'Contact Support',
  '/contact',
  true
) on conflict (id) do nothing;

insert into public.footer_contact_items (item_key, value, is_visible, sort_order) values
  ('address', E'123 Innovation Drive,\nTech City, CA 94043, USA', true, 1),
  ('email', 'hello@canopyarc.com', true, 2),
  ('phone', '+1 (415) 123-4567', true, 3),
  ('hours', 'Mon – Fri: 9:00 AM – 6:00 PM', true, 4)
on conflict (item_key) do nothing;

insert into public.footer_social_links (platform_id, label, href, is_visible, sort_order) values
  ('linkedin', 'LinkedIn', '#', true, 1),
  ('x', 'X', '#', true, 2),
  ('github', 'GitHub', '#', true, 3),
  ('instagram', 'Instagram', '#', true, 4),
  ('youtube', 'YouTube', '#', true, 5)
on conflict (platform_id) do nothing;

-- Columns (stable ids for link seeding)
insert into public.footer_columns (id, heading, is_visible, sort_order) values
  ('a1000000-0000-4000-8000-000000000001', 'Company', true, 1),
  ('a1000000-0000-4000-8000-000000000002', 'Services', true, 2),
  ('a1000000-0000-4000-8000-000000000003', 'Industries', true, 3),
  ('a1000000-0000-4000-8000-000000000004', 'Resources', true, 4)
on conflict (id) do nothing;

insert into public.footer_column_links (column_id, label, href, badge, is_visible, sort_order) values
  ('a1000000-0000-4000-8000-000000000001', 'About Us', '/about', null, true, 1),
  ('a1000000-0000-4000-8000-000000000001', 'Our Team', '/team', null, true, 2),
  ('a1000000-0000-4000-8000-000000000001', 'Our Work', '/work', null, true, 3),
  ('a1000000-0000-4000-8000-000000000001', 'Careers', '/careers', 'We''re Hiring', true, 4),
  ('a1000000-0000-4000-8000-000000000001', 'Blog', '/blog', null, true, 5),
  ('a1000000-0000-4000-8000-000000000001', 'Contact Us', '/contact', null, true, 6),
  ('a1000000-0000-4000-8000-000000000002', 'Web Development', '/services/web-development', null, true, 1),
  ('a1000000-0000-4000-8000-000000000002', 'Mobile Apps', '/services/app-development', null, true, 2),
  ('a1000000-0000-4000-8000-000000000002', 'AI & ML Solutions', '/services/ai-ml', null, true, 3),
  ('a1000000-0000-4000-8000-000000000002', 'Cloud & DevOps', '/services/cloud-devops', null, true, 4),
  ('a1000000-0000-4000-8000-000000000002', 'UI/UX Design', '/services/ui-ux-design', null, true, 5),
  ('a1000000-0000-4000-8000-000000000002', 'QA & Automation', '/services/qa-automation', null, true, 6),
  ('a1000000-0000-4000-8000-000000000003', 'Fintech', '/work?industry=fintech', null, true, 1),
  ('a1000000-0000-4000-8000-000000000003', 'Healthcare', '/work?industry=healthcare', null, true, 2),
  ('a1000000-0000-4000-8000-000000000003', 'E-Commerce', '/work?industry=ecommerce', null, true, 3),
  ('a1000000-0000-4000-8000-000000000003', 'Education', '/work?industry=education', null, true, 4),
  ('a1000000-0000-4000-8000-000000000003', 'Real Estate', '/work?industry=realestate', null, true, 5),
  ('a1000000-0000-4000-8000-000000000003', 'Logistics', '/work?industry=logistics', null, true, 6),
  ('a1000000-0000-4000-8000-000000000004', 'Case Studies', '/work', null, true, 1),
  ('a1000000-0000-4000-8000-000000000004', 'Whitepapers', '/blog', null, true, 2),
  ('a1000000-0000-4000-8000-000000000004', 'FAQs', '/faq', null, true, 3),
  ('a1000000-0000-4000-8000-000000000004', 'Support Center', '/contact', null, true, 4);

insert into public.footer_bottom_links (label, href, is_visible, sort_order) values
  ('Privacy Policy', '/privacy', true, 1),
  ('Terms of Service', '/terms', true, 2),
  ('Cookie Policy', '/cookies', true, 3);
