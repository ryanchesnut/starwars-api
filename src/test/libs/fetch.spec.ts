import { get } from "@libs/fetch";
import fetch, { Response } from "node-fetch";

jest.mock("node-fetch");

describe("get function", () => {
  const base = "http://example.com";
  const url = "/test";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should make a fetch request with the correct URL", async () => {
    const expectedUrl = `${base}${url}`;
    const mockResponse = new Response(JSON.stringify({ data: "hello" }), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      mockResponse as Response
    );

    await get(base, url);

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should throw an error if there is no response", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(null);

    await expect(get(base, url)).rejects.toThrowError("No response from API");
  });

  it("should throw an error if the response status is not 200", async () => {
    const mockResponse = new Response(JSON.stringify({ data: "hello" }), {
      status: 500,
      headers: { "Content-type": "application/json" },
    });
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      mockResponse as Response
    );

    await expect(get(base, url)).rejects.toThrowError(
      "API returned status 500"
    );
  });

  it("should return the JSON response if the request is successful", async () => {
    const expectedResponse = { data: "test" };
    const mockResponse = new Response(JSON.stringify({ data: "hello" }), {
      status: 500,
      headers: { "Content-type": "application/json" },
    });
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      mockResponse as Response
    );

    const result = await get(base, url);

    expect(result).toEqual(expectedResponse);
  });
});
