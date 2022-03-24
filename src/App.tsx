import React from "react";
import Navbar from "components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { routes } from "routing/routes";
import "styles/global.scss";

const queryClient = new QueryClient();

function App() {
  const routing = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div>{routing}</div>
    </QueryClientProvider>
  );
}

export default App;
