# DEFEATE THE GALATIC EMPIRE

## Your challenge is to build a server that queries the StarWars API for information on how to beat the Galactic Empire.

## Endpoints

│ GET | http://localhost:8000/dev/skywalkerStarships │

│ GET | http://localhost:8000/dev/speciesClassificationEp1 │

│ GET | http://localhost:8000/dev/galaxyPopulation │

## Star Wars API (SWAPI) Wrapper

This is a wrapper for the Star Wars API (SWAPI) which provides a simple way to interact with the API.

## Installation

To install, clone the repository and run:

`yarn install`

## Configuration

Add .env file with variable

`STARWARS_BASE_API=https://swapi.dev/api`

## Usage

Runs serverless offline
`yarn dev`

## Tests

`yarn test`

## Watch tests

`yarn test:watch`

## NOTES

- Return a list of the Starships related to Luke Skywalker:  
  `https://swapi.dev/api/people/1/`

- Return the classification of all species in the 1st episode:  
  `https://swapi.dev/api/films/4/`

- Return the total population of all planets in the Galaxy:
  - Get Count: `https://swapi.dev/api/planets`
  - Count is input here. Loop through and get population off prop, ignore "unknown" and accumulate.
