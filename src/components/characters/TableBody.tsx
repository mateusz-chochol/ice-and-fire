import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routing/routes";
import { routeIdentifiers } from "routing/routesIdentifiers";
import { Gender } from "types/enums/Gender";
import Character from "types/general/Character";

interface TableBodyProps {
  characters: Character[];
  genderFilter: Gender;
  cultureFilter: string;
}

const TableBody: FC<TableBodyProps> = ({
  characters,
  genderFilter,
  cultureFilter,
}) => {
  const navigate = useNavigate();
  const onHouseClick = (houseId: string) => {
    routes
      .find((route) => route.identifier === routeIdentifiers.house)
      ?.routingFunction(navigate, { houseId });
  };
  const filterData = (characters: Character[]): Character[] => {
    return characters.filter(
      (character) =>
        (genderFilter === Gender.ANY || character.gender === genderFilter) &&
        (!cultureFilter.trim() ||
          character.culture.toLowerCase().includes(cultureFilter.toLowerCase()))
    );
  };

  return (
    <tbody>
      {filterData(characters).map((character) => {
        return (
          <tr key={character.id}>
            <td>{character.character}</td>
            <td>{character.alive}</td>
            <td>{character.gender}</td>
            <td>{character.culture}</td>
            <td>
              {character.allegiances.length
                ? character.allegiances.map((allegiance) => (
                    <React.Fragment key={allegiance}>
                      <span
                        className="house-button"
                        onClick={() => onHouseClick(allegiance)}
                      >
                        {`${allegiance}`}
                      </span>{" "}
                    </React.Fragment>
                  ))
                : "No allegiances"}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
