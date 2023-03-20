import {
  getSpeciesClassificationEp1,
  getSpecies,
} from "@functions/species-classification/controller";

import { mockFilms, mockSpecies, mockClassifications } from "./mocks";
import nock from "nock";

describe("getSpecies", () => {
  beforeEach(() => {
    nock(process.env.STARWARS_BASE_API)
      .get("/films/4/")
      .reply(200, mockFilms[1]);

    for (let idx = 0; idx < mockFilms[1].species.length; idx++) {
      nock(process.env.STARWARS_BASE_API)
        .get(
          mockFilms[1].species[idx].replace(process.env.STARWARS_BASE_API, "")
        )
        .reply(200, mockSpecies[idx]);
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("returns an array of species", async () => {
    const result = await getSpecies(mockFilms[1]);
    expect(result).toEqual(mockClassifications);
  });

  it("throws an error if no film data is provided", async () => {
    await expect(getSpecies(null)).rejects.toThrowError("No Film Data");
  });
});

describe("getSpeciesClassificationEp1", () => {
  beforeEach(() => {
    nock(process.env.STARWARS_BASE_API)
      .get("/films/4/")
      .reply(200, mockFilms[1]);

    for (let idx = 0; idx < mockFilms[1].species.length; idx++) {
      nock(process.env.STARWARS_BASE_API)
        .get(
          mockFilms[1].species[idx].replace(process.env.STARWARS_BASE_API, "")
        )
        .reply(200, mockSpecies[idx]);
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("returns an array of species from episode 4", async () => {
    const result = await getSpeciesClassificationEp1();
    expect(result).toEqual(mockClassifications);
  });
});
