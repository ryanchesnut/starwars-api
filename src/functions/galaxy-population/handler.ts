import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {getGalaxyPopulation} from './controller'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let data: String = await getGalaxyPopulation()
  return formatJSONResponse({
    message: `GalaxyPopulation`,
    data,
  });
};

export const main = middyfy(handler);
