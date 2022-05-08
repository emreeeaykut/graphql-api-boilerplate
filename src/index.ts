require('dotenv').config();
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
import { createConnection, useContainer } from 'typeorm';
import { Logger } from './utils';
import { Container } from 'typeorm-typedi-extensions';
import { buildSchema } from 'type-graphql';

const bootstrap = async () => {
  try {
    useContainer(Container);

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
  } catch (err) {
    Logger.error('error: ', err);
  }
};

bootstrap();
