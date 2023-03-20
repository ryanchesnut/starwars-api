import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getLukesStarships } from "./controller";
import { Starship } from "src/types";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let data = (await getLukesStarships()) as Array<Starship>;
  return formatJSONResponse({
    message: `SkywalkerStartships`,
    data,
  });
};

export const main = middyfy(handler);
