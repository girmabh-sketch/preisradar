import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from '@pascada/marlene';
import { environment } from '../../environments/environment';
import { IComplaint } from '../models/complaint';

export { IComplaint };

@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends AbstractApiService<IComplaint> {
  urlBase = `${environment.API_URL}/complaint`;

  constructor(http: HttpClient) {
    super(http);
  }
}
