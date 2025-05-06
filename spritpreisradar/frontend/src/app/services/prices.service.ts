import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from '@pascada/marlene';
import { environment } from '../../environments/environment';
import { IPrice } from '../models/price';

export { IPrice };

@Injectable({
  providedIn: 'root'
})
export class PriceService extends AbstractApiService<IPrice> {
  urlBase = `${environment.API_URL}/prices`;

  constructor(http: HttpClient) {
    super(http);
  }
}
