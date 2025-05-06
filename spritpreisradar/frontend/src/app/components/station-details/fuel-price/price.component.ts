import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Darstellung eines Preises mit hochgestellter 9 am Ende
 */
@Component({
  standalone: true,
  selector: 'spr-price',
  imports: [CurrencyPipe],
  // fixme: Leider currency / formatNumber Pipe macht eine Rundung, daher muss man händisch die letzte Zahl entfernen
  // `currency: 'EUR' : ''` bedeutet:
  // Währung "Euro" benutzen, aber Währungssymbol nicht darstellen, siehe https://angular.dev/api/common/CurrencyPipe
  template: `
    <span
      >{{ price.toString().slice(0, -1) | currency: 'EUR' : ''
      }}<sup>{{ price.toString().slice(4) }}</sup> {{ currency }}</span
    >
  `
})
export class PriceComponent {
  @Input() price!: number;
  @Input() currency!: string;
}
