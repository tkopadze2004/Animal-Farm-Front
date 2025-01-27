import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedAnimal } from '../../store/actions/animals.actions';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
})
export class AnimalCardComponent {
  private readonly store = inject(Store);
  public thanksCount = input<number>();
  public name = input<string>('');
  public food = input<string>('');
  public id = input<string>('');

  public feedAnimal(): void {
    this.store.dispatch(feedAnimal({ id: this.id() }));
  }
}
