import { get } from "@libs/fetch";
import { mockPerson } from "./mocks";
import nock from "nock";

describe("get function", () => {
  it("should return the JSON response if the request is successful", async () => {
    const base = "https://swapi.dev";
    const url = "/api/people/1/";
    nock(base).get(url).reply(200, mockPerson);
    const result = await get(base, url);
    expect(result).toEqual(mockPerson);
  });

  it("should throw an error if the request fails", async () => {
    const base = "https://swapi.dev";
    const url = "/api/people/1/";
    nock(base).get(url).reply(500);
    const result = await get(base, url);
    expect(result).toBe(undefined);
  });
});
