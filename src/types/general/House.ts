export default interface House {
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  hasDiedOut: boolean;
  hasOverlord: boolean;
  numberOfCadeBranches: number;
}
