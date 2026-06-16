import { readFileSync, writeFileSync } from "node:fs";

const files = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/features/page.tsx",
  "app/how-it-works/page.tsx",
  "app/contact/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/components/HorizontalScroll.tsx",
  "app/components/Footer.tsx",
  "app/components/NewsletterForm.tsx",
  "app/components/ContactForm.tsx",
  "app/components/ThemeToggle.tsx",
];

const replacements = [
  [/\bborder-white\/5\b/g, "border-line"],
  [/\bborder-white\/10\b/g, "border-line-strong"],
  [/\bborder-white\/\[0\.05\]/g, "border-line"],
  [/bg-white\/\[0\.015\]/g, "bg-surface"],
  [/bg-white\/\[0\.02\]/g, "bg-surface"],
  [/bg-white\/\[0\.025\]/g, "bg-surface"],
  [/bg-white\/\[0\.03\]/g, "bg-surface"],
  [/bg-white\/\[0\.04\]/g, "bg-surface-strong"],
  [/bg-white\/\[0\.05\]/g, "bg-surface-strong"],
  [/bg-white\/\[0\.06\]/g, "bg-surface-strong"],
  [/hover:bg-white\/\[0\.015\]/g, "hover:bg-surface"],
  [/hover:bg-white\/\[0\.02\]/g, "hover:bg-surface"],
  [/hover:bg-white\/\[0\.025\]/g, "hover:bg-surface"],
  [/hover:bg-white\/\[0\.04\]/g, "hover:bg-surface-strong"],
  [/\bbg-white\/5\b/g, "bg-line"],
  [/bg-\[#05060a\]/g, "bg-background"],
  [/text-\[#05060a\]/g, "text-background"],
  [/bg-black\/40/g, "bg-background/40"],
  [/bg-black\/60/g, "bg-background/60"],
];

for (const file of files) {
  const before = readFileSync(file, "utf8");
  let after = before;
  for (const [re, sub] of replacements) {
    after = after.replace(re, sub);
  }
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    console.log("updated", file);
  } else {
    console.log("unchanged", file);
  }
}
