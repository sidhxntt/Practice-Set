import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>404!</h1>
      <p>Requested Page Not Found.</p>
      <p>
        <i>
          <Link to={"/"}>Click here to go to Home Page</Link>
        </i>
      </p>
    </div>
  );
}
