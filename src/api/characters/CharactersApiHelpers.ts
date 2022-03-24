import CharacterDTO from "types/dtos/CharacterDTO";
import Character from "types/general/Character";

const getCharacterAliveStatus = ({
  born,
  died,
}: {
  born: string;
  died: string;
}): string => {
  if (!born && !died) {
    return "Unknown";
  }

  if (!born) {
    return "No";
  }

  if (died) {
    const yearPattern = /\d+/;
    const bornYear = Number(born.match(yearPattern));
    const diedYear = Number(died.match(yearPattern));

    return `Died at ${diedYear - bornYear} years old`;
  }

  return "Yes";
};

const getCharacterAllegiancesIds = ({
  allegiances,
}: {
  allegiances: string[];
}): string[] => {
  return allegiances.map((allegiance) => {
    const splittedLink = allegiance.split("/");

    return splittedLink[splittedLink.length - 1];
  });
};

const getCharacterName = ({
  name,
  aliases,
}: {
  name: string;
  aliases: string[];
}) => {
  if (!name && !aliases) {
    return "No known name";
  }

  if (!aliases || (aliases.length === 1 && !aliases[0])) {
    return name;
  }

  if (!name) {
    return aliases.join(", ");
  }

  return `${name} also known as ${aliases.join(", ")}`;
};

const getCharacterCulture = ({ culture }: { culture: string }): string => {
  if (!culture || culture.trim() === "") {
    return "Unknown";
  }

  return culture;
};

export const getLastPageId = (headers: Headers): string | undefined => {
  return headers
    .get("link")
    ?.match(/rel="first", <(.*)>; rel="last"/)
    ?.at(1)
    ?.match(/page=(\d+)/)
    ?.at(1);
};

export const convertCharacterDtoToCharacter = (
  characterDto: CharacterDTO
): Character => {
  return {
    id: characterDto.url,
    character: getCharacterName(characterDto),
    alive: getCharacterAliveStatus(characterDto),
    gender: characterDto.gender,
    culture: getCharacterCulture(characterDto),
    allegiances: characterDto.allegiances.length
      ? getCharacterAllegiancesIds(characterDto)
      : [],
  };
};
