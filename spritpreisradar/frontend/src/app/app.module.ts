import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NAVBAR_FOOTER_CONFIG, PasMarleneModule, TimeFromNowPipe } from '@pascada/marlene';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { MapComponent } from './components/map/map.component';
import { PriceListComponent } from './components/prices-list/price-list.component';
import { FuelPriceComponent } from './components/station-details/fuel-price/fuel-price.component';
import { PriceComponent } from './components/station-details/fuel-price/price.component';
import { OpeningTimesComponent } from './components/station-details/opening-times/opening-times.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { PriceResolver } from './services/prices.resolver';
import { StationDetailsResolver } from './services/station-details.resolver';
import { FuelPricePipe } from './transformers/FuelPricePipe';

@NgModule({
  declarations: [
    AppComponent,
    ComplaintComponent,
    FuelPriceComponent,
    OpeningTimesComponent,
    PriceListComponent,
    StationDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
    PasMarleneModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    FuelPricePipe,
    MapComponent,
    PriceComponent
  ],
  providers: [
    PriceResolver,
    StationDetailsResolver,
    TimeFromNowPipe,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: NAVBAR_FOOTER_CONFIG,
      useValue: {
        agbRoute: false,
        alignRight: true,
        logoSrc: 'assets/images/pascada-logo.png'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
