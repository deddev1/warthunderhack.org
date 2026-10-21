export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Setups', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-warthunder-map-awareness-include', title: 'What does map awareness include in the guide?', upvotes: 73,
    excerpt: 'A quick breakdown of vehicle, objective, and spotting information covered by the map awareness guide.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'War Thunder ESP wallhack setup guide', sourcePath: '/blog/warthunder-esp-wallhack-setup/',
    answer: 'The guide covers vehicle ESP, vehicle and spawn markers, loot information, spotting alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'War Thunder ESP wallhack setup guide', sourcePath: '/blog/warthunder-esp-wallhack-setup/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in Test Drive before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44,
    excerpt: 'The zoom guide focuses on finding a view that improves map context without making your player hard to control.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'War Thunder radar hack guide', sourcePath: '/blog/warthunder-radar-hack-guide/',
    answer: 'There is no single ideal zoom value for every player. The guide recommends adjusting gradually and checking that you can still track your vehicle, gun range, and nearby fights.',
    detail: 'Keep a quick reset to the default camera view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short practice session before settling on a new camera distance.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do delay settings affect player aimbot?', upvotes: 32,
    excerpt: 'A practical question about timing, combo readability, and why the aimbot guide recommends conservative tuning.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'War Thunder aimbot for ranked play', sourcePath: '/blog/warthunder-aimbot-ranked-guide/',
    answer: 'Delay settings control the spacing between automated actions. The guide recommends starting with slower timings and testing them in a practice setting before making changes.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'how-to-practice-auto-combos', title: 'What is a good way to practice an aimbot?', upvotes: 29,
    excerpt: 'Use a repeatable player setup, learn the sequence, and check each gun and ammo timing in a controlled lobby.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'War Thunder aimbot player aimbot', sourcePath: '/blog/warthunder-aimbot-combat-guide/',
    answer: 'Choose one player and one combo to practice at a time. The guide walks through example sequences and explains how target selection and ability order fit together.',
    detail: 'A custom lobby lets you repeat the sequence and see which steps need adjustment without the pressure of a live match.',
    tip: 'Learn the manual sequence first; that makes it much easier to spot when a configuration is mistimed.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'What additional tools are included in the Elite tier?', upvotes: 67,
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'War Thunder Elite tier guide', sourcePath: '/blog/warthunder-elite-tier-guide/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as Target Assist, Auto Parts Assist, Auto Repair Assist, and Camo Unlocker.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'How do Lite and Pro differ in practice?', upvotes: 53,
    excerpt: 'Lite centers on awareness features, while Pro adds player script tools; here is the short version.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'War Thunder Lite vs Pro: which tier fits you', sourcePath: '/blog/warthunder-lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on awareness tools such as ESP, vehicle and objective information, and zoom. Pro adds aimbot automation features on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional script modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about the Camo Unlocker utility?', upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'War Thunder Camo Unlocker guide', sourcePath: '/blog/warthunder-camo-unlocker-guide/',
    answer: 'The guide describes Camo Unlocker as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-gaijin-cannot-verify', title: 'What should I do if Gaijin cannot verify my War Thunder install?', upvotes: 24,
    excerpt: 'Start with Gaijin Games file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'Gaijin anti-cheat unable to verify War Thunder', sourcePath: '/blog/gaijin-bypass-warthunder-guide/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify War Thunder files through Steam / Gaijin.',
    detail: 'It also recommends fully exiting the Gaijin Launcher / Steam, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Gaijin Games launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does “external loader” mean?', upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'War Thunder external cheat guide', sourcePath: '/blog/warthunder-external-cheat-guide/',
    answer: 'The article uses “external” to describe software that runs separately from the War Thunder process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever War Thunder receives an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How can I check whether OBS captures an overlay?', upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Setups', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for War Thunder', sourcePath: '/blog/warthunder-stream-proof-setup/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What should I check after changing PCs or hardware?', upvotes: 33,
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'War Thunder HWID spoofer after ban', sourcePath: '/blog/warthunder-hwid-spoofer-after-ban/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What should I review before installing a new tool?', upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'War Thunder hack features guide', sourcePath: '/blog/warthunder-cheats-features-guide/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-warthunder-product-tier', title: 'How do I choose the right War Thunder product tier?', upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy War Thunder hack in 2026', sourcePath: '/blog/how-to-buy-warthunder-hack-2026/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'can-custom-lobby-cheat-codes-be-used-in-ranked', category: 'General', categoryTone: 'purple',
    title: 'Can I use War Thunder hack codes in ranked matchmaking?',
    excerpt: 'Quick answer from the practice lobby guide: built-in lobby commands only work in custom matches with cheats enabled.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'War Thunder hack codes guide: console commands for practice lobbies', sourcePath: '/blog/warthunder-cheat-codes-guide/',
    body: ['No. Test Drive islands and Test Drive sessions are for practice only. They do not carry into Ranked matchmaking or Realistic Battles.', 'Use Test Drive to learn aimbot smoothness, ESP ranges, and loadouts. The guide also explains the difference between practice drills and third-party War Thunder hack.'],
    comments: [
      { author: 'mid_or_feed', age: '1 hour ago', score: 24, body: 'Correct: load a Test Drive aim map or Test Drive before touching Ranked presets.' },
      { author: 'ancient_archivist', age: '48 min. ago', score: 11, body: 'The guide covers cannon, MG, and ATGM drills. Keep Ranked presets conservative after practice.' },
      { author: 'push_first', age: '35 min. ago', score: 8, body: 'Useful distinction. Test Drive practice tools are not ranked features.' },
    ],
  },
  {
    slug: 'how-to-enable-the-warthunder-console', category: 'General', categoryTone: 'purple',
    title: 'How do I practice War Thunder hack modules safely in Test Drive?',
    excerpt: 'Use Test Drive with your loader presets before jumping into Arcade or Ranked.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How to practice War Thunder hack safely', sourcePath: '/blog/how-to-use-warthunder-cheat-codes/',
    body: ['Launch the loader, load a Test Drive preset, then open War Thunder Test Drive from the hangar. Tune aimbot smoothness and ESP distance there before any live queue.', 'If overlays look wrong, confirm the status banner is online and that you launched War Thunder after the loader, not before.'],
    comments: [
      { author: 'pos4_roamer', age: '3 hours ago', score: 17, body: 'I always test in Test Drive after a Gaijin patch before touching Ranked presets.' },
      { author: 'carry_curious', age: '2 hours ago', score: 9, body: 'Loader first, then client. That order fixed most of my overlay issues.' },
    ],
  },
  {
    slug: 'practice-warthunder-hull-down-safely', category: 'Guides & Setups', categoryTone: 'blue',
    title: 'What is the safest way to practice hull-down spots?',
    excerpt: 'Use Test Drive with ESP to study sight lines, then fight without staring at overlays.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'War Thunder Test Drive tips for aimbot and ESP practice', sourcePath: '/blog/warthunder-console-cheats-tips/',
    body: ['Practice in Test Drive. Enable ESP boxes briefly to inspect hull-down angles and spawn positions, then fight with overlays minimized.', 'Repeat the same flank a few times so sight lines stick without waiting for a full Ranked match.'],
    comments: [
      { author: 'stack_and_pull', age: '5 hours ago', score: 13, body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for hull-down coverage.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Replaying the same flank in Test Drive beats learning only in Ranked.' },
    ],
  },
  {
    slug: 'what-to-check-after-a-warthunder-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a War Thunder patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing in Test Drive before queueing.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'Gaijin patch day checklist', sourcePath: '/blog/gaijin-patch-day-checklist/',
    body: ['Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify the setup in a bot or Realistic Battles lobby before returning to ranked.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'farm_pattern', age: '8 hours ago', score: 12, body: 'Testing after the update before ranked is the part I used to skip. Now I check the build note and run a quick Test Drive.' },
      { author: 'support_main_5', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'warthunder-lite-or-pro-aimbot', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: which tier includes vehicle aimbot?',
    excerpt: 'Our comparison guide breaks down the difference: Lite focuses on vision tools; Pro adds aimbot modules.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'War Thunder Lite vs Pro: feature comparison', sourcePath: '/blog/warthunder-lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on map awareness features such as vehicle ESP, objective information, radar, and stream-proof options. Pro includes those features and adds vehicle aimbot such as Aimbot, Smooth Aim, Sticky Aim, Weak-spot Priority, and Hotkey macros.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'one_more_game', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
    ],
  },
  {
    slug: 'how-to-learn-weapon-aim-in-test-drive', category: 'Guides & Setups', categoryTone: 'blue',
    title: 'How can I practice weapon aim without waiting for a real match?',
    excerpt: 'Use Test Drive and drill cannon, MG, and ATGM profiles with repeatable resets.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'War Thunder Test Drive practice guide: aim drills before ranked', sourcePath: '/blog/warthunder-cheat-codes-guide/',
    body: ['Use Test Drive. Practice one weapon profile at a time—cannon, MG, then ATGM—and reset between attempts.', 'For realistic timing, use your Ranked smoothness values in Test Drive before enabling aimbot in live games. The linked guide covers the full practice workflow.'],
    comments: [
      { author: 'mid_or_feed', age: '20 hours ago', score: 10, body: 'Start with a bot target and repeat the same spray until the tracking feels automatic.' },
      { author: 'ancient_archivist', age: '18 hours ago', score: 5, body: 'Keep Ranked presets conservative—Test Drive can hide how snappy your aim looks in replays.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
