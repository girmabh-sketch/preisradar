import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StationEntity } from '../../models/station.entity';

export class StationDetailService {
  constructor(
    @InjectRepository(StationEntity)
    protected readonly repository: Repository<StationEntity>
  ) {}

  async getById(id: string): Promise<StationEntity> {
    let station: StationEntity;
    try {
      station = await this.repository.findOne({
        where: { stationId: id } as FindOptionsWhere<StationEntity>,
        relations: {
          prices: true
          // openingTimes stehen auf eager:true, müssen daher nicht explizit angegeben werden
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!station) {
      throw new NotFoundException(`Tankstelle mit ID ${id} nicht gefunden`);
    }

    return station;
  }
}
