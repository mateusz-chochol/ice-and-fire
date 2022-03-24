import { convertCharacterDtoToCharacter } from "api/characters/CharactersApiHelpers";
import Character from "types/general/Character";
import { mockData } from "../../mockData/CharactersMockData";

describe("CharactersApiHelpers", () => {
  describe("convertCharacterDtoToCharacter()", () => {
    const expectedCharacter: Character = {
      id: mockData.characterDto.url,
      character: `${
        mockData.characterDto.name
      } also known as ${mockData.characterDto.aliases.join(", ")}`,
      alive: "Died at 50 years old",
      gender: mockData.characterDto.gender,
      culture: mockData.characterDto.culture,
      allegiances: ["258"],
    };

    it("should correcty convert CharacterDTO to Character", () => {
      const convertedCharacter = convertCharacterDtoToCharacter(
        mockData.characterDto
      );

      expect(convertedCharacter).toEqual(expectedCharacter);
    });
  });
});
