import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

function getDefaults() {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'travvit',
    entities: [],
    autoLoadEntities: true,
  } as TypeOrmModuleOptions;
}

/**
 * Creates a local database configuration object
 * @returns
 */
function getLocalDBConfig() {
  return {
    ...getDefaults(),
    synchronize: true, // Set to false in production
    logging: true,
  };
}

/**
 * Creates a production database configuration object
 * @returns
 */
function getProdDBConfig(configService: ConfigService) {
  return {
    ...getDefaults(),
    type: configService.get('database.type'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    synchronize: false,
    logging: false,
  };
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        if (configService.get('env.environment') === 'localhost') {
          return getLocalDBConfig();
        }
        return getProdDBConfig(configService);
      },
    }),
  ],
})
export class DatabaseModule {}
