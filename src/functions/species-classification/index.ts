import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";
import { documentation } from "./documentation";
export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "speciesClassificationEp1",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        documentation: { ...documentation },
      },
    },
  ],
};
