import { pageMatrix } from "./pageMatrix";

export interface GuideSource {
  label: string;
  href?: string;
  note: string;
}

export interface GuideLink {
  label: string;
  href: string;
  text: string;
}

export interface GuideSection {
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: Array<{
    title: string;
    text: string;
    href?: string;
  }>;
}

export interface GuidePage {
  route: string;
  page: string;
  title: string;
  description: string;
  keyword: string;
  userQuestion: string;
  pageType: string;
  sourcePriority: string;
  eyebrow: string;
  quickAnswer: string[];
  sections: GuideSection[];
  relatedGuides: GuideLink[];
  sources: GuideSource[];
  needsManualReview: string[];
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
  };
}

const byRoute = Object.fromEntries(pageMatrix.map((entry) => [entry.route, entry]));

const matrix = (route: string) => {
  const entry = byRoute[route];

  if (!entry) {
    throw new Error(`Missing pageMatrix entry for ${route}`);
  }

  return entry;
};

const officialSources = {
  panicArtStudios: {
    label: "Panic Art Studios official site",
    href: "https://www.panicartstudios.com/",
    note:
      "Official studio source for the game developer and first-party project context."
  },
  steamStore: {
    label: "Hero Siege Steam store page",
    href: "https://store.steampowered.com/app/269210/Hero_Siege/",
    note:
      "Official Steam product page for broad game and platform context."
  },
  steamAnnouncements: {
    label: "Hero Siege Steam announcements",
    href:
      "https://store.steampowered.com/oldnews/?appgroupname=Hero+Siege+-+4+Pack&appids=269210&feed=steam_community_announcements&headlines=1",
    note:
      "Official Steam announcement feed used for current-version and Season 10 context."
  },
  steamdbSeason10: {
    label: "SteamDB mirror of the Season 10 Steam announcement",
    href: "https://steamdb.info/patchnotes/24859864/",
    note:
      "Secondary mirror used only to cross-check the Season 10 launch announcement when Steam text is hard to inspect."
  },
  season10PatchSheet: {
    label: "Season 10 Official Patch Notes spreadsheet",
    href:
      "https://docs.google.com/spreadsheets/d/1xy1QySbTQ0nuHgvW7xuD012qDE5ow--iiwidaeSw3rc/edit?usp=sharing",
    note:
      "Official Season 10 patch-note sheet linked from the Steam launch and Ebontharn announcements."
  },
  hstrackerSeason10: {
    label: "HS Tracker Season 10 patch-note mirror",
    href: "https://hstracker.vercel.app/season/season-10",
    note:
      "Community mirror of the Season 10 patch-note spreadsheet, used for searchable change categories and current item/system changes."
  },
  hstrackerAnnouncements: {
    label: "HS Tracker developer announcement mirror",
    href: "https://hstracker.vercel.app/announcements",
    note:
      "Community mirror of developer Discord announcements, used only for current patch reports not yet present on Steam."
  },
  hsHelperQuests: {
    label: "HS Helper quest database",
    href: "https://hero-siege-helper.vercel.app/quests",
    note:
      "Community quest database used for quest objectives and locations, with its own warning that quest grouping may be incomplete."
  },
  officialWikiMercenaries: {
    label: "Official Hero Siege Wiki - Mercenaries",
    href: "https://herosiege.wiki.gg/wiki/Mercenaries",
    note:
      "Official wiki page used for stable mercenary-system basics such as active mercenary count and mercenary types."
  },
  officialWikiCrowsFeather: {
    label: "Official Hero Siege Wiki - Crow's Feather",
    href: "https://herosiege.wiki.gg/wiki/Crow%27s_Feather",
    note:
      "Official wiki item page used as an older baseline for Crow's Feather stats and item category, not as a Season 10 quest trigger source."
  },
  tposeUnlockHell: {
    label: "T-Pose Gaming - Season 10 difficulty unlock walkthrough",
    href: "https://tposegaming.com/hero-siege-how-to-unlock-hell/",
    note:
      "Current community walkthrough used to cross-check practical Act 8, Act 9, Nightmare, and Hell unlock flow."
  },
  tposeEtherTree: {
    label: "T-Pose Gaming - Ether Tree and Ether Points",
    href: "https://tposegaming.com/hero-siege-ether-tree/",
    note:
      "Current community guide used to cross-check Ether Point timing, Ether Tree use, and common player confusion."
  },
  tposeMercenary: {
    label: "T-Pose Gaming - Season 10 Mercenary guide",
    href: "https://tposegaming.com/hero-siege-mercenary/",
    note:
      "Current community guide used for mercenary recruitment locations, gearing expectations, and Season 10 practical advice."
  },
  vortexSoulforgedRing: {
    label: "Vortex Gaming - Soulforged Ring walkthrough summary",
    href: "https://vortexgaming.io/en/postdetail/736679",
    note:
      "Community walkthrough summary used for Soulforged Ring quest flow and player-value cross-checking."
  },
  vortexSeason10Progression: {
    label: "Vortex Gaming - Season 10 progression summary",
    href: "https://vortexgaming.io/en/postdetail/1249858",
    note:
      "Community progression summary used to cross-check Act 8, Act 9, Cthulhu, Nightmare, Hell, and Ether Point reports."
  },
  mobalyticsCrowsFeather: {
    label: "Mobalytics Season 10 starter build references",
    href: "https://mobalytics.gg/gamebase/guides/hero-siege-season-10-marksman-starter-build",
    note:
      "Current community build guide used only to cross-check that Crow's Feather is still recommended as early utility gear."
  },
  officialWikiMevius: {
    label: "Official Hero Siege Wiki - Mevius",
    href: "https://herosiege.wiki.gg/wiki/Mevius",
    note:
      "Official wiki boss page used for Mevius identity, act context, and baseline location wording."
  },
  officialWikiMemoryOfMevius: {
    label: "Official Hero Siege Wiki - Memory of Mevius",
    href: "https://herosiege.wiki.gg/wiki/Memory_of_Mevius",
    note:
      "Official wiki item page used to distinguish Memory of Mevius search intent from the base Mevius boss fight."
  },
  officialWikiBossDungeons: {
    label: "Official Hero Siege Wiki - Boss Dungeons",
    href: "https://herosiege.wiki.gg/wiki/Boss_Dungeons",
    note:
      "Official wiki boss-dungeon reference used for current boss-dungeon naming cross-checks."
  },
  heroSiegeDataBosses: {
    label: "HeroSiegeData boss database",
    href: "https://www.herosiegedata.com/en/bosses",
    note:
      "Current community data site used to cross-check boss entries, act placement, and visible difficulty data."
  },
  heroSiegeDataItemGuide: {
    label: "HeroSiegeData item guide",
    href: "https://www.herosiegedata.com/en/guide",
    note:
      "Current community data site used to cross-check Enchanted Sigil usage in endgame item and key references."
  },
  heroSiegeDataEther: {
    label: "HeroSiegeData Ether Tree planner",
    href: "https://www.herosiegedata.com/en/ether",
    note:
      "Current community data and planning page used to cross-check Ether Point sources and point-spending context."
  },
  hsHelperCraftPrices: {
    label: "HS Helper craft prices",
    href: "https://hero-siege-helper.vercel.app/craftprices",
    note:
      "Community crafting and price reference used for Enchanted Sigil price context, with its own WIP/default-price caveat."
  },
  hsHelperKeyPrices: {
    label: "HS Helper key prices",
    href: "https://hero-siege-helper.vercel.app/keyprices",
    note:
      "Community key and material price reference used to cross-check boss-access economy context."
  },
  tposeAmunRa: {
    label: "T-Pose Gaming - Amun Ra guide",
    href: "https://tposegaming.com/amun-ra-hero-siege/",
    note:
      "Current community boss-access guide used to cross-check Enchanted Sigil use for crafting Amun Ra keys."
  },
  inGameVerification: {
    label: "Current in-game verification",
    note:
      "Required before publishing exact quest steps, NPC names, reward details, unlock triggers, or system numbers."
  },
  communityCrossCheck: {
    label: "Current-version community cross-check",
    note:
      "Community reports can identify issues to verify, but are not treated as official facts."
  }
} satisfies Record<string, GuideSource>;

