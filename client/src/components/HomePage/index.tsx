import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h3>Links</h3>
      <ul>
        <li>
          <Link to={"/tasks"}>Tasks</Link>
        </li>
        <li>
          <Link to={"/users"}>Users</Link>
        </li>
      </ul>
    </div>
  );
}
