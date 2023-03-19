import {
  fetchStarship,
  getStarships,
} from "@functions/skywalker-starships/controller";
import { mockPerson } from "./mocks";
import fetch from "node-fetch";
jest.mock("@libs/fetch");

//describe("getLukeData", () => {
//   it("should return luke data", async () => {
//     const lukeData = {
//       name: "Luke Skywalker",
//       starships: ["https://swapi.dev/api/starships/12/"],
//     };

//     const mockNodeFetch = {
//       get: jest.fn().mockResolvedValue(lukeData),
//     };

//     const result = await getLukeData();

//     expect(result).toEqual(lukeData);
//     expect(mockNodeFetch.get).toHaveBeenCalledWith(
//       process.env.STARWARS_BASE_API,
//       "/people/1"
//     );
//   });
// });

describe("fetchStarship", () => {
  test("should return starship data", async () => {
    const starshipData = await fetchStarship(
      "https://swapi.dev/api/starships/9"
    );
    console.log("starshipData", starshipData);
    expect(starshipData).toBeDefined();
  });

  test("should return starship data", async () => {
    const starshipData = await fetch("https://swapi.dev/api/starships/12/");
    console.log("starshipData", starshipData);
    expect(starshipData).toBeDefined();
  });

  it("should throw error if no starship data", async () => {
    // const mockNodeFetch = {
    //   get: jest.fn().mockResolvedValue(null),
    // };

    await expect(fetchStarship("/api/starships/1/")).rejects.toThrow(
      "No Starship Data"
    );
  });
});

describe("getStarships", () => {
  it("should return an array of Starships for Luke Skywalker", async () => {
    const mockLukeData = mockPerson;
    // const mockNodeFetch = createMockNodeFetch([
    //   {
    //     url: "https://swapi.dev/api/starships/5/",
    //     response: { name: "Starship 1" },
    //   },
    //   { url: "https://swapi.dev/api/starships/9/", response: null },
    // ]);

    await expect(getStarships(mockLukeData)).rejects.toThrow(
      "No Starship Data"
    );
  });

  it("should throw an error if no data is provided", async () => {
    await expect(getStarships(null)).rejects.toThrow("No Luke Data");
  });
});

// const createMockNodeFetch = (responses: any[]): any => {
//   let index = 0;

//   const mockFetch = async (): Promise<any> => {
//     const response = responses[index];
//     index += 1;
//     return response;
//   };

//   return { get: mockFetch };
// };
