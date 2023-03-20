export const documentation = {
  summary: "Get the population of the galaxy",
  description: "Returns the population of the entire galaxy.",
  tags: ["Galaxy"],
  responses: {
    "200": {
      description: "A successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: "GalaxyPopulation",
              data: {
                type: "number",
                description: "list of the Starships related to Luke Skywalker",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid request",
    },
    "500": {
      description: "Internal server error",
    },
  },
};
