import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    this.logger.debug('Connecting to database...');
    this.logger.log('Server started ');

    return {
      type: 'postgres' as const,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      entities: [`dist/!**!/!**!/!*.entity{.ts,.js}`],
      logging: true
    } as TypeOrmModuleOptions;
  }
}
