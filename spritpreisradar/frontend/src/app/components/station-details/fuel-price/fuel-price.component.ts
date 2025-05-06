import { Component, Input } from '@angular/core';

export interface PriceInput {
  diesel: number;
  e5: number;
  e10: number;
  validFrom: Date;
}

@Component({
  selector: 'spr-fuel-price',
  templateUrl: './fuel-price.component.html'
})
export class FuelPriceComponent {
  @Input()
  prices!: PriceInput;
}
