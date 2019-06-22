import { Component, OnInit, Input } from '@angular/core';
import OlMap from 'ol/Map';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlXyzSource from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';

import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import {  ILocation } from '../../ilocation';
import { Expert } from 'src/app/api';
import { GeolocationService } from '../services/geolocation.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input()
  experts: Expert[];

  map: OlMap;
  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  xyzSource: OlXyzSource;
  tileLayer: OlTileLayer;
  view: OlView;
  markers = new Array<OlFeature>();
  locations: ILocation[] = [];

  constructor() { }

  ngOnInit() {

    this.fillLocations();
    this.locations.forEach((loc) => this.createMarkerExpert(loc));
    this.initializeMap();

  }

  // ngOnChanges() {
  //   if (this.map !== undefined) {
  //     this.fillLocations();
  //     this.locations.forEach((loc) => this.createMarkerExpert(loc));
      
  //     this.vectorSource.refresh();
  //     this.vectorLayer.getSource().refresh();
  //     this.tileLayer.getSource().refresh();
  //     this.map.changed();
  //   }
  // }


  fillLocations() {
    this.experts.forEach(expert => {
      let location: ILocation;
      location = {
        lat: expert.location.lat,
        lon: expert.location.lon,
        profession: expert.profession,
        name: expert.name
      };
      this.locations.push(location);
    });

  }


  createMarkerExpert(location: ILocation) {
    const marker = new OlFeature({
      geometry: new OlPoint(fromLonLat([location.lon, location.lat]))
    });
    marker.setStyle(new Style({
      image: new Icon(({
        color: '#A52A2A',
        crossOrigin: 'anonymous',
        src: 'assets/image/vectorpoint.svg',
        imgSize: [40, 40]
      })),
  text: new Text({
    text: location.name + ': ' + location.profession.join(','),
    offsetY: -20,
    fill: new Fill({
        color: '#A52A2A'
    })
})
    }));
    this.markers.push(marker);
  }

  initializeMap() {
    this.vectorSource = new OlVectorSource({
            features: this.markers
        });

    this.vectorLayer = new OlVectorLayer({
            source: this.vectorSource
        });

        /* XYZ */

    this.xyzSource = new OlXyzSource({
            url: 'http://tile.osm.org/{z}/{x}/{y}.png'
        });

    this.tileLayer = new OlTileLayer({
            source: this.xyzSource
        });

        /* View and map */
    if (localStorage.getItem('locationLat') == null || localStorage.getItem('locationLon') == null ) {
      this.view = new OlView({
            center: fromLonLat([19.03991, 47.49801]),
            zoom: 15
        });
      } else {
        this.view = new OlView({
          center: fromLonLat([+localStorage.getItem('locationLon'), +localStorage.getItem('locationLat')]),
          zoom: 15
      });
      }
    this.map = new OlMap({
            target: 'map',
            // Added both layers
            layers: [this.tileLayer, this.vectorLayer],
            view: this.view
        });

  }


}
