import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cards-cars',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './cards-cars.component.html',
  styleUrls: ['./cards-cars.component.css'], // <-- Corregido
})
export class CardsCarsComponent {
  cars: Car[] = [];

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (data) => {
        console.log('Carros cargados:', data);
        this.cars = data;
      },
      error: (err) => {
        console.error('Error al obtener los carros:', err);
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate([`/product/${id}`]); // Redirige a la página de detalles del carro
  }
}
