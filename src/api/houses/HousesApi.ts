import { fetchWithJson } from "api/CommonHelpers";
import config from "config.json";
import HouseResponse from "types/api/HouseResponse";
import { convertHouseDtoToHouse } from "./HousesApiHelpers";

const baseUrl = config.api.housesBaseUrl;

export const fetchHouse = async (id?: string): Promise<HouseResponse> => {
  if (!id) {
    throw new Error("No house id has been provided");
  }

  const { json: houseDto } = await fetchWithJson(`${baseUrl}/${id}`);

  return {
    house: convertHouseDtoToHouse(houseDto),
  };
};
