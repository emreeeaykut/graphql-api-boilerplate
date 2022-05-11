import 'reflect-metadata';
import common from '@config/common';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

export default async () => {
  useContainer(Container);

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/**/*.resolver.ts`],
    emitSchemaFile: {
      path: __dirname + '/schema/schema.gql',
      commentDescriptions: true,
      sortedSchema: false
    },
    container: Container
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: common.env !== 'production',
    plugins: [
      common.env === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ],

    context: ({ req, res }) => ({ req, res })
  });

  return apolloServer;
};
