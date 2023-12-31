import type { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/index.css";

import { Link } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function RootIndex() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
