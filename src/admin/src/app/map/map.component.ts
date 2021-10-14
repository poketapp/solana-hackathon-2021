import { Component, Input, SimpleChange } from '@angular/core';
import { AgmInfoWindow } from '@agm/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;

  imgSrc = '';
  marker = {};

  lat = 43.643435764188844;
  lng = -79.38688513862124;
  zoom = 15;

  @Input() markers;

  constructor(private mapService: MapService) {
    this.currentIW = null;
    this.previousIW = null;
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const _markers: SimpleChange = changes['markers'];
    const currentValueOfMarkers = _markers['currentValue'];
    if (currentValueOfMarkers != undefined) {
      this.markers = currentValueOfMarkers;
      this.initMap();
    }
  }

  initMap(): void {
    if (this.markers.length > 0) {
      this.lat = this.markers[0].latitude;
      this.lng = this.markers[0].longitude;
    }
  }

  markerClicked(marker, infoWindow): void {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
    this.imgSrc = 'assets/loading.png';
    this.marker = marker;
  }

  mapStyles = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];
}
