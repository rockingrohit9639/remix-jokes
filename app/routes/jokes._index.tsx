import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
  });

  return json({ randomJoke });
}

export default function JokesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here is a random joke:</p>
      <p>{data.randomJoke?.content}</p>
      <Link to={data.randomJoke?.id}>
        &quot;{data.randomJoke?.name}&quot; Permalink
      </Link>
    </div>
  );
}
