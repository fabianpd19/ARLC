import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards-cars-footer',
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './cards-cars-footer.component.html',
  styleUrl: './cards-cars-footer.component.css'
})
export class CardsCarsFooterComponent {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedBrand: string | null = null;
  brandsToShow: string[] = [];

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (data) => {
        console.log('Carros cargados:', data);
        this.cars = data;
        this.brandsToShow = this.getTopBrands(4);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error al obtener los carros:', err);
      }
    });
  }

  getTopBrands(count: number): string[] {
    const brandCounts: { [key: string]: number } = {};
    this.cars.forEach(car => {
      brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
    });

    return Object.keys(brandCounts)
      .sort((a, b) => brandCounts[b] - brandCounts[a]) // Ordena por cantidad de autos disponibles
      .slice(0, count); // Toma las 4 marcas más populares
  }

  selectBrand(brand: string | null): void {
    this.selectedBrand = brand;
    this.applyFilter();
  }

  applyFilter(): void {
    let carsToShow = this.selectedBrand
      ? this.cars.filter(car => car.brand === this.selectedBrand)
      : this.cars;

    this.filteredCars = this.getRandomCars(carsToShow, 4);
  }

  getRandomCars(cars: Car[], count: number): Car[] {
    return cars.sort(() => Math.random() - 0.5).slice(0, count);
  }

  verDetalle(id: number): void {
    this.router.navigate([`/product/${id}`]);
  }

  getUniqueBrands(): string[] {
    return [...new Set(this.cars.map(car => car.brand))];
  }
  
  
}
