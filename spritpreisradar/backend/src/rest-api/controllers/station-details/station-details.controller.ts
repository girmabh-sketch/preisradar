import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StationDetailService } from './station-details.service';
import { StationDetailResponseDto } from './station-detail-response.dto';

@ApiTags('station-details')
@Controller('station-details')
export class StationDetailController {
  constructor(private readonly stationDetailService: StationDetailService) {}

  @ApiOkResponse({
    description: 'Tankstellendetails erfolgreich bezogen',
    type: StationDetailResponseDto
  })
  @ApiBadRequestResponse({ description: 'Datenbankfehler' })
  @ApiNotFoundResponse({ description: 'Tankstelle mit der gegebenen ID existiert nicht' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<StationDetailResponseDto> {
    const res = await this.stationDetailService.getById(id);

    return {
      stationId: res.stationId,
      brand: res.brand,
      address: {
        streetName: res.street,
        StreetNumber: res.streetn,
        houseNumber: res.houseNumber,
        postCode: res.postCode,
        place: res.place,
        latitude: res.latitude,
        longitude: res.longitude
      },
      prices: [
        { name: 'e5', price: res.prices.e5 },
        { name: 'e10', price: res.prices.e10 },
        { name: 'diesel', price: res.prices.diesel }
      ],
      openingTimes: res.openingTimes
    };
  }
}
