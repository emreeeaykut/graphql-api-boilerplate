require('dotenv').config();
import common from '@config/common';
import server from './server';
import { Logger } from './utils';

const bootstrap = async () => {
  try {
    server()
      .then((app) => app.listen(common.port))
      .catch((err) => {
        throw new Error(err);
      });

    Logger.info(`GraphQL server is running on ${common.host}:${common.port}${common.graphqlPath}`);
  } catch (err) {
    Logger.error('app-error: ', err);
  }
};

bootstrap();
