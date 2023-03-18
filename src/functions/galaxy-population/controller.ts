import { NodeFetch } from "@libs/fetch";
import { Planet } from "src/types";

export const getGalaxyPopulation = async (): Promise<String> => {
    let numberOfPlanets: Number = await getNumberOfPlanets()
    const allPlanetsData: Array<Planet> = await getAllPlanets(numberOfPlanets)
    return sumPlanetPopulation(allPlanetsData)
}

const getNumberOfPlanets = async (): Promise<Number> => {
    let planetData: any = await NodeFetch.get(process.env.STARWARS_BASE_API, '/planets')
    return planetData?.count
}

const getAllPlanets = async (numberOfPlanets: Number): Promise<Array<Planet>> => {
    if (!numberOfPlanets) {
        throw Error('Must have a number of planets')
    } 
    let planetPromiseArray: Array<Promise<Planet>> = []

    for (let i: number = 1; i <= numberOfPlanets; i++){
        planetPromiseArray.push(
            new Promise(async (resolve, reject) => {
            const res: any = await NodeFetch.get(process.env.STARWARS_BASE_API, `/planets/${i}`)
            if (!res) {
               return reject(null)
            }
            return resolve(res)
        }))

    }
    return Promise.all(planetPromiseArray)
}

const sumPlanetPopulation = (planetData: any): String => {
    const initialValue: Number = 0;
  let total = planetData.reduce((acc: bigint, planet: any) => {
       if (planet.population && planet.population !== 'unknown' && planet.population > 0) {
             return BigInt(acc) + BigInt(planet.population)
        } else { 
            return acc
        }
  }, initialValue)
    return total.toString()
}