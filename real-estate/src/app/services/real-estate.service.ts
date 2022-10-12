import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //POST
  postRealEstate(data: any) {
    return this.http.post(this.domain + '/realEstate/newEstate', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //GET
  getPosts() {
    return this.http.get(this.domain + '/realEstate/allPosts').pipe(
      map((res) => {
        return res;
      })
    );
  }
}
