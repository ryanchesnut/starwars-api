export const documentation = {
  summary: "Get Luke Skywalker's starships",
  description: "Returns all of Luke Skywalker's starships",
  tags: ["Luke", "Skywalker", "Starships"],
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
