import Character from "types/general/Character";

export default interface CharactersResponse {
  characters: Character[];
  lastPage: string;
}
