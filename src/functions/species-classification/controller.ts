import { NodeFetch } from "@libs/fetch";
import { Movie, Species } from "src/types";

export const getSpeciesClassificationEp1 = async (): Promise<Array<Species>> => {
    let filmData: Movie = await NodeFetch.get(process.env.STARWARS_BASE_API, '/films/4/')
   return getSpecies(filmData)
}

const getSpecies = async (filmData: Movie): Promise<Array<Species>> => {
    if (!filmData) {
        throw Error('No Film Data')
    } 
    const speciesPromises:  Array<Promise<Species>> = filmData?.species?.map((speciesUrl: String) => {
        return new Promise(async(resolve, reject) => {
            speciesUrl = speciesUrl.replace(process.env.STARWARS_BASE_API, "");
            const res: any = await NodeFetch.get(process.env.STARWARS_BASE_API, speciesUrl)
            console.log(res)
            if (!res) {
               return reject(null)
            }
            return resolve({ name: res.name, classification: res.classification })
        })
    })
    return Promise.all(speciesPromises)
}