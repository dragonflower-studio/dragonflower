import { createReadStream, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { LexoRank } from "lexorank";

const client = getCliClient({ apiVersion: "2024-10-01" });
const PUBLIC = path.join(process.cwd(), "public");

let rankCursor = LexoRank.min();
function nextRank(): string {
  rankCursor = rankCursor.genNext();
  return rankCursor.toString();
}

const assetCache = new Map<string, string>();

async function fig(file: string, alt = "") {
  const abs = path.join(PUBLIC, file);
  let id = assetCache.get(abs);
  if (!id) {
    const filename = path.basename(abs);
    if (existsSync(abs)) {
      const asset = await client.assets.upload("image", createReadStream(abs), {
        filename,
      });
      id = asset._id;
      console.log("uploaded", file);
    } else {
      id = await client.fetch(
        '*[_type == "sanity.imageAsset" && originalFilename == $filename] | order(_createdAt desc)[0]._id',
        { filename },
      );
      if (!id) throw new Error(`Image not found on disk or in Sanity: ${file}`);
    }
    assetCache.set(abs, id);
  }
  return { _type: "image", asset: { _type: "reference", _ref: id }, alt };
}

function lnk(label: string, href: string, newTab = false) {
  return { _type: "link", label, href, newTab };
}

function keyed<T extends object>(items: T[]) {
  return items.map((item) => ({ _key: randomUUID(), ...item }));
}

async function logo(file: string, alt: string, scale = 1) {
  return { _type: "brandLogo", _key: randomUUID(), image: await fig(file, alt), scale };
}

const LOREM_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_APPROACH = [
  { title: "Lorem ipsum", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." },
  { title: "Dolor sit amet", body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo." },
  { title: "Consectetur", body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla." },
];

async function ctaBlock(heading: string) {
  return {
    _type: "ctaBlock",
    heading,
    image: await fig("founder.webp", "Bruno Olmedo Quiroga, founder of Dragonflower"),
    button: lnk("Let's talk", "/contact"),
  };
}

async function build() {
  const docs: Record<string, unknown>[] = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Dragonflower Studio",
    navLinks: keyed([
      lnk("Practice", "/practice"),
      lnk("Work", "/work"),
      lnk("About", "/about"),
      lnk("Contact", "/contact"),
    ]),
    bookCall: lnk("Book a call", "/contact"),
    footerLead: "Have a story worth telling?",
    email: "hello@dragonflower.studio",
    socialLinks: keyed([
      lnk("LinkedIn", "https://www.linkedin.com", true),
      lnk("Instagram", "https://www.instagram.com", true),
      lnk("X", "https://www.x.com", true),
    ]),
  });

  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "Dragonflower is a strategic research and narrative design studio.",
    heroBody:
      "We uncover the human truths within complex systems and turn them into stories, strategies, and movements people can believe in.",
    heroPrimary: lnk("Book a call", "/contact"),
    clientsLabel: "Clients & collaborators",
    breatherStatement: "We turn complexity into clarity — without losing the magic.",
    breatherLead:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris.",
    breatherCta: lnk("Our story", "/about"),
    founderName: "Bruno Olmedo Quiroga",
    founderRole: "Founder",
    founderPortrait: await fig("founder.webp", "Portrait of Bruno Olmedo Quiroga, founder of Dragonflower"),
    showcaseDesktop: await fig("testimonials-desktop.webp", ""),
    showcaseMobile: await fig("testimonials-mobile.webp", ""),
    testimonialsLabel: "Testimonials",
    testimonialsCta: lnk("Book an intro call", "/contact"),
    workHeading: "Selected work",
    practiceIntroHeading: "Our work sits at the intersection of inquiry and imagination",
    practiceOverviewStatement: "One studio, three practices.",
    cta: await ctaBlock("We partner with those who believe complexity deserves beauty."),
  });

  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    heroHeading: "Change requires belief. Belief requires clarity.",
    heroCopy: "Dragonflower was born to humanize complexity that has the power to change the world.",
    heroCta: lnk("Let's work together", "/contact"),
    studioTitle: "The studio",
    studioLead:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    studioBody:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    founderBio:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
    founderName: "Bruno Olmedo Quiroga",
    founderRole: "Founder",
    studioPortrait: await fig("founder.webp", "Portrait of Bruno Olmedo Quiroga, founder of Dragonflower"),
    transformHeading: "We believe clarity is an act of creation that shifts reality",
    transformPairs: keyed([
      { _type: "transformPair", from: "Confusion", to: "Conviction", description: "We turn tangled complexity into a clear point of view people can act on." },
      { _type: "transformPair", from: "Data", to: "Desire", description: "We move past the numbers to the human wants that make people care." },
      { _type: "transformPair", from: "Insight", to: "Story", description: "We shape raw understanding into a narrative that carries meaning." },
      { _type: "transformPair", from: "Noise", to: "Myth", description: "We cut through the noise to build the enduring story a brand is known by." },
    ]),
    methodTitle: "The method",
    methodSteps: keyed([
      { _type: "methodStep", name: "Research", promise: "reveals the human truth", capabilities: "Qualitative interviews, landscape mapping, synthesis, workshops" },
      { _type: "methodStep", name: "Strategy", promise: "ensures it moves through the world", capabilities: "Narrative toolkits, playbooks, creative strategies, frameworks, campaigns" },
      { _type: "methodStep", name: "Narrative", promise: "builds the story around it", capabilities: "Positioning, architecture, storytelling, brand narrative, pitch decks" },
    ]),
    methodCta: lnk("Read more about the practice", "/practice"),
    cta: await ctaBlock("We turn complexity into clarity — without losing the magic."),
  });

  docs.push({
    _id: "workPage",
    _type: "workPage",
    heroTitle: "Clarity in practice",
    heroSub: "Research, narrative, and strategy.",
    cta: await ctaBlock("Change requires belief. Belief requires clarity."),
  });

  docs.push({
    _id: "practicePage",
    _type: "practicePage",
    heroMeta: "One studio, three practices",
    heroTitle: "Our work sits at the intersection of inquiry and imagination",
    heroSub:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cta: await ctaBlock("We partner with those who believe complexity deserves beauty."),
  });

  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Lorem ipsum dolor sit amet consectetur.",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris.",
    calendlyUrl: "https://calendly.com/dragonflower",
    calendlyLabel: "Book a call",
    writeLabel: "Write to us",
  });

  docs.push({
    _id: "notFoundPage",
    _type: "notFoundPage",
    code: "Error 404",
    heading: "This page isn’t here.",
    copy: "The link may be broken, or the page may have moved. Everything else is still where you left it.",
    buttonLabel: "Back home",
  });

  const clients: [string, string, number][] = [
    ["logos/ideo.svg", "IDEO", 1],
    ["logos/harvard.webp", "Harvard Chan Center", 1.7],
    ["logos/good-energy.png", "Good Energy", 1.4],
    ["logos/netflix.png", "Netflix", 1],
    ["logos/disney.svg", "Disney", 1],
    ["logos/ethereum.png", "Ethereum Foundation", 1],
    ["logos/we3.png", "WE3", 1.55],
    ["logos/espresso.webp", "Espresso", 1],
    ["logos/shift.webp", "Shift Naturals", 1],
  ];
  for (const [file, name, scale] of clients) {
    docs.push({
      _id: `client.${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      _type: "client",
      name,
      logo: await fig(file, name),
      scale,
      orderRank: nextRank(),
    });
  }

  const testimonials: [string, string][] = [
    ["This is so clear and at the same time so deep. I feel like I'm walking into a mind castle.", "Fintech Executive, CSO"],
    ["I told my boss this wouldn't be possible. But in two sentences, it became possible.", "Fintech Legal Counsel"],
    ["The complexity and aspiration of why we exist is perfectly captured by that sentence.", "Food & Bev Founder, CEO"],
  ];
  testimonials.forEach(([quote, source], i) => {
    docs.push({ _id: `testimonial.${i}`, _type: "testimonial", quote, source, orderRank: nextRank() });
  });

  docs.push({
    _id: "project.ethereum",
    _type: "project",
    title: "Ethereum — Project Mirror",
    slug: { _type: "slug", current: "ethereum" },
    orderRank: nextRank(),
    featuredOnHome: true,
    cardHeader: "Understanding Ethereum's current narrative tensions and opportunities",
    cardSubheader: "Project Mirror",
    cardLogos: [
      await logo("logos/ethereum.png", "Ethereum Foundation", 1),
      await logo("logos/optimism.webp", "Optimism", 1.5),
      await logo("logos/espresso.webp", "Espresso", 1),
    ],
    cardImage: await fig("work-ethereum.webp", "Ethereum, Project Mirror"),
    theme: "theme-cream",
    indexTagline:
      "A research-driven reflection on how Ethereum sees itself, how others see it, and how that story shapes the ecosystem's future.",
    indexBody: [
      "Commissioned by Optimism and Espresso, and supported by the Ethereum Foundation, Project Mirror captured 60+ voices across the ecosystem — from builders to policymakers — to understand how Ethereum's identity, momentum, and myth were evolving.",
      "The work revealed five defining shifts and surfaced core tensions like The Loss in Translation and The Neutrality Dilemma, reframing the network's “crisis” as an inflection point for renewed belief.",
    ],
    indexImage: await fig("work-ethereum.webp", "Ethereum, Project Mirror"),
    hasDetailPage: true,
    detailTagline:
      "A reflection on how Ethereum sees itself, how others see it — and how that gap shapes its future.",
    detailCollaborators:
      "A collaboration with the Ethereum Foundation, Optimism, and Espresso Systems.",
    detailImage: await fig("work-ethereum.webp", "Ethereum, Project Mirror"),
    chapters: keyed([
      {
        _type: "chapter",
        label: "The Challenge",
        lead: "Ethereum has become the most powerful yet least understood ecosystem in web3.",
        emphasis: "Technically unmatched. Narratively undefined.",
        paragraphs: [
          "Ethereum's code scaled faster than its story, and the gap between the two became emotional — especially as credible competitors with sharp messaging emerged in the category Ethereum created.",
          "The Foundation needed to understand how Ethereum's identity was evolving, and how its core belief in neutrality may continue to inspire conviction instead of creating distance.",
        ],
      },
      {
        _type: "chapter",
        label: "The Process",
        paragraphs: [
          "Through more than sixty interviews — from protocol engineers to investors to policymakers — we followed the invisible questions under every answer: What is the narrative around Ethereum today?",
          "Patterns emerged: neutrality versus leadership, adaptability versus clarity, silence versus influence.",
          "Rather than resolve the contradictions, we gave them names. The Lost in Translation. The Neutrality Dilemma. The Culture Moat.",
        ],
      },
      {
        _type: "chapter",
        label: "The Outcome",
        paragraphs: [
          "The work clarified Ethereum's narrative fractures and helped leadership bridge them with strategic precision. It provided a shared vocabulary for how neutrality, leadership, and belief should coexist. Project Mirror also became the first qualitative research report ever published by the Ethereum Foundation.",
        ],
      },
      {
        _type: "chapter",
        label: "The Impact",
        paragraphs: [
          "The process became as meaningful as the findings. It was the first time the ecosystem had stopped to listen to itself. And what was initially scoped as a confidential report was made public by leadership.",
        ],
        quotes: [
          "Thank you for listening to me. This felt like therapy.",
          "I wouldn't say I learned something new, but I don't think our challenges have ever been so clearly articulated in one place.",
          "Let's open source it. This has massive potential to teach our team leads and ecosystem teams on how to think about branding and users.",
        ],
      },
    ]),
    snapshotsHeading: "Work Snapshots",
    snapshotsCaption: "Frameworks and insights that made Ethereum's invisible dynamics visible.",
    snapshotsImages: keyed([
      await fig("work-ethereum-map.webp", "Project Mirror framework mapping Ethereum's ecosystem archetypes"),
      await fig("work-ethereum-tension.webp", "Project Mirror framework on the Neutrality Dilemma tension"),
    ]),
  });

  docs.push({
    _id: "project.good-energy",
    _type: "project",
    title: "Good Energy — Climate Reality Check",
    slug: { _type: "slug", current: "good-energy" },
    orderRank: nextRank(),
    featuredOnHome: true,
    cardHeader: "Revealing how climate shows up across film and television, and how it can do better",
    cardSubheader: "Climate Reality Check",
    cardLogos: [await logo("logos/good-energy.png", "Good Energy", 1.4)],
    cardImage: await fig("good-energy.webp", "Good Energy, Climate Reality Check"),
    theme: "theme-surface",
    indexTagline:
      "A diagnostic tool revealing how climate shows up across film and television — and how it can do better.",
    indexBody: [
      "Partnering with Good Energy, Dragonflower led research design and narrative strategy for The Climate Reality Check, a first-of-its-kind framework assessing climate presence in popular culture.",
      "We mapped hundreds of scripts, storylines, and character arcs to identify narrative blind spots and emotional levers that shape public perception. The work turned abstract “representation gaps” into a living system of questions — now used by studios and writers to tell stories that make climate reality visible.",
    ],
    indexImage: await fig("good-energy.webp", "Good Energy, Climate Reality Check"),
    hasDetailPage: false,
  });

  docs.push({
    _id: "project.plaid",
    _type: "project",
    title: "Plaid — Linkless Initiative",
    slug: { _type: "slug", current: "plaid" },
    orderRank: nextRank(),
    featuredOnHome: true,
    cardHeader: "A new language of trust for the future of credit",
    cardSubheader: "Linkless Initiative",
    cardLogos: [await logo("logos/plaid.png", "Plaid", 1)],
    cardImage: await fig("work-plaid.webp", "Plaid, Linkless Initiative"),
    theme: "theme-cream",
    indexTagline: "A new language of trust for the future of credit.",
    indexBody: [
      "As lead researcher and designer, Dragonflower helped Plaid reimagine how people share their financial lives. The Linkless Initiative enables consumers to share verified cash-flow data as easily as they share credit reports — no bank logins, no friction.",
      "Through qualitative research, prototyping, and systems design, we shaped the user experience and narrative around Linkless, defining what transparent, user-controlled credit could look like.",
      "The result reframes Plaid's central question from Can we connect? to Can we be trusted?",
    ],
    indexImage: await fig("work-plaid.webp", "Plaid, Linkless Initiative"),
    hasDetailPage: false,
  });

  const practices = [
    {
      id: "research",
      number: "01",
      title: "Research",
      promise: "We uncover the truths that move people and systems.",
      homeBody: "Through deep qualitative work — interviews, synthesis, landscape mapping — we reveal the human tensions behind complex change.",
      homeTheme: "theme-violet",
      detailTheme: "theme-cream",
      overviewLead: "Through deep qualitative work — interviews, synthesis, landscape mapping — we reveal the human tensions behind complex change.",
      capabilities: ["Qualitative interviews", "Landscape mapping", "Synthesis", "Workshops"],
      image: "practice-research-landscape.webp",
    },
    {
      id: "strategy",
      number: "02",
      title: "Strategy",
      promise: "We design how ideas move through the world.",
      homeBody: "From frameworks to expressions, we build systems that make the story tangible — through creative strategy, narrative toolkits, playbooks, and more.",
      homeTheme: "theme-cream",
      detailTheme: "theme-surface",
      overviewLead: "From frameworks to expressions, we build systems that make the story tangible — through creative strategy, narrative toolkits, playbooks, and more.",
      capabilities: ["Narrative toolkits", "Playbooks", "Creative strategies", "Frameworks", "Campaigns"],
      image: "practice-strategy-landscape.webp",
    },
    {
      id: "narrative",
      number: "03",
      title: "Narrative",
      promise: "We translate insight into clarity and conviction.",
      homeBody: "We craft the story that aligns teams, inspires audiences, and makes belief possible through positioning, architecture, and brand narrative.",
      homeTheme: "theme-plum",
      detailTheme: "theme-cream",
      overviewLead: "We craft the story that aligns teams, inspires audiences, and makes belief possible through positioning, architecture, and brand narrative.",
      capabilities: ["Positioning", "Architecture", "Storytelling", "Brand narrative", "Pitch decks"],
      image: "practice-narrative-landscape.webp",
    },
  ];

  for (const p of practices) {
    docs.push({
      _id: `practiceItem.${p.id}`,
      _type: "practiceItem",
      number: p.number,
      title: p.title,
      orderRank: nextRank(),
      promise: p.promise,
      homeBody: p.homeBody,
      homeTheme: p.homeTheme,
      landscape: await fig(p.image, `${p.title} in practice`),
      detailTheme: p.detailTheme,
      overview: [p.overviewLead, LOREM_BODY],
      approach: keyed(LOREM_APPROACH.map((a) => ({ _type: "approachItem", ...a }))),
      capabilities: p.capabilities,
      deliverables: ["Lorem ipsum dolor", "Sit amet consectetur", "Adipiscing elit", "Tempor incididunt"],
      detailImage: await fig(p.image, `${p.title} in practice`),
    });
  }

  let ok = 0;
  for (const doc of docs) {
    try {
      await client.createOrReplace(doc as never);
      ok++;
    } catch (err) {
      console.error(`FAILED ${doc._id}:`, err instanceof Error ? err.message : err);
    }
  }
  console.log(`\nSeeded ${ok}/${docs.length} documents.`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
