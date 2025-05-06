import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComplaintEntity } from '../models/complaint.entity';
import { StationIdEntity } from '../models/station-id.entity';
import { FuelPriceEntity } from '../models/fuel-price.entity';
import { OpeningTimesEntity } from '../models/opening-times.entity';
import { OpeningTimesOverrideEntity } from '../models/opening-times-override-entity';
import { StationEntity } from '../models/station.entity';

export class SeedDataService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(ComplaintEntity)
    private complaintRepository: Repository<ComplaintEntity>,
    @InjectRepository(StationIdEntity)
    private stationIdRepository: Repository<StationIdEntity>,
    @InjectRepository(FuelPriceEntity)
    private fuelPriceRepository: Repository<FuelPriceEntity>,
    @InjectRepository(OpeningTimesEntity)
    private openingTimesRepository: Repository<OpeningTimesEntity>,
    @InjectRepository(OpeningTimesOverrideEntity)
    private openingTimesOverrideRepository: Repository<OpeningTimesOverrideEntity>,
    @InjectRepository(StationEntity)
    private stationRepository: Repository<StationEntity>
  ) {}

  async checkDb() {
    // To check if seed data is already done, will be modified later with appropriate solution
    return await this.stationIdRepository.find();
  }

  // FIXME jsonData typisieren
  async seedData(jsonData: any) {
    await this.stationRepository.save(jsonData.station);
    await this.stationIdRepository.save(jsonData.stationId);
    await this.complaintRepository.save(jsonData.complaint);
    await this.fuelPriceRepository.save(jsonData.fuelPrice);
    await this.openingTimesRepository.save(jsonData.openingTimes);
    await this.openingTimesOverrideRepository.save(
      jsonData.openingTimesOverride
    );
  }
}
