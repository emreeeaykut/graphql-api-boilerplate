import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const databaseConnection = async () => {
  let name = 'default';

  if (process.env.NODE_ENV === 'test') {
    name = process.env.NODE_ENV;
  }

  const connectionOptions = await getConnectionOptions(name);

  await createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDatabaseConnection = async () => {
  await getConnection().close();
};
