import { Component, ChangeDetectionStrategy,  } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconsCarsComponent } from '../../components/icons-cars/icons-cars.component';
import { CardsBrandsComponent } from '../../components/cards-brands/cards-brands.component';
import { CarListComponent } from '../../car-list/car-list.component';
import { CardsCarsComponent } from '../../components/cards-cars/cards-cars.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, IconsCarsComponent, CardsBrandsComponent, CardsCarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
