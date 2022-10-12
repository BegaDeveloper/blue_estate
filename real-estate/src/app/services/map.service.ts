import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  private reverseGeoLocation: string = `http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/-6.348457,53.712829.json?access_token=${environment.mapbox.accessToken}`;

  getLocation(lat: any, lon: any) {
    return this.http
      .get(
        `http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/${lon},${lat}.json?access_token=${environment.mapbox.accessToken}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
