import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { StationEntity } from './station.entity';

@Entity('fuelprice')
@Index('IX_FUELPRICE_1', ['stationId', 'validUntil'])
@Index('IX_FUELPRICE_2', ['validUntil', 'validFrom'])
// @Index("IX_FUELPRICE_3", ["date_trunc('day', validFrom)", "date_trunc('day', validUntil)"]) // fixme Index "IX_FUELPRICE_3" contains column that is missing in the entity (FuelPriceEntity): date_trunc('day', validFrom)
@Index('IX_FUELPRICE_4', ['stationId', 'e5', 'e10', 'diesel'])
// @Index("IX_FUELPRICE_5", ["date_trunc('day', lastDate)", "validUntil"]) // TypeORMError: Index "IX_FUELPRICE_5" contains column that is missing in the entity (FuelPriceEntity): date_trunc('day', lastDate)
export class FuelPriceEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // fixme: JoinColumn geht direkt zu station.id, statt station.stationId
  @OneToOne(() => StationEntity, (station) => station.stationId, {
    eager: true
  })
  @JoinColumn({ name: 'stationId', referencedColumnName: 'stationId' })
  // @Column({ type: 'varchar', nullable: false})
  public stationId: StationEntity;

  @ApiPropertyOptional()
  @Column('decimal')
  e5: number;

  @ApiPropertyOptional()
  @Column('decimal')
  e10: number;

  @ApiPropertyOptional()
  @Column('decimal')
  diesel: number;

  @Column({ type: 'timestamp' })
  validFrom: Date;

  @Column({ type: 'timestamp' })
  validUntil: Date;

  @Column({ type: 'timestamp' })
  firstDate: Date;

  @Column({ type: 'timestamp' })
  lastDate: Date;

  @ApiProperty()
  @Column()
  importFile: string;
}
