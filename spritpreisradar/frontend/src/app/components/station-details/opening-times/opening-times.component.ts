import { Component, Input } from '@angular/core';
import { IOpeningTime } from '../../../models/opening-time.interface';

@Component({
  selector: 'spr-opening-times',
  templateUrl: './opening-times.component.html'
})
export class OpeningTimesComponent {
  @Input()
  openingTimes: IOpeningTime[] = [];

  currentWeekDayMobilithek: number = 0;
  constructor() {
    const jsDay = new Date().getDay(); // 0 represents Sunday
    this.currentWeekDayMobilithek = jsDay === 0 ? 6 : jsDay - 1; // In Mobilithek ist 0 Montag, 6 Sonntag
  }
}
