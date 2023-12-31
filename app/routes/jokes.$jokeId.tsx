import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const jokeId = params.jokeId;
  if (!jokeId) {
    throw new Error("Joke id not found");
  }

  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) {
    throw new Error("Joke id not found");
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
