import {
  getSpeciesClassificationEp1,
  getSpecies,
} from "@functions/species-classification/controller";

describe("getSpeciesClassificationEp1", () => {
  it("should return an array of Species", async () => {
    const species = await getSpeciesClassificationEp1();
    expect(Array.isArray(species)).toBe(true);
    expect(species.length).toBeGreaterThan(0);
    expect(species[0]).toHaveProperty("name");
    expect(species[0]).toHaveProperty("classification");
  });

  it("should throw an error when no film data is provided", async () => {
    await expect(getSpecies(null)).rejects.toThrow("No Film Data");
  });

  it("should resolve with null when species data is not found", async () => {
    const invalidSpeciesUrl =
      "https://swapi.dev/api/species/invalid-species-url/";
    const filmData = { species: [invalidSpeciesUrl] };
    const species = await getSpecies(filmData);
    expect(species[0]).toBeNull();
  });
});
