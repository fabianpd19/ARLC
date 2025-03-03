import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-icons-cars',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './icons-cars.component.html',
  styleUrl: './icons-cars.component.css'
})
export class IconsCarsComponent {
 
}
