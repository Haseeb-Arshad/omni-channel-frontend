// Deterministic profile summary generator used by the onboarding flow.
const ROLE_SNIPPETS = [
  "is a full-stack builder crafting agent-first systems for fast-moving teams",
  "is a product-minded engineer bringing human context into automated workflows",
  "is a researcher-operator pairing conversation design with memory-first architectures",
  "is a technical founder orchestrating multi-agent experiences with a customer lens",
  "is a platform thinker translating complex requirements into reliable automation",
  "is a systems-minded leader scaling AI copilots across support, sales, and operations",
];

const FOCUS_SNIPPETS = [
  "{firstName} is currently shipping onboarding journeys that blend live agents with async intelligence.",
  "{firstName} recently mapped every touchpoint into a knowledge graph so agents can echo brand tone within seconds.",
  "{firstName} has been experimenting with retrieval-augmented conversation loops to keep teams aligned in real time.",
  "{firstName} just piloted workflow APIs that turn call summaries into actionable CRM updates automatically.",
  "{firstName} is prototyping voice-first experiences that feel cinematic yet stay compliant for regulated teams.",
  "{firstName} is exploring how lightweight automation can coach new operators through complex handoffs.",
];

const TRAIT_SNIPPETS = [
  "Teammates describe {firstName} as composed under pressure, opinionated about craft, and generous with context.",
  "{firstName} is known for sketching ideas quickly, validating with real customers, and iterating with intention.",
  "People notice how {firstName} pairs thoughtful documentation with a bias for small, measurable launches.",
  "{firstName} keeps the stack tidy, the roadmap honest, and the feedback loops tight with stakeholders.",
  "{firstName} balances principled architecture with playful experimentation so teams stay curious.",
  "{firstName} has a knack for translating abstract strategies into rituals that teams actually adopt.",
];

const HOBBY_SNIPPETS = [
  "Outside of work {firstName} curates lo-fi playlists, explores pixel art landscapes, and shares weekend build logs.",
  "When the laptop closes {firstName} trail runs, photographs street shadows, and hosts salons for fellow makers.",
  "{firstName} recharges by cooking with friends, restoring vintage synths, and writing essays about systems thinking.",
  "Downtime means slow coffee, designing speculative interfaces, and volunteering with emerging founders for {firstName}.",
  "{firstName} stays grounded with analog journaling, climbing sessions, and long walks that spark fresh prompts.",
  "Weekend projects for {firstName} include woodworking, sound design experiments, and mentoring community builders.",
];

function seededIndex(name: string, length: number, salt = 0): number {
  const normalized = name.trim().toLowerCase();
  if (!normalized || length <= 0) {
    return 0;
  }
  let total = salt * 31;
  for (let i = 0; i < normalized.length; i += 1) {
    total += normalized.charCodeAt(i) + i + salt;
  }
  return Math.abs(total) % length;
}

function format(template: string, name: string, firstName: string): string {
  return template
    .replace(/\{name\}/g, name)
    .replace(/\{firstName\}/g, firstName);
}

export function synthesizeProfileSummary(rawName: string): string {
  const name = (rawName ?? "").trim() || "This member";
  const firstName = name.split(/\s+/)[0] || name;

  const role = ROLE_SNIPPETS[seededIndex(name, ROLE_SNIPPETS.length)];
  const focus = format(
    FOCUS_SNIPPETS[seededIndex(name, FOCUS_SNIPPETS.length, 7)],
    name,
    firstName,
  );
  const trait = format(
    TRAIT_SNIPPETS[seededIndex(name, TRAIT_SNIPPETS.length, 11)],
    name,
    firstName,
  );
  const hobby = format(
    HOBBY_SNIPPETS[seededIndex(name, HOBBY_SNIPPETS.length, 17)],
    name,
    firstName,
  );

  return `${name} ${role}. ${focus}\n\n${trait} ${hobby}`;
}
