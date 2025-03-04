import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:5000/cars'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para obtener los carros desde la API
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Método para agregar un nuevo carro
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Método para eliminar un carro por ID
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
