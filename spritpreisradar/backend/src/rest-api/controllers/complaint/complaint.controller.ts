import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { ComplaintService } from './complaint.service';
import { ComplaintDto } from './complaint.dto';

@ApiTags('complaint')
@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Beschwerdedaten erfolgreich erstellt',
    type: ComplaintDto
  })
  @ApiNotFoundResponse({ description: 'Unbekannte Tankstellen-ID' })
  @ApiBadRequestResponse({ description: 'Fehlende oder fehlerhafte Eingangsdaten' })
  async create(@Body() entity: ComplaintDto): Promise<ComplaintDto> {
    return this.complaintService.create(entity);
  }
}
