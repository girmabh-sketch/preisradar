import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { IStationDetails } from '../../models/station-details.interface';
import { MapComponent } from '../map/map.component';
import { PriceInput } from './fuel-price/fuel-price.component';

@Component({
  templateUrl: './station-details.component.html'
})
export class StationDetailsComponent implements OnInit {
  stationDetails!: IStationDetails;
  prices!: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data['routeStationDetails']), // routeStationDetails definiert in app-routing.module.ts
        tap((station: IStationDetails) => {
          this.stationDetails = station;
          this.prices = StationDetailsComponent.extractPrices(station);
        })
      )
      .subscribe();
  }

  private static extractPrices(station: IStationDetails): PriceInput {
    const priceKeyValue: PriceInput = {
      diesel: 0,
      e5: 0,
      e10: 0,
      validFrom: station.validFrom
    };
    station.prices.forEach((price) => (priceKeyValue[price.name] = price.price));
    return priceKeyValue;
  }

  /*
  TODO Ist noch festzulegen, was passieren soll
  openInMaps(address: any) { FIXME Typ any durch den konkreten Typ ersetzen
    console.log(address);
    // $.ui.dialog({
    //   body: address.name,
    //   title: address.neighbourhood,
    //   show: true
    // });
  }
  */
}
