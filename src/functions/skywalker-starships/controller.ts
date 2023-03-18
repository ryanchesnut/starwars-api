import { NodeFetch } from "@libs/fetch";

export const getLukesStarships = async () => {
    let lukeData: any = await NodeFetch.get(process.env.STARWARS_BASE_API, '/people/1')
    console.log(lukeData)
   return getStarships(lukeData)
}

const getStarships = async (lukeData: any) => {
    if (!lukeData) {
        throw Error('No Luke Data')
    } 
    const starshipsPromises: any = lukeData?.starships?.map((starshipUrl: String) => {
        return new Promise(async(resolve, reject) => {
            starshipUrl = starshipUrl.replace(process.env.STARWARS_BASE_API, "");
            const res: any = await NodeFetch.get(process.env.STARWARS_BASE_API, starshipUrl)
            if (!res) {
               return reject(null)
            }
            return resolve(res)
        })
    })
    return Promise.all(starshipsPromises)
}