import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getSpeciesClassificationEp1 } from './controller'
import { Species } from 'src/types';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let data = await getSpeciesClassificationEp1() as Array<Species>
  return formatJSONResponse({
    message: `SpeciesClassificationEp`,
    data,
  });
};

export const main = middyfy(handler);
