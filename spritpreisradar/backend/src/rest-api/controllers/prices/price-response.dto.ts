import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PriceResponseDto {
  @Expose()
  @ApiProperty()
  public stationId: string;

  @Expose()
  @ApiProperty()
  public brand: string;

  @Expose({ name: 'streetName' })
  @ApiProperty()
  public street: string;

  @Expose({ name: 'streetNumber' })
  @ApiProperty()
  public streetn: string;

  @Expose()
  @ApiProperty()
  public houseNumber: string;

  @Expose()
  @ApiProperty()
  public postCode: string;

  @Expose()
  @ApiProperty()
  public place: string;

  @Expose()
  @ApiProperty()
  public fuelType: string;

  @Expose()
  @ApiProperty()
  public price: number;

  @Expose()
  @ApiProperty({ type: 'timestamp' })
  public validFrom: Date;
}
