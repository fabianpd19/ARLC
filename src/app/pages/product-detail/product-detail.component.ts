import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  car: Car | null = null;
  carId: number;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ) {
    this.carId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  ngOnInit(): void {
    this.carService.getCarById(this.carId).subscribe({
      next: (data) => {
        console.log('Carro cargado:', data);
        this.car = data;
      },
      error: (err) => {
        console.error('Error al obtener el carro:', err);
      }
    });
  }
}
