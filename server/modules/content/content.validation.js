import { z } from 'zod';

const text = (max = 3000) => z.string().trim().max(max);
const textList = (maxItems = 30, maxLength = 250) => z.array(text(maxLength)).max(maxItems);

const ctaSchema = z.object({ label: text(80), href: text(300) });
const siteContentSchema = z.object({
  identity: z.object({
    name: text(100),
    title: text(140),
    roles: textList(10, 80),
    brandSentence: text(300),
    linkedin: z.union([z.string().url(), z.literal('')]),
    email: z.string().email(),
    github: z.union([z.string().url(), z.literal('')]),
  }),
  hero: z.object({
    kicker: text(160),
    headline: text(220),
    sub: text(600),
    tags: textList(20, 80),
    ctaPrimary: ctaSchema,
    ctaSecondary: ctaSchema,
  }),
  about: z.object({
    eyebrow: text(80),
    heading: text(250),
    intro: text(800),
    paragraphs: textList(10, 1000),
    distinctive: textList(20, 300),
    motto: text(500),
  }),
  whyMe: z.object({ eyebrow: text(80), heading: text(250), intro: text(1000) }),
  engineeringPhilosophy: z.object({
    eyebrow: text(80),
    heading: text(250),
    intro: text(1000),
    steps: z.array(z.object({ key: text(60), label: text(100), detail: text(500) })).max(20),
  }),
  stackMeta: z.object({ eyebrow: text(80), heading: text(250), body: text(1000) }),
  stack: z.array(z.object({ group: text(100), items: textList(40, 100) })).max(20),
  experience: z.object({
    eyebrow: text(80),
    heading: text(250),
    intro: text(1000),
    role: text(160),
    badge: text(100),
    company: text(160),
    period: text(100),
    summary: text(1200),
  }),
  leadership: z.object({ items: textList(30, 300) }),
  servicesMeta: z.object({ eyebrow: text(80), heading: text(250), body: text(1000) }),
  services: z.array(z.object({ id: text(100), title: text(160), description: text(800) })).max(30),
  contact: z.object({ eyebrow: text(80), heading: text(250), body: text(1200), ctaLabel: text(100) }),
});

export const updateContentSchema = z.object({
  body: siteContentSchema,
  params: z.object({}),
  query: z.object({}),
});
