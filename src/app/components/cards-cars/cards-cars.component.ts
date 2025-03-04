import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cards-cars',
  imports: [CommonModule, MatIconModule],
  templateUrl: './cards-cars.component.html',
  styleUrl: './cards-cars.component.css'
})
export class CardsCarsComponent {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((data) => {
      console.log(data);
      this.cars = data;
    });
  }
}
