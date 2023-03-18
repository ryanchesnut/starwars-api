import fetch from "node-fetch";

export const NodeFetch = {
    get: async(base: String, url: String) => {
        const fullUrl: string = `${base}${url}`; 
        const res = await fetch(fullUrl)
        if (!res) {
            console.error(`No response from get request from ${fullUrl}`, res)
            return { status: '500 No Response'}
        }
        if (res.status !== 200) {
            console.error(`Get response not 200 from ${fullUrl}`, res)
            return { status: res.status }
        }
        return res.json()
    }
}



