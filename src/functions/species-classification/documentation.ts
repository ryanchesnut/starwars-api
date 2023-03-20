export const documentation = {
  summary: "Get the classification of all species in the 1st episode.",
  description: "Return the classification of all species in the 1st episode.",
  tags: ["Classification", "Species"],
  responses: {
    "200": {
      description: "A successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              population: {
                type: "number",
                description:
                  "The classification of all species in the 1st episode.",
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
