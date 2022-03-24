import { RouteObject, useNavigate } from "react-router-dom";

export default interface Route extends RouteObject {
  identifier: string;
  routingFunction: (navigate: ReturnType<typeof useNavigate>, ...args: any[]) => any;
}
