import { fetchWithJson } from "api/CommonHelpers";
import CharactersResponse from "types/api/CharactersResponse";
import config from "config.json";
import {
  convertCharacterDtoToCharacter,
  getLastPageId,
} from "./CharactersApiHelpers";

const baseUrl = config.api.charactersBaseUrl;

export const fetchAllCharactes = async (
  page: number,
  resultsPerPage: number
): Promise<CharactersResponse> => {
  const urlWithQueryParams = `${baseUrl}?page=${page}&pageSize=${resultsPerPage}`;
  const { headers, json: characterDtos } = await fetchWithJson(urlWithQueryParams);
  const lastPage = getLastPageId(headers);

  return {
    characters: characterDtos.map(convertCharacterDtoToCharacter),
    lastPage: lastPage ?? "1",
  };
};
