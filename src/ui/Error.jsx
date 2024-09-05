import { useNavigate, useRouteError } from "react-router-dom";
import ButtonLink from "./ButtonLink";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <ButtonLink to={-1} onClick={() => navigate(-1)}>
        &larr; Go back
      </ButtonLink>
    </div>
  );
}

export default NotFound;
