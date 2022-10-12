import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  domain: string = 'nekretnina.com';
  aboutUs: string = `BlueHome olakšava objavljivanje ili pregledavanje vaših nekretnina. Koristeći najnovije tehnologije kao što je MEAN stack, i sa SSL-om činimo korisničko iskustvo sigurnim i ugodnim.
Olakšali smo agentima za nekretnine i kupcima da pretražuju našu web stranicu s mapboxom, interaktivnom mapom koja može precizno odrediti točnu lokaciju nekretnine. \n
Uskoro dostupno na google play i app storeu.`;

  constructor() {}

  ngOnInit(): void {}
}
