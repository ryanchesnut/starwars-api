import { get } from "@libs/fetch";
import { Planet, Planets } from "src/types";

export const getGalaxyPopulation = async (): Promise<String> => {
  let numberOfPlanets: Number = await getNumberOfPlanets();
  const allPlanetsData: Array<Planet> = await getAllPlanets(numberOfPlanets);
  return sumPlanetPopulation(allPlanetsData);
};

export const getNumberOfPlanets = async (): Promise<Number> => {
  let planetData = (await get(
    process.env.STARWARS_BASE_API,
    "/planets"
  )) as Planets;
  return planetData?.count;
};

export const getAllPlanets = async (
  numberOfPlanets: Number
): Promise<Array<Planet>> => {
  if (!numberOfPlanets) {
    throw Error("Must have a number of planets");
  }
  let planetPromiseArray: Array<Promise<Planet>> = [];

  for (let i: number = 1; i <= numberOfPlanets; i++) {
    planetPromiseArray.push(
      new Promise(async (resolve, reject) => {
        const res = (await get(
          process.env.STARWARS_BASE_API,
          `/planets/${i}`
        )) as Planet;
        if (!res) {
          return reject(null);
        }
        return resolve(res);
      })
    );
  }
  return Promise.all(planetPromiseArray);
};

export const sumPlanetPopulation = (planetData: any): String => {
  const initialValue: Number = 0;
  let total = planetData.reduce((acc: bigint, planet: Planet) => {
    if (
      planet.population &&
      planet.population !== "unknown" &&
      Number(planet.population) > 0
    ) {
      return BigInt(acc) + BigInt(planet.population);
    } else {
      return acc;
    }
  }, initialValue);
  return total.toString();
};
