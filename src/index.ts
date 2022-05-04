import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { createConnection } from 'typeorm';
import schema from './resolvers';
import { Logger } from './utils';

require('dotenv').config();

(async () => {
  await createConnection();
    

  const port = process.env.PORT;
  const host = process.env.HOST;
  const app = express();

  app.use(cors({ origin: true }));

  app.use(helmet.xssFilter());

  app.use(
    compression({
      filter: (req, res) => {
        return true;
      }
    })
  );

  app.use(express.json());

  const server = new ApolloServer({
    schema: await schema(),
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context: ({ req, res }) => ({ req, res })
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port);

  Logger.info(`GraphQL server is running on ${host}:${port}${server.graphqlPath}`);
})();
