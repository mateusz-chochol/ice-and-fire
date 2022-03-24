import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAllCharactes } from "api/characters/CharactersApi";
import Character from "types/general/Character";
import { useNavigate } from "react-router-dom";
import { routes } from "routing/routes";
import { routeIdentifiers } from "routing/routesIdentifiers";
import LoadingIndicator from "components/misc/LoadingIndicator";
import { Gender } from "types/enums/Gender";
import CharactersResponse from "types/api/CharactersResponse";
import "styles/_TableOfCharacters.scss";

// INFO: the first filtering system I've done was just passing the parameters to the query string
// but since the doc says "It should be possible to filter the list of Characters returned from API by Gender."
// it implies that we first do the API request and then do filtering on the client
// hence the implementation on the client instead of inserting the filters into the query string
// With filtering by API it would be usefull to implement some kind of debouncing to server isn't swarmed with request
// while user is still typing

const TableOfCharacters: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [genderFilter, setGenderFilter] = useState<Gender>(Gender.ANY);
  const [cultureFilter, setCultureFilter] = useState<string>("");
  const { data, status } = useQuery<CharactersResponse>(
    ["characters", currentPage, pageSize],
    () => fetchAllCharactes(currentPage, pageSize),
    {
      keepPreviousData: true,
      staleTime: 30000,
    }
  );
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

  useEffect(() => {
    const savedPage = Number(localStorage.getItem("currentPage"));
    const savedPageSize = Number(localStorage.getItem("pageSize"));

    if (savedPage) {
      setCurrentPage(savedPage);
    }

    if (savedPageSize) {
      setPageSize(savedPageSize);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("pageSize", pageSize.toString());
  }, [pageSize]);

  useEffect(() => {
    if (data && Number(data.lastPage) < currentPage) {
      setCurrentPage(Number(data.lastPage));
    }
  }, [data, currentPage]);

  if (status === "error") {
    routes
      .find((route) => route.identifier === routeIdentifiers.error)
      ?.routingFunction(navigate);
  }

  if (status === "loading") {
    return <LoadingIndicator />;
  }

  return (
    <div className="table-of-characters-container">
      <table className="table-of-characters">
        <thead>
          <tr>
            <th>Name</th>
            <th>Alive</th>
            <th>Gender</th>
            <th>Culture</th>
            <th>Allegiances</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            filterData(data.characters).map((character) => {
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
      </table>
      <div className="table-navigation">
        <div className="pages-navigation">
          <div className="pages-navigation-page-description">
            Current page: {currentPage} / {data?.lastPage}
          </div>
          <div className="pages-navigation-buttons-group">
            <button
              className={
                currentPage === 1
                  ? "pages-navigation-button-disabled"
                  : "pages-navigation-button"
              }
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First page
            </button>
            <button
              className={
                currentPage === 1
                  ? "pages-navigation-button-disabled"
                  : "pages-navigation-button"
              }
              type="button"
              onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous page
            </button>
            <button
              className={
                currentPage === Number(data?.lastPage)
                  ? "pages-navigation-button-disabled"
                  : "pages-navigation-button"
              }
              type="button"
              onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              disabled={currentPage === Number(data?.lastPage)}
            >
              Next page
            </button>
            <button
              className={
                currentPage === Number(data?.lastPage)
                  ? "pages-navigation-button-disabled"
                  : "pages-navigation-button"
              }
              type="button"
              onClick={() => setCurrentPage(data ? Number(data.lastPage) : 1)}
              disabled={currentPage === Number(data?.lastPage)}
            >
              Last page
            </button>
          </div>
        </div>
        <div className="filters">
          <div className="filter">
            <label htmlFor="gender-filter-select">Gender:</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as Gender)}
              name="gender-filter-select"
              id="gender-filter-select"
            >
              <option value={Gender.ANY}>Any</option>
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="culture-filter">Culture:</label>
            <input
              placeholder="Wes..."
              name="culture-filter"
              type="text"
              value={cultureFilter}
              onChange={(e) => setCultureFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="page-size-select">
          <label htmlFor="page-size-select">Page size:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            name="page-size-select"
            id="page-size-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableOfCharacters;
