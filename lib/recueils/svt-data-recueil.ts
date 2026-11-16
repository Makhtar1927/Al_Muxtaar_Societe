import { SVTEpreuveItem } from './svt-part1';
import { SVT_EPREUVES_PART1 } from './svt-part1';
import { SVT_EPREUVES_PART2 } from './svt-part2';
import { SVT_EPREUVES_PART3 } from './svt-part3';
import { SVT_EPREUVES_PART4 } from './svt-part4';
import { SVT_EPREUVES_PART5 } from './svt-part5';

export type { SVTEpreuveItem };

export const SVT_RECUEIL_30_EPREUVES: SVTEpreuveItem[] = [
  ...SVT_EPREUVES_PART1,
  ...SVT_EPREUVES_PART2,
  ...SVT_EPREUVES_PART3,
  ...SVT_EPREUVES_PART4,
  ...SVT_EPREUVES_PART5,
];
