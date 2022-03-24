import { FC } from "react";
import "styles/_LoadingIndicator.scss";

const ErrorPage: FC = () => {
  return (
    <div className="loading-indicator">
      <div className="loading-indicator-description">Loading...</div>
    </div>
  );
};

export default ErrorPage;
