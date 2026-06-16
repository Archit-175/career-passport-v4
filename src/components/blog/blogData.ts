// ── Blog content for the gallery (/blog) ────────────────────────────────────
// Each post becomes one card in the wrapping grid that curves into a sphere.

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

// 24 landscape photos. Text overlay (drawn on a canvas texture) is what makes
// each card read as a distinct editorial entry.
const IMAGE_COUNT = 24;
const imageFor = (i: number) =>
  `/images/journal-${String((i % IMAGE_COUNT) + 1).padStart(2, "0")}.jpeg`;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Curated, on-brand editorial titles. Order interleaves categories.
const RAW: Array<[category: string, title: string, readTime: number]> = [
  ["Verification", "Why a résumé can't prove what you actually did", 6],
  ["Hiring Signal", "The quiet death of the keyword filter", 5],
  ["Trust & Data", "What verified work history really means", 7],
  ["Career Growth", "Your best work happens between job titles", 4],
  ["Product", "Designing trust into every credential", 6],
  ["Field Notes", "Notes from a thousand verified careers", 8],
  ["The Passport", "One portable record for your whole career", 5],
  ["Future of Work", "Hiring after the age of the CV", 7],
  ["Reputation", "Reputation you can finally take with you", 4],
  ["Verification", "Proof beats persuasion, every time", 5],
  ["Hiring Signal", "Signal over noise in the talent market", 6],
  ["Trips", "How a single trip can change a career", 5],
  ["Career Growth", "The skills that never make it onto a CV", 6],
  ["Product", "Behind the seal: how verification works", 9],
  ["Trust & Data", "Privacy by design, proof on demand", 7],
  ["Field Notes", "What recruiters are actually looking for", 5],
  ["The Passport", "A passport for the work you're proud of", 4],
  ["Future of Work", "When portfolios replace promises", 6],
  ["Reputation", "Endorsements that can't be gamed", 5],
  ["Verification", "The quiet power of a verified claim", 4],
  ["Hiring Signal", "Stop guessing. Start verifying.", 5],
  ["Trips", "Real-world work as the new internship", 7],
  ["Career Growth", "Career capital compounds quietly", 6],
  ["Product", "Designing for the moment of trust", 5],
  ["Trust & Data", "Who really owns your professional story?", 8],
  ["Field Notes", "Lessons from the verification frontier", 6],
  ["The Passport", "Carry your proof, not your promises", 4],
  ["Future of Work", "The slow unbundling of the job title", 7],
  ["Reputation", "Earned, verified, and portable", 5],
  ["Verification", "From claims to credentials", 4],
  ["Hiring Signal", "Reading talent without the résumé", 6],
  ["Trips", "Field experience that finally counts", 5],
  ["Career Growth", "Growth you can actually point to", 6],
  ["Product", "The anatomy of a trusted profile", 7],
  ["Trust & Data", "Verification without surveillance", 6],
  ["Field Notes", "Inside the hiring black box", 5],
  ["The Passport", "Every project, properly attributed", 4],
  ["Future of Work", "Work is changing. Proof should too.", 6],
  ["Reputation", "The compounding value of credibility", 7],
  ["Verification", "Trust, but verify — automatically", 5],
  ["Trust & Data", "The audit trail behind every claim", 6],
  ["Career Growth", "Small wins, permanently recorded", 4],
  ["Hiring Signal", "What a verified profile says first", 5],
  ["The Passport", "Your work, gathered in one trusted place", 4],
  ["Field Notes", "Conversations with the people who hire", 7],
  ["Future of Work", "Life beyond the application form", 6],
  ["Verification", "How we confirm what really happened", 8],
  ["Reputation", "Credibility that follows you forward", 5],
  ["Trips", "When the field becomes the classroom", 6],
  ["Product", "Designing proof people actually trust", 5],
  ["Trust & Data", "You decide who sees what", 4],
  ["Career Growth", "The portfolio that keeps itself", 5],
  ["Hiring Signal", "Hiring for evidence, not eloquence", 6],
  ["Future of Work", "The end of the unverifiable claim", 5],
];

export const POSTS: BlogPost[] = RAW.map(([category, title, readTime], i) => ({
  id: `post-${i}`,
  category,
  title,
  readTime: `${readTime} min read`,
  date: `${MONTHS[(11 - (i % 12)) % 12]} 2026`,
  image: imageFor(i),
}));

// Shared editorial body for the (intentionally basic) article template.
export const ARTICLE_BODY: string[] = [
  "For most of working history, the story of a career has been told in claims. A line on a résumé. A title in a profile. A bullet point that asks the reader to simply take your word for it. The problem is that words are cheap, and the gap between what people say they've done and what they've actually done has only grown wider.",
  "Career Passport starts from a different premise: that the work itself is the credential. Every contribution, every shipped project, every real-world trip and engagement leaves a trail of verifiable signal. Instead of asking a hiring manager to trust a summary, we let the work speak — attributed, timestamped, and confirmed by the people who were there.",
  "The result is a record that travels with you. It doesn't live inside one company's HR system or expire when you change jobs. It's yours — portable, durable, and impossible to quietly inflate. When the proof is built in, the conversation changes from \"convince me\" to \"show me,\" and that is a far better conversation for everyone in the room.",
  "There's a quieter benefit, too. When your contributions are captured as they happen, you stop losing the small, defining moments of a career — the side project that taught you the most, the messy launch you rescued, the trip that reshaped how you think. These are the things a résumé flattens into nothing. A passport keeps them.",
  "We're building toward a world where trust in hiring isn't a leap of faith but a matter of record. Where talent is read by what it has demonstrably done, not by how well it writes about itself. It's early, and there's a great deal still to build — but the direction is clear, and we'd love for you to come along.",
];

export const PULL_QUOTE =
  "The work itself should be the credential — attributed, verifiable, and entirely yours.";
