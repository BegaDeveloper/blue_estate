export interface RealEstateDTO {
  typeSale: string;
  typeEstate: string;
  price: string;
  meters: string;
  rooms: string;
  year: string;
  termostat: boolean;
  drain: boolean;
  pets: boolean;
  parking: boolean;
  productImage: any;
}

export class RealEstateData implements RealEstateDTO {
  constructor(
    public typeSale: string,
    public typeEstate: string,
    public price: string,
    public meters: string,
    public rooms: string,
    public year: string,
    public termostat: boolean,
    public drain: boolean,
    public pets: boolean,
    public parking: boolean,
    public productImage: any
  ) {}
}
