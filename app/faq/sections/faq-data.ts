export type FaqItem = {
  q: string;
  a: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const SECTIONS: FaqSection[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do we start a project with Canopy Arc?",
        a: "Book a discovery call or send us a brief through the contact page. We review your goals, timeline, and budget, then share a scoped proposal with milestones, deliverables, and a clear next step — usually within two business days.",
      },
      {
        q: "What information should we prepare before the first call?",
        a: "A short overview of your product or business problem, target users, must-have features, any existing systems or designs, and your ideal launch window. Rough notes are fine — we help shape the rest.",
      },
      {
        q: "Do you work with startups as well as established companies?",
        a: "Yes. We partner with early-stage founders building MVPs and with enterprises modernizing legacy platforms. The engagement model scales — from focused sprints to long-term product teams.",
      },
      {
        q: "Can you join an project already in progress?",
        a: "Often, yes. We audit the codebase, delivery process, and roadmap first, then recommend whether to stabilize, extend, or rebuild. We only take over when we can add clear value without unnecessary risk.",
      },
    ],
  },
  {
    title: "Services & delivery",
    items: [
      {
        q: "What services does Canopy Arc offer?",
        a: "Web and mobile development, AI and automation, cloud and DevOps, UI/UX design, and e-commerce or SaaS platforms. See our Services page for the full list and case studies tied to each capability.",
      },
      {
        q: "Do you provide design as well as development?",
        a: "Yes. We can handle research, wireframes, visual design, and design systems — or work from your existing Figma files. Design and engineering stay aligned so what ships matches what was approved.",
      },
      {
        q: "How do you handle project communication?",
        a: "A dedicated point of contact, weekly progress updates, and a shared channel (Slack, Teams, or email — your preference). You get visibility into tasks, demos, and blockers without daily micromanagement.",
      },
      {
        q: "Will we own the code and assets when the project ends?",
        a: "Yes. Upon final payment, you receive full ownership of custom code, designs, and documentation produced for your engagement, unless otherwise agreed in writing for licensed third-party components.",
      },
    ],
  },
  {
    title: "Technology & process",
    items: [
      {
        q: "Which technologies do you typically use?",
        a: "Modern stacks such as Next.js, React, React Native, Node.js, PostgreSQL, Redis, and cloud platforms like AWS and Vercel. We choose tools based on your product needs, team skills, and long-term maintainability — not trends alone.",
      },
      {
        q: "What does your development process look like?",
        a: "Discovery → architecture and scope → iterative sprints with demos → QA and staging → production launch → post-launch support. Each phase has defined outputs so you always know what was delivered and what comes next.",
      },
      {
        q: "Do you follow agile or fixed-scope delivery?",
        a: "Both, depending on the project. MVPs and evolving products usually run on agile sprints. Well-defined builds with fixed requirements can use milestone-based fixed scope. We recommend the model that fits your risk and timeline.",
      },
      {
        q: "How do you ensure quality before launch?",
        a: "Code review, automated tests where appropriate, cross-browser and device checks, performance passes, and staging sign-off. Critical flows — auth, payments, data — get extra scrutiny before anything reaches production.",
      },
    ],
  },
  {
    title: "Timelines & pricing",
    items: [
      {
        q: "How long does a typical project take?",
        a: "A focused MVP often takes 8–14 weeks. Larger platforms or multi-surface products may run several months in phases. After discovery we give a realistic range — not a guess — tied to agreed scope.",
      },
      {
        q: "How is pricing structured?",
        a: "Fixed-price milestones for defined scope, or monthly retainers for ongoing product work. Every quote breaks down what is included, what is out of scope, and how change requests are handled so there are no surprise invoices.",
      },
      {
        q: "Can we start small and expand later?",
        a: "Yes — that is our recommended approach for many clients. Launch a solid v1, learn from users, then add features in planned phases. Architecture is built to grow so early work is not throwaway.",
      },
      {
        q: "Do you offer ongoing maintenance after launch?",
        a: "Yes. We offer support retainers for bug fixes, security updates, monitoring, and feature enhancements. Terms and response times are defined upfront so your product stays healthy after go-live.",
      },
    ],
  },
  {
    title: "Security & compliance",
    items: [
      {
        q: "How do you handle data security?",
        a: "Encryption in transit and at rest, least-privilege access, secure secrets management, and environment separation (dev/staging/production). We follow OWASP-minded practices and can align with your internal security requirements.",
      },
      {
        q: "Can you sign an NDA before we share details?",
        a: "Yes. We routinely sign NDAs before reviewing proprietary systems, roadmaps, or sensitive business data. Ask on the contact form and we will send a standard agreement or work with yours.",
      },
      {
        q: "Do you work with regulated industries?",
        a: "We have experience building for fintech, healthcare-adjacent, and enterprise contexts where audit trails, access control, and data handling matter. Specific compliance (e.g. HIPAA, SOC 2) depends on scope — we discuss requirements during discovery.",
      },
    ],
  },
  {
    title: "Support & contact",
    items: [
      {
        q: "What are your support hours?",
        a: "Core team hours are Monday–Friday, 9:00 AM–6:00 PM in our primary timezone. Critical production issues on support plans receive prioritized response windows as defined in your agreement.",
      },
      {
        q: "How quickly do you respond to new inquiries?",
        a: "We aim to reply to all contact form and email inquiries within two business days — usually sooner. Urgent production issues for active support clients are handled per your SLA.",
      },
      {
        q: "Where are you located? Do you work remotely?",
        a: "We are a distributed team working with clients globally. Discovery, demos, and standups run over video — timezone overlap is planned so collaboration stays smooth without constant late-night calls.",
      },
    ],
  },
];
