import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IPrice } from '../../models/price.interface';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/station-details/{{ stationInfo.stationId }}">
      <span>{{ stationInfo.streetName }} {{ stationInfo.streetNumber }}</span
      ><br />
      <span>{{ stationInfo.postalCode }} {{ stationInfo.city }}</span>
    </a>
  `
})
export class StationLinkComponent {
  @Input() stationInfo!: IPrice;
}
