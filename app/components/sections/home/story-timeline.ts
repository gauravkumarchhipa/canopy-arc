import { lastChapter } from "./story-chapters";

const roomPositions = [72, 55, 37, 33, 52, 68];

export function easeBetween(value: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

export function sampleStory(progress: number) {
  const chapter = Math.max(0, Math.min(1, progress)) * lastChapter;
  const from = Math.min(lastChapter - 1, Math.floor(chapter));
  const to = from + 1;
  const travel = chapter - from;
  const blend = easeBetween(travel, 0.15, 0.85);
  const active = travel < 0.5 ? from : to;
  const offset = active - chapter;
  const cue = easeBetween(Math.abs(offset), 0.12, 0.5);

  return {
    from, to, blend, active, offset,
    roomPosition: roomPositions[from] + (roomPositions[to] - roomPositions[from]) * blend,
    copy: 1 - cue * 0.21,
  };
}
