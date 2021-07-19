import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  // Configuration,
  database: process.env.MYSQL_DATABASE || 'database',
  username: process.env.MYSQL_USERNAME || 'username',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOST || 'localhost',
  port: (process.env.MYSQL_PORT as unknown as number) || 3306,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
