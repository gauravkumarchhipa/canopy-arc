import { lastChapter } from "./story-chapters";

export function easeBetween(value: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

export function sampleStory(progress: number) {
  const chapter = Math.max(0, Math.min(1, progress)) * lastChapter;
  const from = Math.min(lastChapter - 1, Math.floor(chapter));
  const to = from + 1;
  const travel = chapter - from;
  const blend = easeBetween(travel, 0.09, 0.91);
  const lighting = easeBetween(travel, 0.29, 0.71);
  const active = travel < 0.5 ? from : to;
  const offset = active - chapter;
  const copy = 1 - easeBetween(Math.abs(offset), 0.17, 0.48);

  return { chapter, from, to, travel, blend, active, offset, copy,
    night: from % 2 === 0 ? lighting : 1 - lighting };
}
