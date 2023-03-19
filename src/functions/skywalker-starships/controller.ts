import { get } from "@libs/fetch";
import { Person, Starship } from "src/types";

export const getLukeData = async (): Promise<Person> => {
  const lukeData = (await get(
    process.env.STARWARS_BASE_API,
    "/people/1"
  )) as Person;
  return lukeData;
};

export const fetchStarship = async (starshipUrl: string): Promise<Starship> => {
  starshipUrl = starshipUrl.replace(process.env.STARWARS_BASE_API, "");
  console.log(process.env.STARWARS_BASE_API);
  console.log(starshipUrl);
  console.log();
  const starshipData = (await get(
    process.env.STARWARS_BASE_API,
    starshipUrl
  )) as Starship;
  console.log(starshipData);
  if (!starshipData) {
    throw Error("No Starship Data");
  }
  return starshipData;
};

export const getStarships = async (
  lukeData: Person
): Promise<Array<Starship>> => {
  if (!lukeData) {
    throw Error("No Luke Data");
  }
  const starshipsPromises: Array<Promise<Starship | null>> =
    lukeData?.starships?.map((starshipUrl: string) =>
      fetchStarship(starshipUrl)
    ) ?? [];
  const starships = await Promise.all(starshipsPromises);
  return starships.filter((starship) => starship !== null) as Starship[];
};

export const getLukesStarships = async () => {
  const lukeData = await getLukeData();
  return getStarships(lukeData);
};
