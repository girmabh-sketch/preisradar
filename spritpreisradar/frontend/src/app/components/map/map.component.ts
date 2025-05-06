import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PasMarleneModule } from '@pascada/marlene';
import {
  ContentComponent,
  ControlComponent,
  CoordinateComponent,
  DefaultInteractionComponent,
  FeatureComponent,
  GeometryPointComponent,
  LayerTileComponent,
  LayerVectorComponent,
  MapComponent as OlMapComponent,
  SourceOsmComponent,
  SourceVectorComponent,
  StyleCircleComponent,
  StyleComponent,
  StyleFillComponent,
  StyleIconComponent,
  StyleStrokeComponent,
  ViewComponent
} from 'ng-openlayers';
import { IAddress } from '../../models/address.interface';
import { marker } from './marker.image';

/**
 * Nach Recherche lässt sich Open Street Map nur mithilfe folgender Pakete in Angular einbinden:
 * - ol            OpenLayers
 * - ng-openlayers OpenLayers library for Angular
 */
@Component({
  selector: 'spr-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [
    PasMarleneModule,
    LayerTileComponent,
    ViewComponent,
    CoordinateComponent,
    SourceOsmComponent,
    DefaultInteractionComponent,
    OlMapComponent,
    LayerVectorComponent,
    SourceVectorComponent,
    GeometryPointComponent,
    FeatureComponent,
    StyleComponent,
    StyleCircleComponent,
    StyleFillComponent,
    StyleStrokeComponent,
    StyleIconComponent,
    ControlComponent,
    ContentComponent,
    NgIf
  ]
})
export class MapComponent {
  @Input()
  adresse!: IAddress;

  @Input()
  showControlsZoom = true;

  @Input()
  titleZoomIn = 'Zoom in';

  @Input()
  titleZoomOut = 'Zoom out';

  @Input()
  opacity = 1;

  @Input()
  zoom = 17;

  markerImage = marker;

  increaseZoom(): void {
    this.zoom++;
  }

  decreaseZoom(): void {
    this.zoom--;
  }
}
