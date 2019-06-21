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
    // let testA: ILocation;
    // testA = {
    // lon : 19.13991,
    // lat :  47.49801
    // }
    // let testB : ILocation;
    // testB = {
    //   lat : 47.448011,
    //   lon : 19.16991
    //   }

    // this.locations.push(testB);
    // this.locations.push(testA);
    this.experts.forEach(expert => {
      let location: ILocation;
      location = {
        lat: expert.location.lat,
        lon: expert.location.lon
      };
      this.locations.push(location);
    });
    this.locations.forEach((loc) => this.createMarkerExpert(loc));
    this.initializeMap();
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
    text: 'EZ EGY TALALAT',
    offsetY: -10,
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

    this.view = new OlView({
            center: fromLonLat([19.03991, 47.49801]),
            zoom: 12
        });

    this.map = new OlMap({
            target: 'map',
            // Added both layers
            layers: [this.tileLayer, this.vectorLayer],
            view: this.view
        });

  }

}
