import {
  ComponentConfigConstants,
  ListConfig,
  TimeFromNowPipe
} from '@pascada/marlene';
import { PriceComponent } from '../components/station-details/fuel-price/price.component';
import { StationLinkComponent } from '../components/station/station-link.component';
import { IPrice } from './price.interface';
import { StationId } from './station-id.type';

export { IPrice };

export class Price implements IPrice {
  _id?: number;
  @ListConfig({
    label: 'Marke'
  })
  brand: string = '';

  streetName: string = '';
  streetNumber?: string;
  city: string = '';
  postalCode: string = '';

  @ListConfig({
    label: 'Adresse',
    component: [
      StationLinkComponent,
      { stationInfo: ComponentConfigConstants.ITEM }
    ]
  })
  address: string = '';

  @ListConfig({
    label: 'Preis (€) von MTS-K',
    component: [PriceComponent, { price: ComponentConfigConstants.VALUE }]
  })
  price: number = 0.0;

  @ListConfig({
    label: 'Gemeldet vor',
    pipe: { pipe: TimeFromNowPipe }
  })
  validFrom: Date = new Date();

  // @ListConfig({
  //   label: 'Station'
  // })
  stationId: StationId = '';

  constructor() {}
}
