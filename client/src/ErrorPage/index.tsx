import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
