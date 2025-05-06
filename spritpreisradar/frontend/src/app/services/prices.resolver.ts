import { Injectable, Injector } from '@angular/core';

import { AbstractApiResolver } from '@pascada/marlene';
import { IPrice } from '../models/price.interface';
import { PriceService } from './prices.service';

@Injectable()
export class PriceResolver extends AbstractApiResolver<IPrice> {
  routeBase = 'Price';

  constructor(service: PriceService, injector: Injector) {
    super(service, injector);
  }

  protected override get keysFromRoute(): string | string[] {
    return ['id'];
  }
}
