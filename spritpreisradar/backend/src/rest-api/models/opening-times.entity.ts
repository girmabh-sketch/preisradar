import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { StationEntity } from './station.entity';

@Entity('openingtimes')
@Index('IX_OPENINGTIMES_1', ['stationId'])
@Index('IX_OPENINGTIMES_2', ['stationId', 'day', 'startTime', 'endTime'], {
  unique: true
})
export class OpeningTimesEntity {
  // Workaround for:
  // fixme: JoinColumn geht direkt zu station.id, statt station.stationId
  // @ManyToOne(() => StationEntity, (station) => station.stationId)
  // @JoinColumn({ name: 'stationId' })
  @Column({ type: 'varchar', nullable: false })
  public stationId: StationEntity;

  @ApiPropertyOptional()
  @Column()
  day: number;

  @ApiPropertyOptional()
  @Column()
  startTime: string;

  @ApiPropertyOptional()
  @Column()
  endTime: string;

  // fixme: Workaround for:
  //      MissingPrimaryColumnError: Entity "OpeningTimesEntity" does not have a primary column.
  //      Primary column is required to have in all your entities.
  //      Use @PrimaryColumn decorator to add a primary column to your entity.
  @PrimaryGeneratedColumn()
  public id: never;

  @ManyToOne(() => StationEntity, (station) => station.openingTimes)
  @JoinColumn({
    name: 'stationId',
    referencedColumnName: 'stationId'
  })
  public station: StationEntity;
}
