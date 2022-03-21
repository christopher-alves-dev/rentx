export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: string;
    price: number;
  },
  fuel_type: string;
  thumbnail: string;
  accessories: {
    type: 'speed' | 'acceleration' | 'turning_diameter' | 'electric_motor' | 'exchange' | 'seats'
    name: 'string'
  }[],  
  photos: string[];
}