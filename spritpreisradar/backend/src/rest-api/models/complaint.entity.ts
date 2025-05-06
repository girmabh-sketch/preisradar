import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { StationEntity } from './station.entity';

@Entity('complaint')
export class ComplaintEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  fromDate: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  version: number;

  @Column({ type: 'varchar', nullable: false })
  complaintType: string;

  @Column()
  message: string;

  @Column({ type: 'varchar', nullable: false })
  stationId: string;

  @ManyToOne(() => StationEntity, (station) => station.complaints)
  @JoinColumn({
    name: 'stationId',
    referencedColumnName: 'stationId'
  })
  public station: StationEntity;
}
