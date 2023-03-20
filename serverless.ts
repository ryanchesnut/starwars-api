import type { AWS } from "@serverless/typescript";

import skywalkerStarships from "@functions/skywalker-starships";
import speciesClassificationEp1 from "@functions/species-classification";
import galaxyPopulation from "@functions/galaxy-population";

const serverlessConfiguration: AWS = {
  service: "starwars-api",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dotenv-plugin",
    "serverless-openapi-documentation",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { skywalkerStarships, speciesClassificationEp1, galaxyPopulation },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    documentation: {
      // Add the plugin configuration here
      version: "1.0.0",
      title: "My Service API",
      description: "API for My Service",
      endpoint: "https://my-service-api.example.com",
    },
  },
};

module.exports = serverlessConfiguration;
