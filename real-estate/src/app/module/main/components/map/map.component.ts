import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useForkRef } from '@material-ui/core';
import * as GeoJSON from 'geojson';
import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import { RealEstateData, RealEstateDTO } from 'src/app/model/real-estate.model';
import { MapService } from 'src/app/services/map.service';
import { RealEstateService } from 'src/app/services/real-estate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 44.44929;
  lng = 18.64978;
  zoom = 12;
  images: string[] = [];
  marker = new mapboxgl.Marker();
  addBtn: Array<any> = [];
  estateForm: FormGroup;
  town: string;
  openModal: boolean = false;
  newEstate: RealEstateData = new RealEstateData(
    '',
    '',
    '',
    '',
    '',
    '',
    false,
    false,
    false,
    false,
    []
  );
  markersArray: Array<any> = [];
  kindOfEstate: Array<any> = [
    {
      name: '-----',
    },
    {
      name: 'Kuća',
    },
    {
      name: 'Stan',
    },
    {
      name: 'Vikendica',
    },
    {
      name: 'Poslovni prostor',
    },
    {
      name: 'Bungalov',
    },
    {
      name: 'Vila',
    },
    {
      name: 'Plac',
    },
  ];

  typeSale: Array<any> = [
    {
      type: '-----',
    },
    {
      type: 'Prodaja',
    },
    {
      type: 'Izdavanje',
    },
  ];

  constructor(
    private mapService: MapService,
    private fb: FormBuilder,
    private realEstateService: RealEstateService,
    cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildMap();
    this.getPlaceName();
    this.generateForm();
  }

  getPlaceName(lat?: any, lon?: any) {
    this.mapService.getLocation(lat, lon).subscribe((res: any) => {
      this.town = res.features[0]?.place_name;
    });
  }

  addChange(event?: any) {
    const obj = {
      lat: event?.lat,
      long: event?.lng,
    };

    this.addBtn.push(obj);
    if (this.addBtn.length > 1) {
      this.addBtn.shift();
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapbox.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    this.map.addControl(new mapboxgl.NavigationControl());
    var marker = new mapboxgl.Marker();

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      `Grad ${this.town}`
    );

    const add_marker = (event: any) => {
      var coordinates = event.lngLat;
      this.addChange(coordinates);
      this.getPlaceName(coordinates.lat, coordinates.lng);
      marker.setLngLat(coordinates).setPopup(popup).addTo(this.map);
      this.openModal = true;

      /*for (const feature of this.markersArray) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(event.lngLat).addTo(this.map);
      }*/
    };

    const add_point = (event: any) => {
      var coordinates = event.lngLat;

      const obj = {
        geometry: {
          coordinates: [coordinates?.lat, coordinates?.lng],
          type: 'Point',
        },
      };

      this.markersArray.push(obj);
      console.log(this.markersArray);

      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(this.map);
    };

    this.map.on('click', add_marker);
    this.map.on('click', add_point);
  }

  onAddImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.createImage(event.target.files[i]);
        /*
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);

          this.createImage(event.target.result);
        };
        
        reader.readAsDataURL(event.target.files[i]);*/
      }
    }

    console.log(this.estateForm.value);
  }

  createImage(file: any) {
    const newFile = new FormControl(file);
    (<FormArray>this.estateForm.get('productImage')).push(newFile);
  }

  generateForm(): FormGroup {
    return (this.estateForm = this.fb.group({
      typeSale: ['', Validators.required],
      typeEstate: ['', Validators.required],
      price: ['', Validators.required],
      meters: ['', Validators.required],
      rooms: ['', Validators.required],
      year: ['', Validators.required],
      productImage: this.fb.array([]),
      termostat: [false],
      drain: [false],
      pets: [false],
      parking: [false],
    }));
  }

  saveProperty() {
    this.newEstate = this.estateForm.value;
    console.log(this.newEstate);

    this.realEstateService
      .postRealEstate(this.newEstate)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
