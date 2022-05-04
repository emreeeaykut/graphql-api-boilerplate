const env = process.env.NODE_ENV === 'development' ? __dirname + '/src' : __dirname + '/dist';

export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${env}/entities/**/*{.ts,.js}`],
  migrations: [`${env}/database/migrations/**/*{.ts,.js}`],
  subscribers: [`${env}/database/subscribers/**/*{.ts,.js}`],
  seeds: [`${env}/database/seeds/**/*{.ts,.js}`],
  factories: [`${env}/database/factories/**/*{.ts,.js}`],
  cli: {
    entitiesDir: 'src/entities/',
    migrationsDir: 'src/database/migrations/',
    subscribersDir: 'src/database/subscribers/'
  }
};
