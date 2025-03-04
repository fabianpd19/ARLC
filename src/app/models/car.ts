export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageurl: string;
  description: string;
  kilometers: number;
  fueltype: 'Gasolina' | 'Diésel';
  transmission: 'Manual' | 'Automática';
}
