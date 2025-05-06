import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PriceFilterDto {
  @Expose()
  @ApiPropertyOptional()
  public plzOderOrt: string;

  @Expose()
  @ApiPropertyOptional()
  public spritSorte: string;
}
