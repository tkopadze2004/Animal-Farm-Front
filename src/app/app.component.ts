import { Component } from '@angular/core';
import { AnimalFarmComponent } from './pages/animal-farm/animal-farm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnimalFarmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'animal-farm-front';
}
