import {
  Column,
  Entity,
  Index,
  OneToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';

import { FuelPriceEntity } from './fuel-price.entity';
import { OpeningTimesEntity } from './opening-times.entity';
import { ComplaintEntity } from './complaint.entity';

@Entity('station')
@Index('IX_STATION_1', ['stationId', 'validUntil'])
// @Index('IX_STATION_2', ["stationId", "UPPER(Brand)", "validUntil", "validFrom"])
@Index('IX_STATION_2', ['stationId', 'brand', 'validUntil', 'validFrom'])
@Index('IX_STATION_3', ['stationId', 'placen', 'validUntil', 'validFrom'])
@Index('IX_STATION_4', ['stationId', 'postCode', 'validUntil', 'validFrom'])
@Index('IX_STATION_5', ['latitude', 'longitude', 'validUntil'])
@Index('IX_STATION_6', ['postCode'])
@Index('IX_STATION_7', ['placen'])
export class StationEntity {
  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  street: string;

  @Column()
  streetn: string;

  @Column()
  houseNumber: string;

  @Column()
  postCode: string;

  @Column()
  place: string;

  @Column()
  placen: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  version: number;

  @Column('timestamp')
  validFrom: Date;

  @Column('timestamp')
  validUntil: Date;

  @Column('timestamp')
  lastDate: Date;

  @Column()
  importFile: string;

  // fixme: Workaround for
  //      MissingPrimaryColumnError: Entity "OpeningTimesEntity" does not have a primary column.
  //      Primary column is required to have in all your entities.
  //      Use @PrimaryColumn decorator to add a primary column to your entity.
  @PrimaryColumn('varchar')
  stationId: string;

  @OneToOne(() => FuelPriceEntity, (price) => price.stationId)
  public prices: FuelPriceEntity;

  @OneToMany(() => OpeningTimesEntity, (openingTimes) => openingTimes.station, {
    eager: true
  })
  public openingTimes: OpeningTimesEntity[];

  @OneToMany(() => ComplaintEntity, (complaint) => complaint.station, {
    eager: true
  })
  public complaints: ComplaintEntity[];
}
