import { FC } from "react";
import { Gender } from "types/enums/Gender";

interface TableNavigationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  genderFilter: Gender;
  setGenderFilter: React.Dispatch<React.SetStateAction<Gender>>;
  cultureFilter: string;
  setCultureFilter: React.Dispatch<React.SetStateAction<string>>;
  lastPage: string;
}

const TableNavigation: FC<TableNavigationProps> = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  genderFilter,
  setGenderFilter,
  cultureFilter,
  setCultureFilter,
  lastPage,
}) => {
  return (
    <div className="table-navigation">
      <div className="pages-navigation">
        <div className="pages-navigation-page-description">
          Current page: {currentPage} / {lastPage}
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
              currentPage === Number(lastPage)
                ? "pages-navigation-button-disabled"
                : "pages-navigation-button"
            }
            type="button"
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            disabled={currentPage === Number(lastPage)}
          >
            Next page
          </button>
          <button
            className={
              currentPage === Number(lastPage)
                ? "pages-navigation-button-disabled"
                : "pages-navigation-button"
            }
            type="button"
            onClick={() => setCurrentPage(Number(lastPage))}
            disabled={currentPage === Number(lastPage)}
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
  );
};

export default TableNavigation;
