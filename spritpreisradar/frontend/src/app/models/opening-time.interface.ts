import { StationId } from './station-id.type';

export interface IOpeningTime {
  stationId: StationId;
  day: number;
  startTime: string;
  endTime: string;
}
