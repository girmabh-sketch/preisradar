import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PriceFilterDto } from './price-filter.dto';
import { PriceResponseDto } from './price-response.dto';
import { PriceService } from './price.service';

@ApiTags('prices')
@Controller('prices')
export class PriceController {
  constructor(private readonly pricesService: PriceService) {}

  @Get()
  @ApiOkResponse({
    description: 'Preise erfolgreich abgerufen.',
    type: PriceResponseDto
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(@Query() filterCriteria: PriceFilterDto): Promise<PriceResponseDto[]> {
    // Filterkriterien: PLZ und / oder Ort muss eingegeben werden, spritSorte aber nicht.
    return await this.pricesService.getAll(filterCriteria);
  }
}
