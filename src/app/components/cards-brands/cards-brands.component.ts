import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Si necesitas íconos

@Component({
  selector: 'app-cards-brands',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './cards-brands.component.html',
  styleUrl: './cards-brands.component.css'
})
export class CardsBrandsComponent {
  marcas = [
    { nombre: 'Audi', imagen: 'brands/b1.png' },
    { nombre: 'BMW', imagen: 'brands/b2.png' },
    { nombre: 'Ford', imagen: 'brands/b3.png' },
    { nombre: 'Mercedes Benz', imagen: 'brands/b4.png' },
    { nombre: 'Peugeot', imagen: 'brands/b5.png' },
    { nombre: 'Volkswagen', imagen: 'brands/b6.png' },
    // Agrega más marcas según sea necesario
  ];
}
