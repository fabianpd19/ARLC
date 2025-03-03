import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconsCarsComponent } from '../../components/icons-cars/icons-cars.component';
import { CardsBrandsComponent } from '../../components/cards-brands/cards-brands.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, IconsCarsComponent, CardsBrandsComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
