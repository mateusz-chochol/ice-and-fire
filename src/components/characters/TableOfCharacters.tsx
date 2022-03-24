import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAllCharactes } from "api/characters/CharactersApi";
import { useNavigate } from "react-router-dom";
import { routes } from "routing/routes";
import { routeIdentifiers } from "routing/routesIdentifiers";
import LoadingIndicator from "components/misc/LoadingIndicator";
import { Gender } from "types/enums/Gender";
import CharactersResponse from "types/api/CharactersResponse";
import "styles/_TableOfCharacters.scss";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableNavigation from "./TableNavigation";

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
        <TableHeader />
        {data && (
          <TableBody
            characters={data.characters}
            genderFilter={genderFilter}
            cultureFilter={cultureFilter}
          />
        )}
      </table>
      {data && (
        <TableNavigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          cultureFilter={cultureFilter}
          setCultureFilter={setCultureFilter}
          lastPage={data.lastPage}
        />
      )}
    </div>
  );
};

export default TableOfCharacters;
