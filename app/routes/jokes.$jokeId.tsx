import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const jokeId = params.jokeId;
  if (!jokeId) {
    throw new Response("What a joke! Joke Id Not found 😆.", {
      status: 404,
    });
  }

  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) {
    throw new Response("What a joke! Joke Not found. 😆", {
      status: 404,
    });
  }

  return json({ joke });
};

export default function JokeRoute() {
  const { joke } = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here is your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">&quot;{joke.name}&quot; Permalink</Link>
    </div>
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-container">Huh? What the heck is {jokeId}?</div>
    );
  }

  return (
    <div className="error-container">
      There was an error loading joke by the id {jokeId}. Sorry.
    </div>
  );
}
