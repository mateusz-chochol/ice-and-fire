import { FC } from "react";
import "styles/_LoadingIndicator.scss";

const LoadingIndicator: FC = () => {
  return (
    <div className="loading-indicator">
      <div className="loading-indicator-description">Loading...</div>
    </div>
  );
};

export default LoadingIndicator;
