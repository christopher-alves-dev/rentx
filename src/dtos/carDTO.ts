export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  fuelType: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  };
  accessories: {
    type:
      | 'speed'
      | 'acceleration'
      | 'turningDiameter'
      | 'electricMotor'
      | 'exchange'
      | 'seats';
    name: 'string';
  }[];
  photos: string[];
}
