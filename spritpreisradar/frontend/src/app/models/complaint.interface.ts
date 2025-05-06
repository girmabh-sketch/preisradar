export interface IComplaint {
  stationId: string;
  id?: number;
  version: number;
  complaintType: string;
  message: string;
  fromDate: Date;
}
