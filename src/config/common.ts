export default {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST,
  port: process.env.PORT,
  graphqlPath: process.env.GRAPHQL_PATH
};
