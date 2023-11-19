export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  }
  accessories: {
    id: string;
    type: 'speed' | 'acceleration' | 'turning_diameter' | 'electric_motor' | 'exchange' | 'seats'
    name: 'string'
  }[],  
  photos: string[]
}