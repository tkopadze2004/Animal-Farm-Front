import { Component, input } from '@angular/core';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
})
export class AnimalCardComponent {
  public thanksCount = input<number>();
  public name = input<string>('');
  public food = input<string>('');
}
