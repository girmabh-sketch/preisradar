import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuelPrice',
  standalone: true
})
export class FuelPricePipe implements PipeTransform {
  transform(price: number, currency?: string): string {
    return `<span>${formatNumber(price, 'de-DE', '1.2-2')}<sup>${price.toString().slice(4)}</sup> ${currency}</span>`;
  }
}
