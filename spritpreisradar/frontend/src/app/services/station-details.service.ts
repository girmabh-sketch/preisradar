import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from '@pascada/marlene';
import { environment } from '../../environments/environment';
import { IStationDetails } from '../models/station-details.interface';

@Injectable({
  providedIn: 'root'
})
export class StationDetailsService extends AbstractApiService<IStationDetails> {
  urlBase = `${environment.API_URL}/station-details`;

  constructor(http: HttpClient) {
    super(http);
  }
}
