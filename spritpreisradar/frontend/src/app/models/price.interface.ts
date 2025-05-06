import { StationId } from './station-id.type';

export interface IPrice {
  stationId: StationId;
  brand: string;
  price: number;
  streetName: string;
  streetNumber?: string;
  postalCode: string;
  city: string;
  validFrom: Date;
  _id?: number;
}
