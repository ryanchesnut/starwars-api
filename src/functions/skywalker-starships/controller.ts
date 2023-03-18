import { NodeFetch } from "@libs/fetch";
import { Person, Starship } from "src/types";

export const getLukesStarships = async () => {
    let lukeData = await NodeFetch.get(process.env.STARWARS_BASE_API, '/people/1') as Person
   return getStarships(lukeData)
}

const getStarships = async (lukeData: Person): Promise<Array<Starship>> => {
    if (!lukeData) {
        throw Error('No Luke Data')
    } 
    const starshipsPromises: Array<Promise<Starship>> = lukeData?.starships?.map((starshipUrl: String) => {
        return new Promise(async(resolve, reject) => {
            starshipUrl = starshipUrl.replace(process.env.STARWARS_BASE_API, "");
            const res = await NodeFetch.get(process.env.STARWARS_BASE_API, starshipUrl) as Starship
            if (!res) {
               return reject(null)
            }
            return resolve(res)
        })
    })
    return Promise.all(starshipsPromises)
}