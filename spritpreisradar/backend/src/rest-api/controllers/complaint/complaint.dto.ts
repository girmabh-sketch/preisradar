import { ApiProperty } from '@nestjs/swagger';

export class ComplaintDto {
  @ApiProperty()
  public stationId: string;

  @ApiProperty()
  public version: number;

  @ApiProperty()
  complaintType: string;

  @ApiProperty()
  message: string;
}
