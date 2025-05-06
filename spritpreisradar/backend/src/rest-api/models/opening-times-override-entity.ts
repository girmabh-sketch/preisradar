import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { StationEntity } from './station.entity';

@Entity('openingtimesoverride')
@Index('IX_OPENINGTIMES_OVERRIDE_1', ['stationId'])
export class OpeningTimesOverrideEntity {
  // fixme: JoinColumn geht direkt zu station.id, statt station.stationId
  // @ManyToOne(() => StationEntity, (station) => station.stationId)
  // @JoinColumn({ name: 'stationId' })
  @Column({ type: 'varchar', nullable: false })
  public stationId: StationEntity;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  override_type: string;

  @ApiProperty()
  @Column('timestamp', { nullable: false })
  startOfPeriod: Date;

  @ApiProperty()
  @Column('timestamp', { nullable: false })
  endOfPeriod: Date;

  // fixme: Workaround for:
  //      MissingPrimaryColumnError: Entity "OpeningTimesEntity" does not have a primary column.
  //      Primary column is required to have in all your entities.
  //      Use @PrimaryColumn decorator to add a primary column to your entity.
  @PrimaryGeneratedColumn()
  public id: never;
}
