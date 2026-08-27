export interface PageMatrixEntry {
  page: string;
  route: string;
  keyword: string;
  userQuestion: string;
  pageType: string;
  sourcePriority: string;
  priority: "P0" | "P1" | "P2";
  launchDecision: string;
}

export const pageMatrix: PageMatrixEntry[] = [
  {
    page: "Hero Siege Season 10 Overview",
    route: "/season-10/",
    keyword: "hero siege season 10",
    userQuestion:
      "What changed in Hero Siege Season 10, and what should returning or new players know first?",
    pageType: "Hub / Current Version Guide",
    sourcePriority:
      "Official patch notes → Steam announcements → verified in-game/community notes",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Act 9 Guide",
    route: "/act-9/",
    keyword: "hero siege act 9",
    userQuestion: "How do I progress through Act 9 in Hero Siege Season 10?",
    pageType: "Progression Guide",
    sourcePriority:
      "Official patch notes → in-game quest flow → verified community reports",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Mandatory Quests",
    route: "/quests/mandatory/",
    keyword: "hero siege mandatory quests",
    userQuestion:
      "Which Hero Siege quests are mandatory or especially worth doing in Season 10?",
    pageType: "Quest Guide",
    sourcePriority:
      "Official quest data → in-game verification → current community consensus",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Unlock Nightmare",
    route: "/progression/unlock-nightmare/",
    keyword: "hero siege unlock nightmare",
    userQuestion:
      "How do I unlock Nightmare difficulty in the current version of Hero Siege?",
    pageType: "Progression / How-to",
    sourcePriority:
      "Official progression rules → in-game verification → current community reports",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Soulforged Ring",
    route: "/quests/soulforged-ring/",
    keyword: "hero siege soulforged ring",
    userQuestion:
      "How do I get the Soulforged Ring, and is it still worth doing in Season 10?",
    pageType: "Quest / Reward Guide",
    sourcePriority:
      "Official/in-game quest data → current patch context → verified community reports",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Crow's Feather",
    route: "/quests/crows-feather/",
    keyword: "hero siege crow's feather",
    userQuestion: "How do I get Crow's Feather, and is the quest worth doing now?",
    pageType: "Quest / Reward Guide",
    sourcePriority:
      "In-game quest data → official references → current community reports",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Mercenary Guide",
    route: "/systems/mercenary/",
    keyword: "hero siege mercenary",
    userQuestion: "Where do I recruit a mercenary and how does the system work?",
    pageType: "System Guide",
    sourcePriority:
      "In-game system data → official references → verified community notes",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Ether Points",
    route: "/systems/ether-points/",
    keyword: "hero siege ether points",
    userQuestion: "How do I get Ether Points, and why might they not appear?",
    pageType: "System / Troubleshooting Guide",
    sourcePriority:
      "Official patch notes → in-game mechanics → current community reports",
    priority: "P0",
    launchDecision: "Launch",
  },
  {
    page: "Hero Siege Incarnation Tree",
    route: "/systems/incarnation-tree/",
    keyword: "hero siege incarnation tree",
    userQuestion:
      "How does the Incarnation Tree fit into progression after level 100?",
    pageType: "System / Progression Guide",
    sourcePriority:
      "Official patch notes → in-game mechanics → verified build/community references",
    priority: "P1",
    launchDecision: "Phase 2",
  },
  {
    page: "Hero Siege Unlock Hell",
    route: "/progression/unlock-hell/",
    keyword: "hero siege unlock hell",
    userQuestion: "How do I unlock Hell difficulty in Hero Siege Season 10?",
    pageType: "Progression / How-to",
    sourcePriority:
      "Official progression rules → in-game verification → current community reports",
    priority: "P1",
    launchDecision: "Phase 2",
  },
  {
    page: "Hero Siege Act 8 Guide",
    route: "/act-8/",
    keyword: "hero siege act 8",
    userQuestion: "How do I start and complete Act 8 in the current progression?",
    pageType: "Progression Guide",
    sourcePriority:
      "In-game quest flow → official references → verified community notes",
    priority: "P1",
    launchDecision: "Phase 2",
  },
  {
    page: "Hero Siege Ether Tree",
    route: "/systems/ether-tree/",
    keyword: "hero siege ether tree",
    userQuestion:
      "How does the Ether Tree work and what should a beginner understand first?",
    pageType: "System Guide",
    sourcePriority:
      "Official patch notes → in-game mechanics → current guide cross-check",
    priority: "P1",
    launchDecision: "Phase 2",
  },
  {
    page: "Hero Siege Seething Souls",
    route: "/quests/seething-souls/",
    keyword: "hero siege seething souls",
    userQuestion: "How do I complete the Seething Souls quest?",
    pageType: "Quest Guide",
    sourcePriority:
      "In-game quest data → official references → current wiki cross-check",
    priority: "P1",
    launchDecision: "Phase 2 / SERP crowded",
  },
  {
    page: "Hero Siege Hunger Issue",
    route: "/troubleshooting/hunger-issue/",
    keyword: "hero siege hunger issue",
    userQuestion: "How do I fix or complete the Hunger Issue quest/problem?",
    pageType: "Troubleshooting / Quest Guide",
    sourcePriority:
      "In-game quest data → official references → current guide cross-check",
    priority: "P1",
    launchDecision: "Phase 2 / SERP crowded",
  },
  {
    page: "Hero Siege Steam Verification Failed",
    route: "/troubleshooting/steam-verification-failed/",
    keyword: "hero siege steam verification failed",
    userQuestion: "What should I do when Hero Siege Steam verification fails?",
    pageType: "Troubleshooting Guide",
    sourcePriority:
      "Steam support → official game support → verified community fixes",
    priority: "P2",
    launchDecision: "Only if demand persists",
  },
  {
    page: "Hero Siege Ping Timeout",
    route: "/troubleshooting/ping-timeout/",
    keyword: "hero siege ping timeout",
    userQuestion:
      "How can I troubleshoot Hero Siege ping timeout or connection issues?",
    pageType: "Troubleshooting Guide",
    sourcePriority:
      "Official support → Steam/community reports → safe generic network checks",
    priority: "P2",
    launchDecision: "Only if demand persists",
  },
  {
    page: "Hero Siege Guide",
    route: "/guide/",
    keyword: "hero siege guide",
    userQuestion:
      "What should a new or returning player do first in Hero Siege Season 10?",
    pageType: "Guide Hub",
    sourcePriority: "Official game info → patch notes → site internal pages",
    priority: "P2",
    launchDecision: "Launch as navigation hub",
  },
];
