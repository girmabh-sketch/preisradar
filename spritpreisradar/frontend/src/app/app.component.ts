import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'spr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    console.log('APP RUNNING IN PRODUCTION? ', environment.production);
    console.log('API_URL', environment.API_URL);
  }
}
