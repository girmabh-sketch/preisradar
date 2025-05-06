import { Injectable, Injector } from '@angular/core';
import { AbstractApiResolver } from '@pascada/marlene';
import { IStationDetails } from '../models/station-details.interface';
import { StationDetailsService } from './station-details.service';

@Injectable()
export class StationDetailsResolver extends AbstractApiResolver<IStationDetails> {
  routeBase = 'preise';
  keysFromRoute = 'id';

  constructor(service: StationDetailsService, injector: Injector) {
    super(service, injector);
  }
}
