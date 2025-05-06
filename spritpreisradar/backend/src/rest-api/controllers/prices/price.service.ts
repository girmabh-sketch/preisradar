import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { StationEntity } from '../../models/station.entity';
import { PriceFilterDto } from './price-filter.dto';
import { PriceResponseDto } from './price-response.dto';

export class PriceService {
  constructor(
    @InjectRepository(StationEntity)
    protected readonly repository: Repository<StationEntity>
  ) {}

  async getAll(priceFilter: PriceFilterDto) {
    const conditions: FindOptionsWhere<StationEntity> = this.getConditions(priceFilter);

    try {
      const res = await this.repository.find({
        relations: { prices: true },
        where: [
          {
            ...(conditions.postCode && { postCode: conditions.postCode }),
            ...(conditions.placen && { placen: ILike(`%${conditions.placen}%`) })
          }
        ] as FindOptionsWhere<StationEntity>
      });
      if (priceFilter.spritSorte) {
        return this.getFilteredPrices(res, priceFilter.spritSorte);
      }
      return this.getAllPrices(res);
    } catch {
      throw new BadRequestException();
    }
  }

  getConditions(priceFilter: PriceFilterDto): { postCode: string; placen: string } {
    const conditions = { postCode: '', placen: '' };

    if (priceFilter.plzOderOrt) {
      const result: string[] = priceFilter.plzOderOrt.trim().split(' ');

      conditions.postCode = (/^\d+$/.test(result[0]) && result[0]) || (/^\d+$/.test(result[1]) && result[1]);
      conditions.placen = (/^[a-zA-Z]+$/.test(result[0]) && result[0]) || (/^[a-zA-Z]+$/.test(result[1]) && result[1]);
    }

    return conditions;
  }

  getFilteredPrices(res: StationEntity[], fuelType: string): PriceResponseDto[] {
    return res.map((item) => {
      return {
        stationId: item.stationId,
        brand: item.brand,
        street: item.street,
        streetn: item.streetn,
        houseNumber: item.houseNumber,
        postCode: item.postCode,
        place: item.place,
        fuelType: fuelType,
        price: item.prices[fuelType],
        validFrom: item.validFrom
      };
    });
  }

  getAllPrices(res: StationEntity[]): PriceResponseDto[] {
    const fuelTypes = ['e5', 'e10', 'diesel'];
    let allPrices: PriceResponseDto[] = [];

    for (const fuelType of fuelTypes) {
      const prices = this.getFilteredPrices(res, fuelType);
      allPrices = allPrices.concat(prices);
    }
    return allPrices;
  }
}
