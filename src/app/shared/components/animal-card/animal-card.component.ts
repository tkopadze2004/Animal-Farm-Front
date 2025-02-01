import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedAnimal } from '../../../store/actions/animals.actions';
import { selectDisableFeed } from '../../../store/selectors/pig-selector';
import { PushPipe } from '@ngrx/component';
import { combineLatest, map, Observable } from 'rxjs';
import { selectLoadingAnimalId } from '../../../store/selectors/animals.selectors';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [PushPipe, MatProgressSpinner],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent {
  private readonly store = inject(Store);
  public thanksCount = input<number>();
  public name = input<string>('');
  public food = input<string>('');
  public id = input<string>('');

  public disableFeed$: Observable<boolean> =
    this.store.select(selectDisableFeed);

  public feedAnimal(): void {
    this.store.dispatch(feedAnimal({ id: this.id() }));
  }
  public loadingAnimalId$: Observable<string | null> = this.store.select(
    selectLoadingAnimalId
  );
  public disableFeedComputed$: Observable<boolean> = combineLatest([
    this.disableFeed$,
    this.loadingAnimalId$,
  ]).pipe(
    map(([disableFeed, loadingAnimalId]) => disableFeed || !!loadingAnimalId)
  );
}
