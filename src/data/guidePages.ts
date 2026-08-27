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
    "The first batch focuses on pages with clear intent: Season 10 overview, Act 9, mandatory quests, Nightmare unlock, Soulforged Ring, Crow's Feather, mercenaries, and Ether Points.",
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
  title: "Hero Siege Season 10 Overview - Current-Version Guide",
  description:
    "A current-version Hero Siege Season 10 overview for returning players, covering Act 9, difficulty progression, Ether systems, quests, and outdated advice.",
  eyebrow: "Season 10",
  quickAnswer: [
    "Season 10 is the Ebontharn season. Its headline change is a free Act 9, reached after defeating Odin at the end of Act 8, plus a large progression reset around the Normal -> Nightmare -> Hell -> Inferno flow.",
    "The most important returning-player change is that Normal is now the only difficulty where you run the full Acts 1-9 campaign. After Normal is completed, Nightmare keeps the Normal waypoints, Nightmare now behaves like the old Hell 1 tier, and Hell moves much closer to late-game scaling.",
    "Ether progression is much more visible in Season 10: the official notes add more Ether and Incarnation nodes, patch notes say Ether quest progress is visible in the pause-menu Quest Log on Hell+, and current developer-announcement mirrors report base Ether Points at level 100."
  ],
  sections: [
    {
      eyebrow: "Core Changes",
      title: "What Season 10 actually changes",
      paragraphs: [
        "The official Steam launch announcement describes Season 10 as Ebontharn, a major update with Act 9, new chase zones, three new Uber fights, a new seasonal Abyssal Chest, and a broad list of item, class, monster, and system changes.",
        "The progression rewrite is the piece that most directly affects guides. Season 10 makes the Acts a Normal-difficulty campaign path, then shifts later difficulties toward farming, Ether, Incarnation, and endgame progression instead of repeating the full campaign route."
      ]
    },
    {
      eyebrow: "Progression",
      title: "How the new route should be read",
      bullets: [
        "Play through Normal as the campaign route, including Act 8 and the new Act 9.",
        "Act 9 opens after defeating Odin in Act 8, according to the official Ebontharn announcement.",
        "Finishing Normal moves the character into the Nightmare stage while keeping Normal waypoints, according to the official Season 10 progression notes.",
        "Nightmare is now positioned around old Hell 1 difficulty, and Hell is positioned much later than many older guides imply.",
        "Inferno becomes the later endgame destination after the new Nightmare and Hell flow."
      ]
    },
    {
      eyebrow: "Act 9",
      title: "What Act 9 is",
      paragraphs: [
        "Act 9 is Ebontharn, the new free campaign act added in Season 10. Official notes place it after Odin in Act 8 and describe it as the culmination point before the post-Normal progression loop.",
        "Community walkthroughs currently report that Act 9 ends with Cthulhu in the Abyssal Realm and that clearing that Normal route is the practical Nightmare unlock path. Treat exact NPC names and objective sequence as community-reported until checked in-game."
      ]
    },
    {
      eyebrow: "Systems",
      title: "Ether and Incarnation changes to notice",
      bullets: [
        "Season 10 adds more than 100 Ether Tree nodes and more than 600 Incarnation Tree nodes, according to the official patch-note sheet.",
        "The official notes say the maximum loadout count increased to 8, which matters for players managing different progression setups.",
        "Patch notes say completed and uncompleted Ether quests can be shown in the pause-menu Quest Log on Hell+.",
        "Developer-announcement mirrors currently report base Ether Points at level 100, while community guides written around launch mention different starter amounts, so exact point totals still need manual review."
      ]
    },
    {
      eyebrow: "Returning Players",
      title: "Old guides most likely to mislead you",
      cards: [
        {
          title: "Difficulty unlock guides",
          text: "Any guide that explains Nightmare or Hell using pre-Season 10 campaign repetition can point you at the wrong milestone."
        },
        {
          title: "Quest reward guides",
          text: "Soulforged Ring changed from older experience wording to a level-bounded Season 10 experience bonus, so old reward-value advice can be stale."
        },
        {
          title: "Ether guides",
          text: "Older Ether Tree guides may still explain the idea, but Season 10 node count, quest visibility, and starter-point reports have changed."
        },
        {
          title: "Mercenary notes",
          text: "Older mercenary setup advice should be checked against the current gear, revive, aura, and survivability behavior before using it in a build plan."
        }
      ]
    },
    {
      eyebrow: "Go Next",
      title: "Which page answers your next question",
      cards: [
        {
          title: "Act 9",
          text: "Use this if you defeated Odin, need to enter Ebontharn, or your Act 9 quest marker is missing.",
          href: "/act-9/"
        },
        {
          title: "Unlock Nightmare",
          text: "Use this if you finished Normal or defeated Cthulhu and Nightmare still does not appear.",
          href: "/progression/unlock-nightmare/"
        },
        {
          title: "Ether Points",
          text: "Use this if you hit level 100, enter Hell+, or see Ether quest progress but do not understand the points.",
          href: "/systems/ether-points/"
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Choose your next current-version page." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Move from season context into progression." },
    {
      label: "Unlock Nightmare",
      href: "/progression/unlock-nightmare/",
      text: "Check a difficulty unlock page."
    },
    { label: "Ether Points", href: "/systems/ether-points/", text: "Review a key system page." }
  ],
  sources: [
    officialSources.steamAnnouncements,
    officialSources.season10PatchSheet,
    officialSources.steamdbSeason10,
    officialSources.hstrackerSeason10,
    officialSources.hstrackerAnnouncements,
    officialSources.tposeUnlockHell,
    officialSources.vortexSeason10Progression
  ],
  needsManualReview: [
    "Exact starter Ether Point amount and timing, because current community guides and developer-announcement mirrors conflict around launch.",
    "Exact Act 9 NPC names, objective order, and final quest hand-in behavior after later hotfixes."
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
  title: "Hero Siege Ether Points - Current-Version System Guide",
  description:
    "How Ether Points work in Hero Siege Season 10, how to get them, where to spend them, and what to check when points or quests do not appear.",
  eyebrow: "System Troubleshooting Guide",
  quickAnswer: [
    "Ether Points are progression points spent in the Ether Tree. The official system notes describe Ether quests as special quests on Hell difficulties and Inferno, while Season 10 patch notes add much more Ether Tree space and better quest visibility.",
    "Current practical flow: reach post-campaign progression, hit level 100, enter Hell+ content where Ether quest progress can appear in the pause-menu Quest Log, complete the relevant Ether quests, then spend points in the Ether Tree.",
    "If Ether Points do not appear, it is often a progression or UI-state issue rather than a bug: check level 100, difficulty, Quest Log visibility, completed/uncompleted Ether quest state, and whether your source is using the latest Season 10 patch numbers."
  ],
  sections: [
    {
      eyebrow: "Basics",
      title: "What Ether Points are",
      paragraphs: [
        "Ether Points are not ordinary skill points. They belong to the Ether Tree progression layer, which lets players invest in endgame mechanics and farming targets.",
        "Season 10 did not remove that idea. Instead, it expanded the system: official patch notes add more than 100 Ether Tree nodes and hotfix notes improve the visibility of completed and uncompleted Ether quests on Hell+."
      ]
    },
    {
      eyebrow: "How To Get Them",
      title: "Current acquisition path",
      bullets: [
        "Reach the later progression stage instead of expecting Ether Points during early Normal campaign play.",
        "Hit level 100, which current community guides and developer-announcement mirrors identify as the start of Ether visibility or starter points.",
        "Enter Hell+ content. Official older Ether-system notes describe Ether quests on Hell difficulties and Inferno, and Season 10 patch notes say Ether quest status is visible in the pause menu on Hell+.",
        "Complete the Ether quests shown for your current difficulty or progression state.",
        "Spend points in the Ether Tree and adjust the tree when your farming target changes."
      ]
    },
    {
      eyebrow: "Ether Tree",
      title: "Ether Tree, Incarnation Tree, and points",
      paragraphs: [
        "Think of Ether Points as the currency for the Ether Tree. The tree changes which endgame mechanics you can force, improve, or build around, depending on current node wording.",
        "The Incarnation Tree is adjacent but separate. Season 10 added more than 600 Incarnation nodes, while the Ether Tree received more than 100 new nodes. Do not mix the two point systems when following guides."
      ]
    },
    {
      eyebrow: "Troubleshooting",
      title: "When Ether Points do not appear",
      bullets: [
        "Confirm your character is level 100 or otherwise in the current Ether unlock range shown by the game.",
        "Confirm you are in Hell+ or another difficulty where Ether quests are expected to appear.",
        "Open the pause-menu Quest Log and look for completed or uncompleted Ether quests; Season 10 hotfix notes specifically mention this visibility.",
        "Check whether you already spent points in the Ether Tree, reset the tree, or are looking at Incarnation progression instead.",
        "Compare exact point totals carefully. Community sources around launch mention different starter amounts, while developer-announcement mirrors later report a base level-100 amount."
      ]
    },
    {
      eyebrow: "Not Always A Bug",
      title: "Common false alarms",
      bullets: [
        "You are below level 100 and expecting the Ether Tree too early.",
        "You are still in Normal or Nightmare campaign progression and not in the expected Hell+ quest state.",
        "You are checking the wrong tree, especially confusing Incarnation nodes for Ether nodes.",
        "You are reading a Season 9 or launch-day guide with a starter-point number that changed in a hotfix.",
        "You completed a quest but have not refreshed the UI, reopened the Quest Log, or checked whether the point was already spent."
      ]
    },
    {
      eyebrow: "Decision Guide",
      title: "What to check first",
      cards: [
        {
          title: "No Ether UI",
          text: "Check level 100 and post-campaign progression before assuming a missing system."
        },
        {
          title: "No quest progress",
          text: "Check Hell+ Quest Log visibility and whether the Ether quest is completed or uncompleted."
        },
        {
          title: "Wrong point total",
          text: "Treat exact amounts as patch-sensitive and compare against the latest current-version notes."
        }
      ]
    }
  ],
  relatedGuides: [
    { label: "Guide Hub", href: "/guide/", text: "Return to the guide index." },
    { label: "Season 10 Overview", href: "/season-10/", text: "Review current-version context." },
    { label: "Mercenary Guide", href: "/systems/mercenary/", text: "Check another system page." },
    { label: "Act 9 Guide", href: "/act-9/", text: "Check progression context." }
  ],
  sources: [
    officialSources.season10PatchSheet,
    officialSources.hstrackerSeason10,
    officialSources.hstrackerAnnouncements,
    officialSources.tposeEtherTree,
    officialSources.vortexSeason10Progression,
    officialSources.inGameVerification
  ],
  needsManualReview: [
    "Exact starter Ether Point amount and exact timing, because launch-era community guides and later developer-announcement mirrors disagree.",
    "Exact repeatability and point amounts for each Ether quest on Hell difficulties and Inferno.",
    "Any claim that missing Ether Points is a confirmed bug rather than a level, difficulty, Quest Log, or spent-point state."
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
  etherPoints
] as const satisfies GuidePage[];

export const guidePagesByRoute = Object.fromEntries(
  guidePages.map((page) => [page.route, page])
) as Record<string, GuidePage>;

export const publishedGuideRoutes = guidePages.map((page) => page.route);
