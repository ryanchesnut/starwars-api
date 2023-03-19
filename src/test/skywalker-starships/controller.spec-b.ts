import {
  getLukeData,
  getStarships,
  fetchStarship,
} from "@functions/skywalker-starships/controller";
import nock from "nock";
import { mockPerson, mockStarships } from "./mocks";
jest.mock("@libs/fetch");

describe("getLukeData", () => {
  const baseURL = process.env.STARWARS_BASE_API;
  const path = "/people/1";

  beforeEach(() => {
    nock(baseURL).get(path).reply(200, mockPerson);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return Luke Skywalker's data", async () => {
    const result = await getLukeData();
    expect(result).toEqual(mockPerson);
  });
});

describe("getStarships", () => {
  const baseURL = process.env.STARWARS_BASE_API;

  beforeEach(() => {
    nock(baseURL).get("/starships/1").reply(200, mockStarships[0]);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return an array of Starships", async () => {
    const result = await getStarships(mockPerson);
    expect(result).toEqual([mockStarships[0]]);
  });

  it("should throw an error if no Luke data is provided", async () => {
    await expect(getStarships(null)).rejects.toThrowError("No Luke Data");
  });
});

describe("fetchStarship", () => {
  const baseURL = process.env.STARWARS_BASE_API;
  const starshipURL = "/starships/1";

  beforeEach(() => {
    nock(baseURL).get(starshipURL).reply(200, mockStarships[0]);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return a Starship object", async () => {
    const result = await fetchStarship(baseURL + starshipURL);
    expect(result).toEqual(mockStarships[0]);
  });

  it("should throw an error if no starship data is returned", async () => {
    nock.cleanAll(); // Remove the mock response
    nock(baseURL).get(starshipURL).reply(404); // Mock a 404 error instead
    await expect(fetchStarship(baseURL + starshipURL)).rejects.toThrowError(
      "No Starship Data"
    );
  });
});
