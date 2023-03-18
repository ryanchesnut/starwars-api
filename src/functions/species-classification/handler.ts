import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {getSpeciesClassificationEp1} from './controller'

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let data: any = await getSpeciesClassificationEp1()
  return formatJSONResponse({
    message: `SpeciesClassificationEp`,
    data,
  });
};

export const main = middyfy(handler);
