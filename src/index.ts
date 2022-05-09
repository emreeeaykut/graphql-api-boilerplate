require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import common from '@config/common';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { useContainer } from 'typeorm';
import { Logger } from './utils';
import { Container } from 'typeorm-typedi-extensions';
import { buildSchema } from 'type-graphql';
import session from '@config/session';
import cors from '@config/cors';
import { databaseConnection } from '@config/database';

const bootstrap = async () => {
  try {
    const port = common.port;

    const host = common.host;

    const app = express();

    app.use(cors);

    app.use(session);

    app.use(helmet.xssFilter());

    app.use(
      compression({
        filter: (req, res) => {
          return true;
        }
      })
    );

    app.use(express.json());

    useContainer(Container);

    await databaseConnection();

    const schema = await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.resolver.ts`],
      emitSchemaFile: {
        path: __dirname + '/schema/schema.gql',
        commentDescriptions: true,
        sortedSchema: false
      },
      container: Container
    });

    const server = new ApolloServer({
      schema,
      introspection: common.env !== 'production',
      plugins: [
        common.env === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground()
      ],

      context: ({ req, res }) => ({ req, res })
    });

    await server.start();

    server.applyMiddleware({ app });

    app.listen(port);

    Logger.info(`GraphQL server is running on ${host}:${port}${server.graphqlPath}`);
  } catch (err) {
    Logger.error('error: ', err);
  }
};

bootstrap();
