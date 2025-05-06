import { Component, OnInit } from '@angular/core';
import {
  BusyComponent,
  ListFieldConfig,
  ListFieldConfigService
} from '@pascada/marlene';
import { IPrice, Price } from '../../models/price';
import { PriceService } from '../../services/prices.service';

@Component({
  templateUrl: './price-list.component.html'
})
export class PriceListComponent extends BusyComponent implements OnInit {
  config: ListFieldConfig[];
  results: IPrice[] = [];

  constructor(
    private apiService: PriceService,
    private configService: ListFieldConfigService
  ) {
    super();
    this.config = this.configService.getListConfig(Price);
  }

  ngOnInit(): void {
    this.busy$(this.apiService.getAll()).subscribe({
      next: (res) => (this.results = res),
      error: this.errorF()
    });
  }
}
