import React, { FC } from "react";
import { fetchHouse } from "api/houses/HousesApi";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "components/misc/LoadingIndicator";
import { routes } from "routing/routes";
import { routeIdentifiers } from "routing/routesIdentifiers";
import HouseResponse from "types/api/HouseResponse";
import "styles/_HouseDetails.scss";
import { ReactComponent as BackIcon } from "icons/back-icon.svg";

const HouseDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, status } = useQuery<HouseResponse>(["house", id], () =>
    fetchHouse(id)
  );

  if (status === "error") {
    routes
      .find((route) => route.identifier === routeIdentifiers.error)
      ?.routingFunction(navigate);
  }

  if (status === "loading") {
    return <LoadingIndicator />;
  }

  return (
    <div className="house-details-page">
      <BackIcon
        className="back-icon"
        fontSize={50}
        onClick={() => navigate(-1)}
        id="back-button"
      />
      <div className="house-description">
        <section className="house-name">{data?.house.name}</section>
        <section className="house-details">
          {data?.house.region && (
            <div>
              Region: <i>{data.house.region}</i>
            </div>
          )}
          {data?.house.coatOfArms && (
            <div>
              Coat of arms: <i>{data.house.coatOfArms}</i>
            </div>
          )}
          {data?.house.words && (
            <div>
              Words: <i>{data?.house.words}</i>
            </div>
          )}
          {data?.house.titles &&
            (data.house.titles.length > 1 || data.house.titles[0].trim() !== "") && (
              <div>
                Titles: <i>{data?.house.titles.join(", ")}</i>
              </div>
            )}
          {data?.house.seats &&
            (data.house.seats.length > 1 || data.house.seats[0].trim() !== "") && (
              <div>
                Seats: <i>{data?.house.seats.join(", ")}</i>
              </div>
            )}
          <div>
            Has died out: <b>{data?.house.hasDiedOut ? "True" : "False"}</b>
          </div>
          <div>
            Has overlord: <b>{data?.house.hasOverlord ? "True" : "False"}</b>
          </div>
          <div>
            Number of cadet branches: <b>{data?.house.numberOfCadeBranches}</b>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HouseDetails;
