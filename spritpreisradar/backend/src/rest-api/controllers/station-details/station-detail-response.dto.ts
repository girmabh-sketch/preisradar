import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OpeningTimesDto } from './opening-times.dto';

export class StationDetailResponseDto {
  @ApiProperty()
  public stationId: string;

  @ApiProperty()
  public brand: string;

  @Expose()
  @ApiProperty()
  public address: {
    streetName: string;
    StreetNumber: string;
    houseNumber: string;
    postCode: string;
    place: string;
    latitude: number;
    longitude: number;
  };

  @Expose()
  @ApiProperty()
  public prices: Array<{ name: string; price: number }>;

  @Expose()
  public openingTimes: OpeningTimesDto[];

  /*  @Expose()
    // @ApiProperty({ type: [OpeningTimesEntity] })
    openingTimes: OpeningTimesEntity[];*/
}
