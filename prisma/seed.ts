import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const rohit = await db.user.create({
    data: {
      username: "rohit",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getJokes().map((joke) => {
      return db.joke.create({
        data: {
          ...joke,
          jokesterId: rohit.id,
        },
      });
    })
  );
}

seed();

function getJokes() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: "Why did the two Java methods get a divorce?",
      content: `Because they had constant arguments.`,
    },
    {
      name: "Why did the private classes break up?",
      content: `Because they never saw each other.`,
    },
    {
      name: "Why do most Java programmers wear glasses?",
      content: `Because they don’t see sharp.`,
    },
    {
      name: "What’s the first step in understanding recursion?",
      content: `To understand recursion, you must first understand recursion.`,
    },
    {
      name: "Why do submarines all run Linux?",
      content: `Because you can’t open Windows under water.`,
    },
  ];
}
