import { NodeFetch } from "@libs/fetch";

export const getSpeciesClassificationEp1 = async () => {
    // https://swapi.dev/api/films/4/
    let filmData: any = await NodeFetch.get(process.env.STARWARS_BASE_API, '/films/4/')
   console.log(filmData)
   //console.log(await getSpecies(filmData)) 
   return getSpecies(filmData)
}

const getSpecies = async (filmData: any) => {
    if (!filmData) {
        throw Error('No Film Data')
    } 
    const speciesPromises: any = filmData?.species?.map((speciesUrl: String) => {
        return new Promise(async(resolve, reject) => {
            speciesUrl = speciesUrl.replace(process.env.STARWARS_BASE_API, "");
            const res: any = await NodeFetch.get(process.env.STARWARS_BASE_API, speciesUrl)
            if (!res) {
               return reject(null)
            }
            return resolve({ name: res.name, classification: res.classification })
        })
    })
    return Promise.all(speciesPromises)
}