const pageFromMatrix = (
  route: string,
  data: Omit<
    GuidePage,
    "route" | "page" | "keyword" | "userQuestion" | "pageType" | "sourcePriority"
  >
): GuidePage => {
  const entry = matrix(route);

  return {
    route: entry.route,
    page: entry.page,
    keyword: entry.keyword,
    userQuestion: entry.userQuestion,
    pageType: entry.pageType,
    sourcePriority: entry.sourcePriority,
    ...data
  };
};

const homePage: GuidePage = {
  route: "/",
  page: "Hero Siege Guide Home",
  title: "Hero Siege Guide - Season 10 Progression, Quests and Systems",
  description:
    "A fan-made Hero Siege guide for Season 10 progression, quests, systems, and current-version answers.",
  keyword: "hero siege season 10",
  userQuestion:
    "What is Hero Siege Guide, who is it for, and where should I start in Season 10?",
  pageType: "Guide Home",
  sourcePriority: "Official game info -> Steam announcements -> site internal pages",
  eyebrow: "Hero Siege Guide",
  quickAnswer: [
    "Hero Siege Guide is an independent fan-made guide site focused on Season 10 progression, quests, systems, and current-version answers.",
    "It is built for new and returning players who need practical next steps without being pushed into build databases, tier lists, or broad wiki coverage.",
    "Start with the Guide Hub, then move into Season 10, Act 9, mandatory quests, unlocks, mercenaries, or Ether Points depending on where you are stuck."
  ],
  heroImage: {
    src: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/269210/header.jpg",
    alt: "Hero Siege Steam header artwork",
    caption: "Official Steam media is used only as broad visual context for the game."
  },
  sections: [
    {
      eyebrow: "Who It Helps",
      title: "Built for current-version players",
      paragraphs: [
        "Hero Siege has years of older guides, videos, and wiki notes around it. That makes current-version questions harder than they should be, especially when a new season changes progression or systems.",
        "This site keeps the scope narrow: Season 10, progression gates, quest value, system explanations, and troubleshooting pages that answer a clear player question."
      ]
    },
    {
      eyebrow: "Start Here",
      title: "Core pages for the first batch",
      cards: [
        {
          title: "Guide Hub",
          text: "Use the hub when you are new, returning, or unsure which page answers your current problem.",
          href: "/guide/"
        },
        {
          title: "Season 10",
          text: "Read the current-version overview before relying on old season advice.",
          href: "/season-10/"
        },
        {
          title: "Act 9",
          text: "Use the Act 9 guide as a cautious progression checkpoint, with exact steps marked for verification.",
          href: "/act-9/"
        },
        {
          title: "Mandatory Quests",
          text: "Find which quest pages are planned as high-value Season 10 checks.",
          href: "/quests/mandatory/"
        },
        {
          title: "Mevius",
          text: "Use this boss guide when Act 7, Memory of Mevius, or post-Mevius progression is the question.",
          href: "/bosses/mevius/"
        },
        {
          title: "Enchanted Sigil",
          text: "Check this item guide before spending or farming sigils for boss access and crafting.",
          href: "/items/enchanted-sigil/"
        }
      ]
    },
    {
      eyebrow: "Progression",
      title: "What to open when progression stalls",
      cards: [
        {
          title: "Unlock Nightmare",
          text: "For players trying to move past Normal difficulty in the current version.",
          href: "/progression/unlock-nightmare/"
        },
        {
          title: "Mercenary",
          text: "For players who want to understand the mercenary system before relying on old notes.",
          href: "/systems/mercenary/"
        },
        {
          title: "Ether Points",
          text: "For players checking how Ether Points fit into Season 10 progression.",
          href: "/systems/ether-points/"
        }
      ]
    },
    {
      eyebrow: "Scope",
      title: "What this site is not",
      bullets: [
        "Not the official Hero Siege website.",
        "Not a full Hero Siege Wiki replacement.",
        "Not a build database.",
        "Not a Season 10 tier-list site."
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Choose the right current-version page." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Start with the season context." },
    { label: "Mevius Guide", href: "/bosses/mevius/", text: "Check a high-intent boss and progression page." },
    { label: "Enchanted Sigil", href: "/items/enchanted-sigil/", text: "Open the new item and crafting guide." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Continue into progression help." },
    {
      label: "Unlock Nightmare",
      href: "/progression/unlock-nightmare/",
      text: "Check the current-version unlock page."
    },
    {
      label: "Mandatory Quests",
      href: "/quests/mandatory/",
      text: "Review high-value quest pages."
    },
    { label: "Mercenary Guide", href: "/systems/mercenary/", text: "Learn the mercenary system." },
    { label: "Ether Points", href: "/systems/ether-points/", text: "Check Ether Point guidance." }
  ],
  sources: [
    officialSources.panicArtStudios,
    officialSources.steamStore,
    officialSources.steamAnnouncements,
    officialSources.steamdbSeason10
  ],
  needsManualReview: []
};

const guideHub = pageFromMatrix("/guide/", {
  title: "Hero Siege Guide - Current-Version Starting Point",
  description:
    "Start with the Hero Siege guide hub for Season 10 progression, quests, systems, and troubleshooting.",
  eyebrow: "Guide Hub",
  quickAnswer: [
    "Use this hub if you are new, returning, or unsure which Season 10 page answers your current problem.",
    "The current guide set covers Season 10 overview, Act 9, mandatory quests, Nightmare unlock, Mevius, Enchanted Sigil, Soulforged Ring, Crow's Feather, mercenaries, and Ether Points.",
    "Troubleshooting pages are planned later; this hub does not link to routes that are not generated yet."
  ],
  sections: [
    {
      eyebrow: "Season 10",
      title: "Start with current-version context",
      cards: [
        {
          title: "Season 10 Overview",
          text: "Read this before applying older progression advice.",
          href: "/season-10/"
        },
        {
          title: "Act 9",
          text: "Use this when your next question is how to move through Act 9.",
          href: "/act-9/"
        },
        {
          title: "Mevius",
          text: "Use this when Act 7, Memory of Mevius, or what-to-do-after-Mevius is the search intent.",
          href: "/bosses/mevius/"
        },
        {
          title: "Enchanted Sigil",
          text: "Use this when you need sigil acquisition, price, use, or crafting context.",
          href: "/items/enchanted-sigil/"
        }
      ]
    },
    {
      eyebrow: "Progression",
      title: "Progression pages",
      cards: [
        {
          title: "Unlock Nightmare",
          text: "For players trying to move beyond Normal difficulty in the current version.",
          href: "/progression/unlock-nightmare/"
        },
        {
          title: "Act 9 Guide",
          text: "For players working through the current progression path.",
          href: "/act-9/"
        }
      ]
    },
    {
      eyebrow: "Quests",
      title: "Quest pages",
      cards: [
        {
          title: "Mandatory Quests",
          text: "Start here before checking specific quest rewards.",
          href: "/quests/mandatory/"
        },
        {
          title: "Soulforged Ring",
          text: "A focused quest and reward page with verification notes.",
          href: "/quests/soulforged-ring/"
        },
        {
          title: "Crow's Feather",
          text: "A focused quest and reward page with current-version caution.",
          href: "/quests/crows-feather/"
        }
      ]
    },
    {
      eyebrow: "Systems",
      title: "System pages",
      cards: [
        {
          title: "Mercenary",
          text: "Learn how to approach the mercenary system without relying on old assumptions.",
          href: "/systems/mercenary/"
        },
        {
          title: "Ether Points",
          text: "Understand what to verify when Ether Points do not appear as expected.",
          href: "/systems/ether-points/"
        }
      ]
    },
    {
      eyebrow: "Coming Later",
      title: "Troubleshooting",
      paragraphs: [
        "Troubleshooting pages such as Steam verification failed, ping timeout, and Hunger Issue are planned for later phases.",
        "They are intentionally not linked here yet because this build only publishes the first 10 formal routes."
      ]
    }
  ],
  relatedGuides: [
    { label: "Home", href: "/", text: "Return to the site overview." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Understand the current-version frame." },
    { label: "Mevius Guide", href: "/bosses/mevius/", text: "Open the new boss progression guide." },
    { label: "Enchanted Sigil", href: "/items/enchanted-sigil/", text: "Open the new item and crafting guide." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Move into progression help." },
    { label: "Mandatory Quests", href: "/quests/mandatory/", text: "Review quest priorities." },
    { label: "Ether Points", href: "/systems/ether-points/", text: "Check a key Season 10 system page." }
  ],
  sources: [
    officialSources.panicArtStudios,
    officialSources.steamStore,
    officialSources.steamAnnouncements
  ],
  needsManualReview: []
});

const season10 = pageFromMatrix("/season-10/", {
  title: "Hero Siege Season 10 Guide - Ebontharn, Progression, Bosses & Systems",
  description:
    "A Season 10 Hero Siege guide hub for Ebontharn, Act 9, Ether Points, Mevius, Enchanted Sigils, difficulty progression, and current-version next steps.",
  eyebrow: "Season 10",
  quickAnswer: [
    "Season 10 is the Ebontharn season. Its headline update is Act 9 after Act 8 Odin, plus a progression rewrite around Normal campaign completion, Nightmare, Hell, Inferno, Ether, Incarnation, and endgame boss access.",
    "Use this page as a current-version map, not a patch-note dump: start with the campaign route, then branch into Mevius, Act 9, Nightmare, Ether Points, Enchanted Sigils, and high-value quest rewards based on where you are stuck.",
    "For indexing value, this page now answers what changed, which guides are current, which old guides are risky, and where to go next inside the site. It deliberately avoids copying unconfirmed exact boss HP, drop rates, or hidden quest triggers."
  ],
  sections: [
    {
      eyebrow: "Current Version",
      title: "What Season 10 changes",
      paragraphs: [
        "The official Steam launch announcement frames Season 10 around Ebontharn, a free Act 9, new chase zones, three new Uber fights, a seasonal Abyssal Chest, and a wide patch-note set covering items, classes, monsters, systems, and quality-of-life changes.",
        "The most important player-facing shift is progression. Normal is the full campaign route, including Act 8 and Act 9, while later difficulty play is more about retained waypoints, farming, Ether, Incarnation, and endgame systems. That makes pre-Season 10 route advice easy to misread."
      ]
    },
    {
      eyebrow: "Start Here",
      title: "Season 10 route map",
      bullets: [
        "If you are still in early campaign, clear Acts in Normal and use Mevius as the Act 7 boss checkpoint.",
        "After Act 7, continue toward Act 8 Odin and then Act 9 Ebontharn instead of following old repeated-difficulty campaign advice.",
        "If you are looking for system progression, prioritize the Ether Points guide and treat exact point amounts as patch-sensitive.",
        "If you are farming boss access or crafting materials, use the Enchanted Sigil page before assuming a fixed price or drop source.",
        "If a guide gives exact HP, drop rates, key prices, or hidden unlock triggers without a current source, keep that claim under manual review."
      ]
    },
    {
      eyebrow: "Bosses And Items",
      title: "New high-intent guides added in this pass",
      cards: [
        {
          title: "Mevius",
          text: "Find Mevius location context, fight approach, Memory of Mevius notes, and what to do after the boss.",
          href: "/bosses/mevius/"
        },
        {
          title: "Enchanted Sigil",
          text: "Check what Enchanted Sigils are used for, where players look for them, and how price data should be read.",
          href: "/items/enchanted-sigil/"
        },
        {
          title: "Ether Points",
          text: "Use the strengthened how-to page for Ether Tree points, access requirements, and missing-point troubleshooting.",
          href: "/systems/ether-points/"
        }
      ]
    },
    {
      eyebrow: "Progression",
      title: "Where old advice is most likely to fail",
      cards: [
        {
          title: "Difficulty unlocks",
          text: "Old Nightmare or Hell instructions can point at the wrong milestone if they ignore Season 10's Normal campaign route."
        },
        {
          title: "Boss HP and scaling",
          text: "Boss data can vary by patch, difficulty, and character state. Only publish exact HP when a current data source or in-game check supports it."
        },
        {
          title: "Item prices",
          text: "Sigil prices and crafting values can move with economy data. Use them as market context, not permanent fixed facts."
        },
        {
          title: "Quest rewards",
          text: "Soulforged Ring and Crow's Feather are useful guide topics, but reward value and exact triggers still need current checks."
        }
      ]
    },
    {
      eyebrow: "Go Next",
      title: "Choose the guide that matches your problem",
      cards: [
        {
          title: "How to Get Ether Points",
          text: "Use this if you searched for Ether Tree points, level 100 points, Hell+ Ether quests, or missing Ether rewards.",
          href: "/systems/ether-points/"
        },
        {
          title: "Act 9",
          text: "Use this if you defeated Odin and need the Ebontharn route or Nightmare unlock context.",
          href: "/act-9/"
        },
        {
          title: "Mandatory Quests",
          text: "Use this to separate true progression gates from high-value optional rewards.",
          href: "/quests/mandatory/"
        }
      ]
    },
    {
      eyebrow: "FAQ",
      title: "Season 10 common questions",
      cards: [
        {
          title: "Is /season-10/ different from the home page?",
          text: "Yes. The home page is a site entry point; this page is now a Season 10 topic hub with progression, boss, item, and system paths."
        },
        {
          title: "Does Season 10 require Act 9?",
          text: "For the current campaign route, Act 9 is part of the post-Odin progression flow. Exact final trigger details remain patch-sensitive."
        },
        {
          title: "Are Mevius and Enchanted Sigil Season 10-only topics?",
          text: "No. They are high-value current search topics connected to Season 10 progression and endgame planning, but they should not be described as Season 10-only content."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Choose your next current-version page." },
    { label: "Mevius Guide", href: "/bosses/mevius/", text: "Open the new boss progression guide." },
    { label: "Enchanted Sigil", href: "/items/enchanted-sigil/", text: "Open the new item and crafting guide." },
    { label: "How to Get Ether Points", href: "/systems/ether-points/", text: "Review the strengthened Ether guide." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Move from season context into progression." },
    {
      label: "Unlock Nightmare",
      href: "/progression/unlock-nightmare/",
      text: "Check a difficulty unlock page."
    }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.steamdbSeason10,
    officialSources.hstrackerSeason10,
    officialSources.hstrackerAnnouncements,
    officialSources.tposeUnlockHell,
    officialSources.heroSiegeDataBosses,
    officialSources.heroSiegeDataItemGuide
  ],
  needsManualReview: [
    "Exact Act 9 NPC names, area-by-area objective order, and final quest hand-in behavior after later hotfixes.",
    "Exact boss HP values by difficulty, including Mevius Normal HP, unless verified from current data or direct in-game checks.",
    "Exact Enchanted Sigil market price, vendor availability, and drop/crafting rates because economy data can change."
  ]
});

const act9 = pageFromMatrix("/act-9/", {
  title: "Hero Siege Act 9 Guide - Season 10 Progression",
  description:
    "How to enter and progress through Act 9 in Hero Siege Season 10, with current official facts and community-reported troubleshooting checks.",
  eyebrow: "Progression Guide",
  quickAnswer: [
    "Enter Act 9 after defeating Odin at the end of Act 8. The official Season 10 Ebontharn announcement names Act 9 as the new free act and says it is accessible after Odin.",
    "Act 9 is the end of the Normal campaign route in Season 10. Community progression guides currently report that the Act 9 route ends with Cthulhu in the Abyssal Realm and that this clear is the practical Nightmare unlock milestone.",
    "If the next NPC or quest marker does not appear, first check the Act 8 Odin completion state, your quest log, minimap markers, and whether you are on a patched build after the 7.0.2 quest-marker fixes."
  ],
  sections: [
    {
      eyebrow: "Entry",
      title: "How to enter Act 9",
      bullets: [
        "Finish the Act 8 route through Odin on Normal.",
        "After Odin is defeated, look for the next campaign transition rather than replaying older difficulty routes.",
        "Follow the quest log and minimap markers for the new Act 9 NPC chain. Patch 7.0.2 specifically improved Act 9 NPC indicators.",
        "If a community guide names a pirate tavern NPC or ship route, treat that as useful direction but still confirm the NPC and objective text in your own current build."
      ]
    },
    {
      eyebrow: "Progression Role",
      title: "Where Act 9 sits in Season 10",
      paragraphs: [
        "Season 10 changes the campaign expectation: Normal is the full Acts 1-9 story run, then later difficulties become more about retained waypoints, farming, Ether, Incarnation, and endgame scaling.",
        "That means Act 9 is not just another side zone. It is the current bridge between finishing the Normal campaign and opening the post-Normal difficulty loop."
      ]
    },
    {
      eyebrow: "Confirmed Content",
      title: "What Act 9 adds",
      bullets: [
        "A new free act called Ebontharn.",
        "New Act 9 quest flow, with official hotfix notes confirming quest-marker and NPC-indicator work after launch.",
        "Three new Uber bosses in the Season 10 launch notes: Phantom Leviathan, Captain Grimtide, and Blood Maiden.",
        "New chase-zone relevance, with patch notes moving several item farms into Act 9 zones.",
        "Community-reported final Normal milestone: Cthulhu in the Abyssal Realm."
      ]
    },
    {
      eyebrow: "Stuck Checks",
      title: "If the next quest or NPC does not appear",
      bullets: [
        "Make sure Odin is defeated and any post-Odin interaction or quest turn-in has actually completed.",
        "Open the quest log and check the minimap for NPC markers, especially on builds after the 7.0.2 Act 9 marker fix.",
        "Return to the last Act 8 and Act 9 hub or waypoint you used instead of following an old map route from a pre-Season 10 guide.",
        "If you are using a community route, compare the NPC name, area name, and objective text against your current build before assuming the route is wrong.",
        "If you changed difficulty, party state, or instance after killing Odin, re-check the quest tracker in Normal."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "What to do next",
      cards: [
        {
          title: "Odin is not cleared",
          text: "Finish the Act 8 chain first. Official notes place Act 9 access after defeating Odin.",
          href: "/season-10/"
        },
        {
          title: "Odin is cleared but Act 9 is missing",
          text: "Check quest log, minimap NPC indicators, and current patch status before treating it as a bug.",
          href: "/progression/unlock-nightmare/"
        },
        {
          title: "Cthulhu is cleared but Nightmare is missing",
          text: "Use the Nightmare page to check the current difficulty unlock flow.",
          href: "/systems/ether-points/"
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Check current-version context." },
    { label: "Unlock Nightmare", href: "/progression/unlock-nightmare/", text: "Check difficulty access." },
    { label: "Ether Points", href: "/systems/ether-points/", text: "Review progression resources." }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.tposeUnlockHell,
    officialSources.vortexSeason10Progression
  ],
  needsManualReview: [
    "Exact Act 9 NPC names, area-by-area objective order, and quest hand-in sequence.",
    "Whether the community-reported Cthulhu unlock trigger has any hidden quest, party, or patch-state edge cases."
  ]
});

const mandatoryQuests = pageFromMatrix("/quests/mandatory/", {
  title: "Hero Siege Mandatory Quests - Season 10 Quest Priorities",
  description:
    "A Season 10 quest-priority guide that separates mandatory campaign progress, high-value optional rewards, optional quests, and verification-sensitive quest details.",
  eyebrow: "Quest Guide",
  quickAnswer: [
    "Mandatory in Season 10 means progression-blocking first: finish the Normal campaign route through Act 8 Odin and Act 9 Ebontharn before expecting Nightmare and later systems to behave like old guides.",
    "Soulforged Ring and Crow's Feather are high-value optional rewards, not confirmed universal gates. Soulforged Ring is valuable because Season 10 changed it into a stronger below-level-100 experience item; Crow's Feather is community-recommended early utility because of movement speed and broad stats.",
    "Daily, farming, and build-specific side quests should be treated as optional unless they unlock a required system, difficulty, or persistent reward for your current character."
  ],
  sections: [
    {
      eyebrow: "Definition",
      title: "What counts as mandatory?",
      paragraphs: [
        "A quest is mandatory when skipping it blocks campaign progress, difficulty access, or a current progression system. A quest is high-value optional when the reward is strong but does not appear to unlock the next required game layer.",
        "This distinction matters in Season 10 because the full campaign is now concentrated in Normal, while later difficulty play leans harder on waypoints, Ether, Incarnation, farming, and endgame bosses."
      ]
    },
    {
      eyebrow: "Priority List",
      title: "Season 10 quest-priority table",
      cards: [
        {
          title: "Mandatory - Normal campaign through Act 9",
          text: "Why it matters: unlocks the current post-Normal route. Status: official progression notes plus community Cthulhu clear reports."
        },
        {
          title: "Mandatory - Act 8 Odin completion",
          text: "Why it matters: official Ebontharn notes say Act 9 becomes accessible after defeating Odin. Status: official."
        },
        {
          title: "Mandatory - Act 9 main route",
          text: "Why it matters: Season 10's new act sits at the end of Normal progression. Status: official for access and act existence, community-reported for exact Cthulhu route."
        },
        {
          title: "High-value optional - Soulforged Ring",
          text: "Why it matters: Season 10 changed the ring into a stronger below-level-100 experience item. Status: official item change, community quest path."
        },
        {
          title: "High-value optional - Crow's Feather",
          text: "Why it matters: community guides recommend it early for movement speed and broad utility stats. Status: community consensus with older wiki item baseline."
        },
        {
          title: "Optional / situational - farming and daily quests",
          text: "Why it matters: useful for materials, efficiency, or builds, but not confirmed as campaign gates. Status: verify per objective."
        },
        {
          title: "Needs verification - exact reward quests",
          text: "Why it matters: quest starts, page drops, boss lists, and reward values can drift across patches. Status: manual review before exact walkthroughs."
        }
      ]
    },
    {
      eyebrow: "Checklist",
      title: "Use this order when you feel blocked",
      bullets: [
        "First, clear visible campaign objectives through Act 8 Odin and Act 9.",
        "Second, check whether the blocked feature is tied to difficulty access, especially Nightmare or Hell.",
        "Third, do high-value reward quests only when the reward solves a current problem, such as leveling speed or movement.",
        "Fourth, use daily or farming quests when you are optimizing, not when you are trying to unlock the next campaign stage.",
        "Finally, if two current sources disagree on a quest trigger, keep playing from the in-game tracker and mark the exact trigger for manual review."
      ]
    },
    {
      eyebrow: "Reward Quests",
      title: "How to treat the two first-batch reward pages",
      cards: [
        {
          title: "Soulforged Ring",
          text: "Worth checking for leveling and alt planning. Not confirmed as required for difficulty progression.",
          href: "/quests/soulforged-ring/"
        },
        {
          title: "Crow's Feather",
          text: "Worth checking for early utility. Community guides recommend it, but exact current trigger still needs in-game confirmation.",
          href: "/quests/crows-feather/"
        }
      ]
    },
    {
      eyebrow: "Old Guide Filter",
      title: "When an old quest guide is probably stale",
      bullets: [
        "It sends you to repeat every act on every difficulty.",
        "It describes Act 9 as missing, optional, or not part of the Normal completion route.",
        "It gives Soulforged Ring the older generic experience wording instead of the Season 10 below-level-100 wording.",
        "It gives exact Crow's Feather NPC or drop instructions without any current-version cross-check.",
        "It treats every useful reward quest as mandatory."
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Check current-version context." },
    { label: "Soulforged Ring", href: "/quests/soulforged-ring/", text: "Open the ring quest page." },
    { label: "Crow's Feather", href: "/quests/crows-feather/", text: "Open the feather quest page." }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.hsHelperQuests,
    officialSources.tposeUnlockHell,
    officialSources.vortexSoulforgedRing,
    officialSources.mobalyticsCrowsFeather
  ],
  needsManualReview: [
    "Exact Act 9 objective order and whether any party or patch-state edge case blocks the Normal -> Nightmare transition.",
    "Exact Soulforged Ring page sources, drop behavior, and whether the quest is worth doing before or after level 100 for a first character.",
    "Exact Crow's Feather current trigger, because current community guides describe an early quest path while the older official wiki item page frames it as a general item."
  ]
});

const unlockNightmare = pageFromMatrix("/progression/unlock-nightmare/", {
  title: "Hero Siege Unlock Nightmare - Current-Version Progression",
  description:
    "How to unlock Nightmare difficulty in Hero Siege Season 10, including the current Normal campaign route and common checks when Nightmare does not appear.",
  eyebrow: "Progression How-To",
  quickAnswer: [
    "In Season 10, the practical answer is: finish the Normal campaign route through Act 9. Official notes say completing Normal opens the next progression stage while preserving Normal waypoints; current community walkthroughs identify the Act 9 Cthulhu clear as the Normal milestone that unlocks Nightmare.",
    "There is no official level number found for the Nightmare unlock in the reviewed Season 10 notes. Treat level as a power check rather than a confirmed gate unless your current in-game UI says otherwise.",
    "If Nightmare does not appear, re-check Act 8 Odin, Act 9 quest completion, Cthulhu clear state, your quest log, and whether you are reading a pre-Season 10 guide."
  ],
  sections: [
    {
      eyebrow: "Steps",
      title: "Current Season 10 unlock path",
      bullets: [
        "Play Normal, not an older repeated-difficulty route.",
        "Clear the campaign through Act 8 and defeat Odin.",
        "Enter Act 9 Ebontharn after Odin, using the current quest tracker and minimap indicators.",
        "Clear the Act 9 route. Community progression guides currently report Cthulhu in the Abyssal Realm as the final Normal milestone.",
        "Return to difficulty selection or the relevant progression UI and check whether Nightmare is now available."
      ]
    },
    {
      eyebrow: "What Changed",
      title: "Why old Nightmare guides break",
      paragraphs: [
        "Season 10 rewires difficulty progression. The official patch notes say players only progress through the Acts once, on Normal, and that after Normal is completed the game moves into Nightmare while retaining Normal waypoints.",
        "That makes older advice about unlocking Nightmare by clearing an older end boss, replaying every act on multiple difficulties, or following pre-Act-9 route assumptions risky."
      ]
    },
    {
      eyebrow: "Checklist",
      title: "If Nightmare did not unlock",
      bullets: [
        "Confirm Odin is defeated and the Act 8 chain is actually turned in.",
        "Confirm Act 9 is available and that the active quest chain is complete.",
        "Confirm the final Act 9 boss clear is recorded in the same character and progression state.",
        "Check the quest log and minimap markers added or improved in early Season 10 hotfixes.",
        "Make sure you are not following a guide written for Season 9 or earlier.",
        "If you played in a party, re-check the character that needs the unlock while solo in the expected difficulty selection UI."
      ]
    },
    {
      eyebrow: "Level Requirement",
      title: "Is there a level requirement?",
      paragraphs: [
        "The reviewed official Season 10 sources do not publish a separate Nightmare level requirement. Community walkthroughs frame Nightmare as a Normal-campaign completion unlock rather than a level-gated feature.",
        "That does not mean level never matters in practice. If your character cannot clear Act 9, level and gear are still real power checks, but they should not be written as a confirmed hidden unlock number without in-game proof."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "What your symptom usually means",
      cards: [
        {
          title: "Act 9 is not open",
          text: "Go back to Act 8 and verify Odin is defeated.",
          href: "/act-9/"
        },
        {
          title: "Act 9 is open but incomplete",
          text: "Finish the current Act 9 quest route before expecting Nightmare.",
          href: "/season-10/"
        },
        {
          title: "Act 9 is complete but Nightmare is missing",
          text: "Check final boss credit, quest turn-in state, party credit, and patch state before reporting a bug.",
          href: "/quests/mandatory/"
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Check current-version context." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Check story progression." },
    { label: "Mandatory Quests", href: "/quests/mandatory/", text: "Review possible quest gates." }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.tposeUnlockHell,
    officialSources.vortexSeason10Progression
  ],
  needsManualReview: [
    "Exact in-game unlock trigger wording after the Act 9 final boss or final quest hand-in.",
    "Whether party credit, instance changes, or missed turn-ins can prevent Nightmare from unlocking.",
    "Any hidden level, account, or quest-state requirement not visible in the reviewed official notes."
  ]
});

const soulforgedRing = pageFromMatrix("/quests/soulforged-ring/", {
  title: "Hero Siege Soulforged Ring - Quest and Reward Guide",
  description:
    "How Soulforged Ring works in Hero Siege Season 10, how players currently obtain it, and whether the reward is still worth doing.",
  eyebrow: "Quest Reward Guide",
  quickAnswer: [
    "Soulforged Ring is a quest reward ring, and Season 10 made its leveling value clearer: official patch notes changed it from older generic experience wording to 25% increased experience gained below level 100.",
    "Community quest databases and walkthroughs currently place the ring behind the Soulforge / Book of Soulforge questline in Hell, involving a Mysterious Key, boss page drops, soul essence, and fallen-warrior souls before the reward turn-in.",
    "It is worth doing for leveling and alt planning, but it is not confirmed as mandatory for unlocking Nightmare or progressing the main campaign."
  ],
  sections: [
    {
      eyebrow: "Reward",
      title: "What Soulforged Ring is",
      paragraphs: [
        "Soulforged Ring is a ring players chase because of its experience bonus. In Season 10, the official patch notes changed the item from 12% increased experience gained to 25% increased experience gained below level 100.",
        "That wording matters. Older guides that only say the ring is a flat generic experience item are stale for Season 10 reward evaluation."
      ]
    },
    {
      eyebrow: "How To Get It",
      title: "Current reported quest route",
      bullets: [
        "Reach the later progression stage where Hell quest content is available.",
        "Use the Mysterious Key route reported by current community quest sources to access the Soulforge chain.",
        "Start the Soulforge / Book of Soulforge chain from the relevant NPC in Dhorn Farum, reported by community sources as Orre.",
        "Collect Book of Soulforge pages from specified bosses, then continue into the soul essence and fallen-warrior soul steps.",
        "Return to the quest giver for the Soulforged Ring reward."
      ]
    },
    {
      eyebrow: "Quest Priority",
      title: "Is it still worth doing in Season 10?",
      paragraphs: [
        "Yes for players who care about leveling efficiency below level 100, especially alts or characters that can benefit from passing the ring around if their account and league rules allow it.",
        "No as a universal campaign gate. The reviewed sources do not show Soulforged Ring as required for Act 9, Nightmare, or the main Season 10 difficulty unlock path."
      ]
    },
    {
      eyebrow: "Old Guide Filter",
      title: "Which Soulforged Ring advice is outdated?",
      bullets: [
        "Any guide that evaluates the ring only as a 12% experience item is using old reward wording.",
        "Any guide that calls it mandatory for every character should be treated as overbroad unless it explains the specific leveling use case.",
        "Any guide with exact boss/page drop claims should be checked against the current quest log because page sources and quest grouping are community-documented."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "Should you do the quest now?",
      cards: [
        {
          title: "First Normal clear",
          text: "Skip it for progression. Focus on Acts 1-9 and the Nightmare unlock path."
        },
        {
          title: "Leveling an alt",
          text: "Strongly consider it if you can obtain or use the ring before level 100."
        },
        {
          title: "Already in Hell",
          text: "Do it when the quest objectives align with bosses or zones you are already farming."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Mandatory Quests", href: "/quests/mandatory/", text: "Compare quest priority." },
    { label: "Crow's Feather", href: "/quests/crows-feather/", text: "Check another reward quest." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Review current-version context." }
  ],
  sources: [
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.hsHelperQuests,
    officialSources.vortexSoulforgedRing,
    officialSources.vortexSeason10Progression
  ],
  needsManualReview: [
    "Exact Soulforge quest start NPC spelling, location, and prerequisite state in the current client.",
    "Exact Book of Soulforge page sources, drop rates, and whether any page source changed after launch hotfixes.",
    "Whether the ring can be reliably obtained early enough to help a first character before level 100, or is mainly an alt-leveling reward."
  ]
});

const crowsFeather = pageFromMatrix("/quests/crows-feather/", {
  title: "Hero Siege Crow's Feather - Quest and Reward Guide",
  description:
    "What Crow's Feather is in Hero Siege Season 10, how players currently report getting it, and why it is recommended for early progression.",
  eyebrow: "Quest Reward Guide",
  quickAnswer: [
    "Crow's Feather is a low-level Satanic charm with movement speed and broad stat utility in older official wiki data, and current Season 10 community build guides still recommend it as early leveling gear.",
    "Current community reports point to an early Act 1 route involving Arian in the Outskirts of Inoya and the Rat's Nest boss, but the older official wiki item page describes Crow's Feather as a general drop/craft item, so the exact current trigger stays under manual review.",
    "It is worth doing or checking early because movement speed smooths campaign progression, but it is not confirmed as mandatory for Act 9, Nightmare, or Ether progression."
  ],
  sections: [
    {
      eyebrow: "Reward",
      title: "What Crow's Feather is",
      paragraphs: [
        "The official wiki item page identifies Crow's Feather as a Satanic charm with level 1 usability and broad utility stats, including movement speed, attributes, and resistances in the older item entry.",
        "That combination explains why current community starter guides still call it out: early movement speed saves time everywhere, and broad defensive or attribute stats are useful before a build has stable gear."
      ]
    },
    {
      eyebrow: "How To Get It",
      title: "Current reported acquisition path",
      bullets: [
        "Check Act 1 campaign progress first, because current community guides describe Crow's Feather as an early campaign reward.",
        "Look for Arian in the Outskirts of Inoya if you are following community route notes.",
        "Complete the reported Rat's Nest step and boss check if it appears in your quest log.",
        "If the quest is not present, check whether the item is available through general drop or crafting behavior in your current client, because older official wiki data does not match the community quest framing cleanly."
      ]
    },
    {
      eyebrow: "Where It Fits",
      title: "Is it necessary in Season 10?",
      paragraphs: [
        "Crow's Feather is high-value optional. It helps progression feel faster, but the reviewed sources do not show it as a required unlock for Act 9, Nightmare, Hell, or Ether Points.",
        "Community reports currently suggest it is one of the better early utility pickups because movement speed improves every campaign route and farming loop."
      ]
    },
    {
      eyebrow: "Troubleshooting",
      title: "If you cannot find the quest",
      bullets: [
        "Check whether you are in the right Act 1 area and whether your active campaign objective has moved past the relevant NPC.",
        "Search the item name in inventory, stash, crafting, or loot filters before assuming the quest failed.",
        "Compare the guide date: Season 10 starter guides are more useful than older item-only wiki notes for route advice.",
        "Treat the exact reward trigger as unconfirmed unless the current quest tracker points you to the step and it still fails."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "When to prioritize Crow's Feather",
      cards: [
        {
          title: "New character",
          text: "Worth checking early because movement speed shortens campaign travel."
        },
        {
          title: "Already overgeared",
          text: "Optional. Replace it when your build needs stronger charm stats."
        },
        {
          title: "Only chasing unlocks",
          text: "Do not stop Act 9 or Nightmare progression just to force this item."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Mandatory Quests", href: "/quests/mandatory/", text: "Compare quest priority." },
    { label: "Soulforged Ring", href: "/quests/soulforged-ring/", text: "Check another reward quest." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Review current-version context." }
  ],
  sources: [
    officialSources.officialWikiCrowsFeather,
    officialSources.mobalyticsCrowsFeather,
    officialSources.vortexSeason10Progression,
    officialSources.hsHelperQuests,
    officialSources.inGameVerification
  ],
  needsManualReview: [
    "Exact current Season 10 Crow's Feather trigger, because community route notes and older official wiki acquisition framing conflict.",
    "Exact Season 10 item stat line, if any hotfix changed the older wiki values.",
    "Whether Crow's Feather can still drop or be crafted independently of the reported Act 1 quest route."
  ]
});

const mercenary = pageFromMatrix("/systems/mercenary/", {
  title: "Hero Siege Mercenary Guide - Current-Version System Notes",
  description:
    "How the Hero Siege mercenary system works in Season 10, where players currently report recruiting mercenaries, and what to verify before using old aura or gear advice.",
  eyebrow: "System Guide",
  quickAnswer: [
    "Mercenaries are companion helpers. The official wiki describes three mercenary types - Knight, Archer, and Magister - and says only one mercenary can be active at a time.",
    "Current Season 10 community guides report recruiting them from act towns: Knight in Act 1 Town of Inoya, Archer in Act 3 Village of Mos'Arathim, and Magister in Act 6 Dawn's Chapel, with Gar Nor acting as the mercenary NPC flow.",
    "Use mercenaries for support, extra damage, survivability tools, and utility such as Magic Find, but do not copy old aura numbers or passive values without checking the current client."
  ],
  sections: [
    {
      eyebrow: "System Role",
      title: "What mercenaries do",
      paragraphs: [
        "A mercenary follows your character as a helper rather than replacing your build. The stable high-level rules are simple: you choose one active mercenary, that mercenary has its own type and setup, and its value depends heavily on whether it survives current content.",
        "The official wiki says mercenary Magic Find directly benefits the player. Community Season 10 guides also emphasize that a mercenary can help with early damage, toughness, utility, and farming efficiency when it is geared properly."
      ]
    },
    {
      eyebrow: "Recruitment",
      title: "Where to recruit one",
      bullets: [
        "Community Season 10 guides place Knight recruitment in Act 1 Town of Inoya.",
        "They place Archer recruitment in Act 3 Village of Mos'Arathim.",
        "They place Magister recruitment in Act 6 Dawn's Chapel.",
        "If those NPCs are not visible, check your current act progression, town NPCs, and whether the guide's screenshot matches the current patch."
      ]
    },
    {
      eyebrow: "Current Use",
      title: "How to use a mercenary well",
      bullets: [
        "Keep one active mercenary and choose the type that complements your build instead of duplicating what you already do well.",
        "Gear the mercenary for survival before expecting it to carry damage in later difficulties.",
        "Use utility and Magic Find deliberately, because the official wiki says mercenary Magic Find benefits the player.",
        "Expect revive costs or downtime if the mercenary dies. Community guides currently describe gold-based revive friction.",
        "Patch notes fixed aura-related behavior after Season 10 launch, so be wary of pre-hotfix multiplayer aura complaints."
      ]
    },
    {
      eyebrow: "What To Verify",
      title: "Mechanics that are patch-sensitive",
      bullets: [
        "Exact aura values and passive numbers.",
        "Current gear slot behavior and whether old gear advice still matches the UI.",
        "Death, revive, and cost behavior at your difficulty.",
        "Whether an aura works the same way in solo and multiplayer after the latest hotfixes."
      ]
    },
    {
      eyebrow: "Common Mistakes",
      title: "New-player mercenary mistakes",
      paragraphs: [
        "The biggest mistake is treating the mercenary as a permanent damage solution while leaving it undergeared. In Season 10, aggressive monster behavior and higher difficulty scaling make survivability matter quickly.",
        "The second mistake is copying a specific aura setup from an old guide without checking whether the current UI, passive text, and multiplayer behavior match."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "Which mercenary should you try first?",
      cards: [
        {
          title: "Need a front line",
          text: "Start with Knight and check whether it survives the content you are farming."
        },
        {
          title: "Need ranged support",
          text: "Try Archer once the Act 3 recruitment route is available."
        },
        {
          title: "Need utility or spell support",
          text: "Check Magister in the Act 6 route, then verify its passive text in-game."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Review current-version context." },
    { label: "Ether Points", href: "/systems/ether-points/", text: "Check another system page." }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.officialWikiMercenaries,
    officialSources.tposeMercenary,
    officialSources.hstrackerSeason10,
    officialSources.inGameVerification,
    officialSources.communityCrossCheck
  ],
  needsManualReview: [
    "Exact Season 10 NPC name, menu wording, recruitment costs, and unlock conditions for each mercenary.",
    "Exact aura and passive values after the latest hotfix.",
    "Exact death, revive, gear-slot, and multiplayer aura behavior in the current client."
  ]
});

const etherPoints = pageFromMatrix("/systems/ether-points/", {
  title: "Hero Siege How to Get Ether Points - Ether Tree Points Guide",
  description:
    "How to get Ether Points in Hero Siege, unlock Ether Tree points, understand level and Hell+ requirements, and fix common missing-point confusion.",
  eyebrow: "Ether Points Guide",
  quickAnswer: [
    "To get Ether Points, reach the post-campaign progression layer, get to level 100, enter the Hell+ stage where Ether quests become relevant, complete the Ether quests shown in the Quest Log, and spend the points in the Ether Tree.",
    "Season 10 strengthened the Ether system with more than 100 Ether Tree nodes and hotfix visibility for completed and uncompleted Ether quests in the pause-menu Quest Log on Hell+.",
    "If you do not see Ether Points, first check level, difficulty, Quest Log state, whether you are looking at the Ether Tree rather than the Incarnation Tree, and whether the exact point amount in your guide predates later Season 10 hotfixes."
  ],
  sections: [
    {
      eyebrow: "How To Get Points",
      title: "How to get Ether Points in Hero Siege",
      bullets: [
        "Finish enough progression to move beyond early Normal campaign play; Ether Points are not an early leveling resource.",
        "Reach level 100, which current community guides and developer-announcement mirrors identify as the start of Ether visibility or starter points.",
        "Move into Hell+ content where Ether quests are expected to appear. Season 10 patch notes specifically mention Ether quest status in the pause-menu Quest Log on Hell+.",
        "Complete the visible Ether quests for your current difficulty or progression state.",
        "Spend the earned points in the Ether Tree, then re-check your tree before assuming points are missing."
      ]
    },
    {
      eyebrow: "Ether Tree Points",
      title: "Ether Points vs Ether Tree points",
      paragraphs: [
        "Players often search for Ether Tree points and Ether Points as the same thing. In practical terms, Ether Points are the points you spend in the Ether Tree; the tree is the interface and progression layer where those points matter.",
        "The Incarnation Tree is related endgame progression, but it is not the same tree. Season 10 added more than 600 Incarnation nodes and more than 100 Ether Tree nodes, so mixing the two systems is an easy way to misread a guide."
      ]
    },
    {
      eyebrow: "Access Requirements",
      title: "When the Ether system starts to matter",
      cards: [
        {
          title: "Before level 100",
          text: "Do not plan around Ether Points yet. Focus on campaign, gear, and difficulty progression."
        },
        {
          title: "At level 100",
          text: "Start checking Ether UI, Ether Tree access, and current patch notes for starter-point behavior."
        },
        {
          title: "Hell+ progression",
          text: "Use the Quest Log to track completed and uncompleted Ether quests; this is where Season 10 notes explicitly mention visibility."
        }
      ]
    },
    {
      eyebrow: "Troubleshooting",
      title: "Why you may not receive or find Ether Points",
      bullets: [
        "You are below level 100 or not yet in the expected progression layer.",
        "You are in the wrong difficulty for the Ether quest you are trying to complete.",
        "You are checking Incarnation progression instead of the Ether Tree.",
        "The point was already spent, or the tree/UI needs to be reopened after a quest update.",
        "The guide you followed used launch-week point totals or older Season 9 assumptions.",
        "The exact Ether quest amount or repeatability changed, which should stay under manual review until verified."
      ]
    },
    {
      eyebrow: "Current Data",
      title: "What can be stated safely",
      paragraphs: [
        "Official Season 10 notes safely support the system-level claims: Ether Tree expansion, Hell+ Quest Log visibility, and the importance of current patch context. Current community data tools also model Ether Point sources and spending, but exact values should be treated as live data until checked in-game.",
        "That is why this page gives a clear acquisition path while keeping exact point amounts, repeatability, and bug claims in Needs Manual Review."
      ]
    },
    {
      eyebrow: "FAQ",
      title: "Ether Points FAQ",
      cards: [
        {
          title: "How do I get Ether Tree points?",
          text: "Reach the late progression layer, check level 100 and Hell+ Ether quests, complete the quests, then spend points in the Ether Tree."
        },
        {
          title: "Are Ether Points skill points?",
          text: "No. They are tied to the Ether Tree progression system, not your regular character skill tree."
        },
        {
          title: "Is missing Ether a bug?",
          text: "Not by default. Most cases should first be checked against level, difficulty, Quest Log state, spent points, and current patch notes."
        },
        {
          title: "Where should I go next?",
          text: "If your issue is broader Season 10 progression, use the Season 10 guide; if it is boss or item access, check Mevius or Enchanted Sigil."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Review current-version progression context." },
    { label: "Enchanted Sigil", href: "/items/enchanted-sigil/", text: "Check item and crafting economy context." },
    { label: "Mevius Guide", href: "/bosses/mevius/", text: "Check a boss progression page." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Check campaign progression context." }
  ],
  sources: [
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.hstrackerAnnouncements,
    officialSources.heroSiegeDataEther,
    officialSources.tposeEtherTree,
    officialSources.vortexSeason10Progression,
    officialSources.inGameVerification
  ],
  needsManualReview: [
    "Exact starter Ether Point amount and exact timing, because launch-era community guides and later developer-announcement mirrors disagree.",
    "Exact repeatability and point amounts for each Ether quest on Hell difficulties and Inferno.",
    "Any claim that missing Ether Points is a confirmed bug rather than a level, difficulty, Quest Log, spent-point, or patch-state issue."
  ]
});

const mevius = pageFromMatrix("/bosses/mevius/", {
  title: "Hero Siege Mevius Guide - Location, How to Beat Mevius & What to Do After",
  description:
    "A practical Hero Siege Mevius guide covering location, how to reach and fight Mevius, Memory of Mevius, HP cautions, and what to do after the boss.",
  eyebrow: "Boss Guide",
  quickAnswer: [
    "Mevius is the major Act 7 boss checkpoint. Official wiki and current data sources agree on Act 7 context, but location labels differ across sources, so follow the Act 7 final boss route and your current quest marker rather than one old area name.",
    "For the fight, prioritize movement, add control, and steady damage uptime. Reliable public sources do not give enough current detail to publish exact HP, phase timings, or hidden mechanics by difficulty, so this page treats those numbers as manual-review data.",
    "After Mevius, continue the Season 10 campaign path toward Act 8, Odin, Act 9 Ebontharn, and then the post-Normal progression loop. Memory of Mevius is a related item/search intent, not the same thing as the base boss location question."
  ],
  sections: [
    {
      eyebrow: "Location",
      title: "Where to find Mevius",
      bullets: [
        "Use Act 7 as the reliable starting point for Mevius searches.",
        "Official wiki wording points players toward The Verge of Insanity, while current data tools surface Act 7 boss data with nearby zone naming such as Subconscious Mind / The Void.",
        "If those names do not match your current client, follow the active Act 7 quest marker and final boss path rather than forcing an older dungeon label.",
        "Do not confuse Mevius with Memory of Mevius, which is a related item/data entry and a separate search intent."
      ]
    },
    {
      eyebrow: "How To Reach",
      title: "How to reach and start the fight",
      bullets: [
        "Progress through Act 7 until your objective points at the final boss route.",
        "Use the current waypoint or quest tracker for the last Act 7 area because public sources disagree on exact displayed location names.",
        "Enter the boss instance, check difficulty, and avoid relying on a pre-Season 10 route if the UI has different area names.",
        "If you are revisiting the boss for farming, confirm your difficulty and waypoint state before comparing HP or rewards."
      ]
    },
    {
      eyebrow: "Strategy",
      title: "How to beat Mevius",
      paragraphs: [
        "The safe strategy advice is practical rather than number-heavy: keep moving, avoid standing still during boss patterns, clear or kite pressure before it traps you, and preserve defensive cooldowns for mistakes instead of spending everything on damage uptime.",
        "Because exact Mevius mechanics and HP are not consistently documented in current public sources, this guide does not claim specific phase names, timers, or damage thresholds. Treat any exact mechanic list from older guides as useful only after it matches your current fight."
      ]
    },
    {
      eyebrow: "HP And Difficulty",
      title: "What can be said about Mevius HP",
      bullets: [
        "Mevius HP scales by difficulty and current patch data, so a single HP number without source context is risky.",
        "The reviewed sources did not provide a reliable current Normal HP value suitable for publication.",
        "Use current data tools or direct in-game checks for exact HP before adding values to a build or boss-farm plan.",
        "If a SERP result promises 'Mevius HP Normal', verify the date and game version before trusting it."
      ]
    },
    {
      eyebrow: "After Mevius",
      title: "What to do after defeating Mevius",
      cards: [
        {
          title: "Continue the campaign",
          text: "In Season 10, move toward Act 8 and Odin, then Act 9 Ebontharn rather than stopping at Act 7.",
          href: "/season-10/"
        },
        {
          title: "Check boss-access items",
          text: "If you are shifting from campaign bosses into special boss access, review Enchanted Sigil before spending materials.",
          href: "/items/enchanted-sigil/"
        },
        {
          title: "Plan post-Normal progression",
          text: "If your next issue is difficulty access, review the Nightmare unlock guide.",
          href: "/progression/unlock-nightmare/"
        }
      ]
    },
    {
      eyebrow: "FAQ",
      title: "Mevius FAQ",
      cards: [
        {
          title: "Is Memory of Mevius the boss?",
          text: "No. It is a related item/search topic. The boss guide and the Memory item should not be merged into one exact-mechanic claim."
        },
        {
          title: "Where is Mevius located?",
          text: "Act 7 is the reliable context; exact area labels differ across sources, so follow the current Act 7 quest marker."
        },
        {
          title: "What should I do after Mevius?",
          text: "Continue toward Act 8 Odin, Act 9, and current Season 10 progression pages."
        },
        {
          title: "Can I publish Mevius Normal HP?",
          text: "Not from the reviewed sources alone. Exact HP stays under manual review until current data or in-game verification supports it."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Season 10 Overview", href: "/season-10/", text: "Continue into the current-version route map." },
    { label: "Enchanted Sigil", href: "/items/enchanted-sigil/", text: "Check boss-access item and crafting context." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Move ahead in campaign progression." },
    { label: "Unlock Nightmare", href: "/progression/unlock-nightmare/", text: "Check post-Normal difficulty access." }
  ],
  sources: [
    officialSources.officialWikiMevius,
    officialSources.officialWikiMemoryOfMevius,
    officialSources.officialWikiBossDungeons,
    officialSources.heroSiegeDataBosses,
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.inGameVerification
  ],
  needsManualReview: [
    "Exact Mevius Normal HP and HP by difficulty in the current patch.",
    "Exact displayed area name if the current client differs from official wiki and data-site naming.",
    "Exact fight phases, ability names, drop table, and Memory of Mevius acquisition behavior."
  ]
});
const enchantedSigil = pageFromMatrix("/items/enchanted-sigil/", {
  title: "Hero Siege Enchanted Sigil Guide - Where to Get, Price, Uses & Crafting",
  description:
    "A Hero Siege Enchanted Sigil guide covering what it is, where players get it, price caveats, crafting uses, Amun Ra access, and common mistakes.",
  eyebrow: "Item Guide",
  quickAnswer: [
    "Enchanted Sigil is an endgame-access and crafting material players search for when they are trying to craft keys or understand boss-access costs. Current community guides connect it most clearly to crafting Amun Ra keys.",
    "Do not treat one price as permanent. Current helper tools show price data for sigils and related keys, but those tools also warn that displayed defaults are not fixed Auction House prices and can move with the market or patch state.",
    "If you need one, check town/vendor availability, current market listings, crafting price tables, and the boss-access guide you are following. Keep exact vendor, drop, and repeatability claims under manual review unless your current game confirms them."
  ],
  sections: [
    {
      eyebrow: "Basics",
      title: "What Enchanted Sigil is",
      paragraphs: [
        "Enchanted Sigil is best treated as a material/economy item, not ordinary leveling gear. Players search it because they need to know whether to buy it, farm it, or save it for crafting.",
        "The strongest current use case found in public guides is Amun Ra access: community boss-access guides describe crafting an Amun Ra key using an Enchanted Sigil and a Key of Ra."
      ]
    },
    {
      eyebrow: "Where To Get",
      title: "Where and how players get Enchanted Sigils",
      bullets: [
        "Check current vendor or town listings first if your guide says the sigil is sold by a town vendor.",
        "Check Auction House or market listings if you are playing in an economy-enabled mode.",
        "Check current crafting and key price tools before deciding whether to buy a sigil or craft/farm the downstream key instead.",
        "Treat exact monster drops or repeatable farming routes as unconfirmed unless the current client or a reliable current data source shows them."
      ]
    },
    {
      eyebrow: "Price",
      title: "How to read price information",
      paragraphs: [
        "Price data for Enchanted Sigils is version- and economy-sensitive. HS Helper provides craft-price context and labels its data as work in progress, with default values that are not automatically the live Auction House price.",
        "For a player guide, the useful answer is not one frozen number. The useful answer is to compare vendor availability, current market listings, key crafting cost, and the value of the boss attempt you are trying to access."
      ]
    },
    {
      eyebrow: "Crafting Uses",
      title: "What Enchanted Sigil is used for",
      bullets: [
        "Current community Amun Ra guides describe Enchanted Sigil as part of the Amun Ra key craft.",
        "HeroSiegeData and HS Helper item/key references provide cross-checks for item and key economy context.",
        "If a recipe, price, or vendor source changes after a patch, prefer the current in-game crafting UI over old guide text.",
        "Do not spend every sigil immediately if you are unsure whether you need it for boss access or a later craft."
      ]
    },
    {
      eyebrow: "Common Mistakes",
      title: "Common Enchanted Sigil mistakes",
      cards: [
        {
          title: "Assuming fixed price",
          text: "Treat price tables as context. Check the current market or vendor state before buying."
        },
        {
          title: "Confusing use and source",
          text: "A guide may verify a crafting use without verifying every source or drop route."
        },
        {
          title: "Buying before planning",
          text: "If your goal is Amun Ra access, compare the full key cost, not only the sigil cost."
        }
      ]
    },
    {
      eyebrow: "FAQ",
      title: "Enchanted Sigil FAQ",
      cards: [
        {
          title: "Where does Enchanted Sigil drop?",
          text: "The reviewed sources do not support a precise current drop route. Check current data or in-game loot/crafting UI before publishing a drop claim."
        },
        {
          title: "What is it used for?",
          text: "The clearest current use found is boss-access crafting, especially Amun Ra key context in community guides."
        },
        {
          title: "What is the price?",
          text: "Use current market, vendor, and helper data. Do not treat an old guide number as a permanent price."
        },
        {
          title: "Should I farm or buy it?",
          text: "Buy when market price is lower than your time cost; farm or wait when prices spike or the source is already in your planned route."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Season 10 Overview", href: "/season-10/", text: "Return to the current-version hub." },
    { label: "Mevius Guide", href: "/bosses/mevius/", text: "Check a boss progression page." },
    { label: "How to Get Ether Points", href: "/systems/ether-points/", text: "Move into endgame progression systems." },
    { label: "Mandatory Quests", href: "/quests/mandatory/", text: "Separate mandatory progress from optional reward chasing." }
  ],
  sources: [
    officialSources.heroSiegeDataItemGuide,
    officialSources.hsHelperCraftPrices,
    officialSources.hsHelperKeyPrices,
    officialSources.tposeAmunRa,
    officialSources.hstrackerSeason10,
    officialSources.inGameVerification
  ],
  needsManualReview: [
    "Exact current vendor NPC, vendor price, and whether vendor availability differs by mode, patch, or progression state.",
    "Exact drop sources, drop rates, and repeatability for Enchanted Sigils.",
    "Exact live economy price because Auction House and helper defaults can diverge."
  ]
});
export const guidePages = [
  homePage,
  guideHub,
  season10,
  act9,
  mandatoryQuests,
  unlockNightmare,
  soulforgedRing,
  crowsFeather,
  mercenary,
  etherPoints,
  mevius,
  enchantedSigil
] as const satisfies GuidePage[];

export const guidePagesByRoute = Object.fromEntries(
  guidePages.map((page) => [page.route, page])
) as Record<string, GuidePage>;

export const publishedGuideRoutes = guidePages.map((page) => page.route);
