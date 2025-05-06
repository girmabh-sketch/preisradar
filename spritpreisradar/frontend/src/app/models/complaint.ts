import { IComplaint } from './complaint.interface';

export { IComplaint };

export class Complaint implements IComplaint {
  id?: number;
  version: number = 0;
  stationId: string = '';
  complaintType: string = '0';
  message: string = '';
  fromDate: Date = new Date();
}
