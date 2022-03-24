import { FC } from "react";
import "styles/_ErrorPage.scss";

const ErrorPage: FC = () => {
  return (
    <div className="error-page">
      <div className="error-page-description" data-testid="description">
        Oops... Something went wrong
      </div>
    </div>
  );
};

export default ErrorPage;
