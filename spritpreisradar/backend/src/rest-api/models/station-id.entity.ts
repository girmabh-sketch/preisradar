import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('stationid')
@Index('IX_STATIONID_1', ['stationId', 'id'])
export class StationIdEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  stationId: string;

  @CreateDateColumn()
  firstDate: Date;
}
