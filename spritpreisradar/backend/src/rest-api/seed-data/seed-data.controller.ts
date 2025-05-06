import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { SeedDataConfig } from '../../config/configuration';
import { SeedDataService } from './seed-data.service';

@ApiTags('seed-data')
@Controller('seed-data')
export class SeedDataController {
  constructor(
    private readonly configService: ConfigService,
    private readonly seedDataService: SeedDataService
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Data Seed Successfully done.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async seedData() {
    const config = this.configService.get<SeedDataConfig>('seeddata');
    console.log('=========== Seed Data Creation=========');

    // check if seed is already executed
    const dataExistInDb = await this.seedDataService.checkDb();
    if (dataExistInDb.length) {
      throw new BadRequestException('Database is not empty.');
    }

    // Read the Yaml file and convert to json
    const jsonDataStr = await readFile(config.filename, 'utf8');
    const jsonData = yaml.load(jsonDataStr);
    if (!jsonData) {
      throw new BadRequestException(
        'Seed file ' + config.filename + ' is empty.'
      );
    }

    try {
      // Seed data to database
      await this.seedDataService.seedData(jsonData);
      console.log(
        ' ---------- Seed Data Created Successfully! ---------------'
      );
      return jsonData;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
