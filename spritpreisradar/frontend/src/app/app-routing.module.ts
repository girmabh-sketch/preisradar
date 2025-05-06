import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceListComponent } from './components/prices-list/price-list.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { StationDetailsResolver } from './services/station-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/preise',
    pathMatch: 'full'
  },
  {
    path: 'preise',
    component: PriceListComponent
  },
  {
    path: 'station-details/:id',
    component: StationDetailsComponent,
    resolve: {
      routeStationDetails: StationDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
