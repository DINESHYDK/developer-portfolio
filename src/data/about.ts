import { PROJECTS } from "@/data/projects";

/**
 * About section copy — first draft (level 1).
 *
 * Facts come from public/resume.pdf and the live platform APIs.
 * Anything in [square brackets] is a placeholder only you can fill in;
 * it renders as-is so it's easy to spot on the preview deploy.
 */
export interface AboutBlock {
  id: "story" | "work" | "experience" | "next";
  label: string;
  heading: string;
  /** Optional one-line context shown above the paragraphs (role, dates…) */
  meta?: string;
  paragraphs: string[];
  /** Describes the illustration for screen readers */
  imageAlt: string;
}

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    id: "story",
    label: "01",
    heading: "Who I am",
    paragraphs: [
      "I'm Dinesh. I grew up in [hometown], and [one line on how you first got into computers or maths as a kid].",
      "Through school the goal was JEE. I ended up with AIR 3012 in JEE Main and AIR 3348 in JEE Advanced, and that got me into Computer Science at IIT (ISM) Dhanbad, where I'm now in my B.Tech (graduating 2028).",
    ],
    imageAlt:
      "Illustration of a road running from a house, past a stack of school books and a JEE exam sheet, to the IIT (ISM) campus.",
  },
  {
    id: "work",
    label: "02",
    heading: "What I work on",
    paragraphs: [
      "Two things, mostly. I build web products in TypeScript, Next.js and Supabase, and I do competitive programming in C++. I've solved 2,200+ problems and I'm a LeetCode Knight, CodeChef 3★ and Codeforces Pupil.",
      `I've built ${PROJECTS.length} projects so far. StudySync, a study tracker for friend groups, reached 50+ users in its first two weeks. Agent SLAM, a debate bot, took 2nd place at an IIT (ISM) competition. My Rubik's Cube solver reads a real cube through the camera and solves it in under 100 ms.`,
    ],
    imageAlt:
      "Illustration of a laptop showing code next to a contest scoreboard with accepted verdicts, above a rising rating graph.",
  },
  {
    id: "experience",
    label: "03",
    heading: "Experience",
    meta: "Accenture · Elite Engineer Intern · [month year – month year]",
    paragraphs: [
      "I joined Accenture as an Elite Engineer intern, working on [team or project].",
      "[What you built or shipped there, with a number if you have one.] [One thing the internship taught you that college didn't.]",
      "Before that I was in the top 8% nationwide for the AlgoUniversity Tech Fellowship 2025, and completed Google's Student Upskilling Program in advanced DSA.",
    ],
    imageAlt:
      "Illustration of a work desk with a sprint board on the monitor, a coffee mug, and an Accenture Elite Engineer intern badge.",
  },
  {
    id: "next",
    label: "04",
    heading: "What's next",
    paragraphs: [
      "Over the next year I want to get comfortable with harder DSA, push my Codeforces rating up, and get deeper into AI/ML: building features where a model does real work inside the product.",
      "I'm looking for a Software Engineering internship for 2027. If your team needs someone who can handle both the algorithm and the product around it, the contact form is just below.",
    ],
    imageAlt:
      "Illustration of a person climbing a mountain trail past milestones for harder DSA, AI/ML depth and a 2027 SWE internship, toward a flag at the top.",
  },
];
