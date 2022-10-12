import { Component, OnInit } from '@angular/core';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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
  posts: any[];
  images: Array<any> = [];

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit(): void {
    this.returnPosts();
  }

  returnPosts() {
    this.realEstateService.getPosts().subscribe((res: any) => {
      this.posts = res.posts;
      this.images = res?.posts?.productImage;

      this.posts.forEach((el: any) => {
        this.images = el.productImage;
      });
    });
  }
}
