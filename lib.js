import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";

export async function getTask(day) {
  const response = await fetch(
    `https://adventofcode.com/2021/day/${day}/input`,
    {
      headers: {
        cookie: `session=${process.env.SESSION}`,
      },
    }
  );
  return response.text();
}
