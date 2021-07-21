import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

declare let process: {
  env: {
    NODE_ENV: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    TYPEORM_ENTITIES: string;
    TYPEORM_MIGRATIONS: string;
    TYPEORM_SEEDERS: string;
    TYPEORM_FACTORIES: string;
  };
};

interface ITypeormSeeding {
  seeds: string[];
  factories: string[];
}

const config: MysqlConnectionOptions & ITypeormSeeding = {
  type: 'mysql',
  // Configuration,
  database: process.env.MYSQL_DATABASE || 'database',
  username: process.env.MYSQL_USERNAME || 'username',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  entities: [process.env.TYPEORM_ENTITIES],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  seeds: [process.env.TYPEORM_SEEDERS],
  factories: [process.env.TYPEORM_FACTORIES],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
