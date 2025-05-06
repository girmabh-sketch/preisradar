import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import configuration from './config/configuration';
import { ComplaintController } from './rest-api/controllers/complaint/complaint.controller';
import { ComplaintService } from './rest-api/controllers/complaint/complaint.service';
import { ComplaintEntity } from './rest-api/models/complaint.entity';
import { FuelPriceEntity } from './rest-api/models/fuel-price.entity';
import { OpeningTimesEntity } from './rest-api/models/opening-times.entity';
import { OpeningTimesOverrideEntity } from './rest-api/models/opening-times-override-entity';
import { PriceController } from './rest-api/controllers/prices/price.controller';
import { PriceService } from './rest-api/controllers/prices/price.service';
import { SeedDataController } from './rest-api/seed-data/seed-data.controller';
import { SeedDataService } from './rest-api/seed-data/seed-data.service';
import { StationDetailController } from './rest-api/controllers/station-details/station-details.controller';
import { StationDetailService } from './rest-api/controllers/station-details/station-details.service';
import { StationEntity } from './rest-api/models/station.entity';
import { StationIdEntity } from './rest-api/models/station-id.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
        synchronize: true,
        keepConnectionAlive: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        logging: false
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      ComplaintEntity,
      FuelPriceEntity,
      OpeningTimesEntity,
      OpeningTimesOverrideEntity,
      StationEntity,
      StationIdEntity
    ])
  ],
  controllers: [
    AppController,
    ComplaintController,
    PriceController,
    SeedDataController,
    StationDetailController
  ],
  providers: [
    ComplaintService,
    PriceService,
    SeedDataService,
    StationDetailService
  ]
})
export class AppModule {}
