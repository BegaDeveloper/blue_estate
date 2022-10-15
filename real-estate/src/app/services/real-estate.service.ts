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
    
     const formData = new FormData();
    
    // ovdje ubaci form data append
    // sve vrijednosti iz forme
    // u formatu npr. 
    // formData.append('name', data.name);
    //
    //i onda loop kroz fajlove
    //data.files.forEach((file)=>{
  //  formData.append('files[]', file);
    //
    //});
    //
    //
    
    return this.http.post(this.domain + '/realEstate/newEstate', formData).pipe(
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
