import { IAddress } from './address.interface';
import { IFuel } from './fuel.interface';
import { IOpeningTime } from './opening-time.interface';
import { StationId } from './station-id.type';

export interface IStationDetails {
  _id?: string;
  stationId: StationId;
  brand: string;
  address: IAddress;
  prices: IFuel[];
  validFrom: Date;
  openingTimes: IOpeningTime[];
}
