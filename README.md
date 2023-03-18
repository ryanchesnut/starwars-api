Endpoints:

- Return a list of the Starships related to Luke Skywalker
  https://swapi.dev/api/people/1/
- Return the classification of all species in the 1st episode
  https://swapi.dev/api/films/4/
- Return the total population of all planets in the Galaxy
  -- Get Count
  https://swapi.dev/api/planets
  -- Count is input here
  Loop through and get population off prop, ignore "unknown" and accumulate

Star Wars API (SWAPI) Wrapper
This is a wrapper for the Star Wars API (SWAPI) which provides a simple way to interact with the API.

Installation
To install, clone the repository and run:

yarn install

Usage
To use the wrapper, import the functions you want to use from the swapi.ts file. The functions currently available are:

getStarshipsByCharacter(characterName: string): Promise<Starship[]>: Returns a list of Starships related to the provided character name.
getSpeciesClassificationByEpisode(episodeNumber: number): Promise<string[]>: Returns the classification of all species in the provided episode.
getGalaxyPopulation(): Promise<string>: Returns the total population of all planets in the galaxy.

import { getStarshipsByCharacter } from './swapi';

async function example() {
const starships = await getStarshipsByCharacter('Luke Skywalker');
console.log(starships);
}

example();

This will output a list of Starships related to Luke Skywalker.

Testing
To run tests, use the following command:

npm run test

Contributing
Contributions are welcome! To contribute, please fork the repository and create a pull request.
