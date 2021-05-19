import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import * as L from 'leaflet';

import { CountryOrdersMapService } from './country-orders-map.service';
import { NbThemeService } from '@nebular/theme';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-country-orders-map',
  styleUrls: ['./country-orders-map.component.scss'],
  template: `
    <nb-card size="medium" [nbSpinner]="imgloading" nbSpinnerStatus="info" nbSpinnerSize="large">
    <div leaflet [leafletOptions]="options" [leafletLayers]="layers" (leafletMapReady)="mapReady($event)"></div>
    </nb-card>
  `,
})
export class CountryOrdersMapComponent implements OnDestroy {

  @Input() stateId: string;

  @Output() select: EventEmitter<any> = new EventEmitter();

  layers = [];
  currentTheme: any;
  alive = true;
  selectedCountry;
  imgloading = false;

  options = {
    // zoom: 2,
    // minZoom: 2,
    // maxZoom: 6,
    // zoomControl: false,
    // center: L.latLng({lat: 38.991709, lng: -76.886109}),
    // maxBounds: new L.LatLngBounds(
    //   new L.LatLng(-89.98155760646617, -180),
    //   new L.LatLng(89.99346179538875, 180),
    // ),
    // maxBoundsViscosity: 1.0,
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
    ],
    zoom: 6,
    zoomControl: false,
    center: L.latLng(19.076090, 72.877426)
  };

  constructor(private ecMapService: CountryOrdersMapService,
              private theme: NbThemeService) {
    
    this.imgloading = true;
    combineLatest([
      this.ecMapService.getCords(),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([cords, config]: [any, any]) => {
        this.currentTheme = config.variables.countryOrders;
        this.layers = [this.createGeoJsonLayer(cords)];
        this.selectFeature(this.findFeatureLayerBystateId(this.stateId));
        this.imgloading = false;
      });
  }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomright'}));

    // fix the map fully displaying, existing leaflet bag
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  private createGeoJsonLayer(cords) {
    return L.geoJSON(
      cords as any,
      {
        style: () => ({
          // weight: this.currentTheme.countryBorderWidth,
          // fillColor: this.currentTheme.countryFillColor,
          // fillOpacity: 10,
          color: this.currentTheme.countryBorderColor,
          opacity: 10,
        }),
        onEachFeature: (f, l) => {
          this.onEachFeature(f, l);
        },
      });
  }

  private onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => this.highlightFeature(e.target),
      mouseout: (e) => this.moveout(e.target),
      click: (e) => this.selectFeature(e.target),
    });
  }

  private highlightFeature(featureLayer) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: this.currentTheme.hoveredCountryBorderWidth,
        fillColor: this.currentTheme.hoveredCountryFillColor,
        color: this.currentTheme.hoveredCountryBorderColor,
      });

      if (!L.Browser.ie && !L.Browser.opera12 && !L.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
  }

  private moveout(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(featureLayer);

      // When countries have common border we should highlight selected country once again
      this.highlightFeature(this.selectedCountry);
    }
  }

  private resetHighlight(featureLayer) {
    if (featureLayer) {
      const geoJsonLayer = this.layers[0];

      geoJsonLayer.resetStyle(featureLayer);
    }
  }

  private selectFeature(featureLayer) {
    // console.log("featureLayer",featureLayer.feature)
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(this.selectedCountry);
      this.highlightFeature(featureLayer);
      this.selectedCountry = featureLayer;
      this.select.emit(featureLayer.feature.properties.st_nm);
    }
  }

  private findFeatureLayerBystateId(id) {
    // console.log("id",id)
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
      return item.feature.properties.st_nm === id;
    });

    return featureLayer ? featureLayer : null;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
