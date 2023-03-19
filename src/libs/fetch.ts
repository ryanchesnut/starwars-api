import fetch from "node-fetch";

export const get = async (base: string, url: string) => {
  const fullUrl: string = `${base}${url}`;

  const res = await fetch(fullUrl);

  if (!res) {
    console.error(`No response from get request from ${fullUrl}`, res);
    throw new Error("No response from API");
  }
  if (res.status !== 200) {
    console.error(`Get response not 200 from ${fullUrl}`, res);
    return;
  }

  return res.json();
};
