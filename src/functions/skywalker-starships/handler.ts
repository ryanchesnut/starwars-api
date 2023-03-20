import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getLukesStarships } from "./controller";
import { Starship } from "src/types";

import schema from "./schema";
/**
 * Get a list of starships from the Star Wars universe.
 *
 * @route GET /starships
 * @group Starships - Operations related to starships
 * @returns {object} 200 - An array of starships
 * @returns {Error}  default - Unexpected error
 */
const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let data = (await getLukesStarships()) as Array<Starship>;
  return formatJSONResponse({
    message: `SkywalkerStartships`,
    data,
  });
};

export const main = middyfy(handler);
