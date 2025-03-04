import { Component } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().subscribe(data => this.cars = data);
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
    });
  }
}
