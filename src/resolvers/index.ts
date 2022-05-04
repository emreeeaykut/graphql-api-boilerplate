import { buildSchema } from 'type-graphql';
import { PostResolver } from './post.resolver';

export default async () => {
  return await buildSchema({
    resolvers: [PostResolver],
    emitSchemaFile: {
      path: __dirname + '/schema/schema.gql',
      commentDescriptions: true,
      sortedSchema: false
    },
    validate: true
  });
};
