import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import common from '@config/common';
import cors from '@config/cors';
import session from '@config/session';
import apollo from './apollo';
import { Logger } from './utils';
import { databaseConnection } from '@config/database';

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

const prepareServer = async () => {
  try {
    const apolloServer = await apollo();

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: common.graphqlPath });

    await databaseConnection();
  } catch (err) {
    Logger.error('server-error: ', err);
  }

  return app;
};

export default async () => await prepareServer();
