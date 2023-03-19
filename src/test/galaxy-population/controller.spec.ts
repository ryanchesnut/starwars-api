import {
  getNumberOfPlanets,
  getAllPlanets,
  sumPlanetPopulation,
} from "@functions/galaxy-population/controller";
import { Planet } from "src/types";

import { planet1, planet2, planet3, planet4, planet5, planet6 } from "./mocks";

test("Should return a number of planets on Star Wars API", async () => {
  const numberOfPlanets = await getNumberOfPlanets();
  expect(typeof numberOfPlanets).toBe("number");
});

test("Should return an array of planets data from Star Wars API with correct length", async () => {
  const planetData = await getAllPlanets(5);
  expect(Array.isArray(planetData)).toBeTruthy(); // checking if it returns an array
  expect(planetData).toHaveLength(5); // checking if the length is equal to the expected length
});

test("Should throw error when no parameter provided", async () => {
  await expect(getAllPlanets(undefined)).rejects.toThrow(Error); //checking whether it throws error when no argument is passed
});

test("Should return the correct result for known population planets data", () => {
  const planetData: Planet[] = [planet1, planet2];
  const expectedResult = "300000";
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});

test("Should return the correct result for known population planets data with edge cases", () => {
  const planetData: Planet[] = [planet1, planet2, planet3, planet4];
  const expectedResult = "300000";
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});

test("Should return 0 when No population found in planets data ", () => {
  const planetData: Planet[] = [planet3, planet4];
  const expectedResult = "0"; // since all population values are either unknow, or '0'
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});

test("Should return 0 if empty array provided", () => {
  const planetData: Planet[] = []; // empety planet data
  const expectedResult = "0";
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});

test("Should return 0 when empty string", () => {
  const planetData: Planet[] = [planet5]; // empety planet data
  const expectedResult = "0";
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});

test("Should return 0 when undefined", () => {
  const planetData: Planet[] = [planet6]; // empety planet data
  const expectedResult = "0";
  const result = sumPlanetPopulation(planetData);
  expect(result).toBe(expectedResult);
});
