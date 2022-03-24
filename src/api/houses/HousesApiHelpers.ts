import HouseDTO from "types/dtos/HouseDTO";
import House from "types/general/House";

export const convertHouseDtoToHouse = (houseDto: HouseDTO): House => {
  return {
    name: houseDto.name,
    region: houseDto.region,
    coatOfArms: houseDto.coatOfArms,
    words: houseDto.words,
    titles: houseDto.titles,
    seats: houseDto.seats,
    hasDiedOut: !!houseDto.diedOut,
    hasOverlord: !!houseDto.overlord,
    numberOfCadeBranches: houseDto.cadetBranches?.length ?? 0,
  };
};
