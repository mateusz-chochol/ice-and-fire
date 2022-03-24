import TableOfCharacters from "components/characters/TableOfCharacters";
import HouseDetails from "components/house/HouseDetails";
import ErrorPage from "components/misc/ErrorPage";
import { generatePath, useNavigate } from "react-router-dom";
import Route from "types/routing/Route";
import { routeIdentifiers } from "./routesIdentifiers";

export const routes: Route[] = [
  {
    identifier: routeIdentifiers.house,
    path: "/house/:id",
    element: <HouseDetails />,
    routingFunction: (
      navigate: ReturnType<typeof useNavigate>,
      additionalArgs: { houseId: string }
    ) =>
      navigate(
        generatePath("/house/:id", {
          id: additionalArgs.houseId,
        })
      ),
  },
  {
    identifier: routeIdentifiers.error,
    path: "/error",
    element: <ErrorPage />,
    routingFunction: (navigate: ReturnType<typeof useNavigate>) =>
      navigate(generatePath("/error")),
  },
  {
    identifier: routeIdentifiers.index,
    path: "*",
    element: <TableOfCharacters />,
    routingFunction: (navigate: ReturnType<typeof useNavigate>) =>
      navigate(generatePath("/")),
  },
];
