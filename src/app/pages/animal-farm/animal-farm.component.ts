import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAnimalFeedLoading,
  selectAnimals,
  selectFeedAnimalSuccess,
} from '../../store/selectors/animals.selectors';
import {
  feedAnimal,
  getAnimalsData,
} from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { IAnimal, IFeedAnimalRes } from '../../core/models/animals.model';
import { AnimalCardComponent } from '../../shared/components/animal-card/animal-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PigInteractionComponent } from '../../shared/components/pig-interaction/pig-interaction.component';
import { selectPigStatus } from '../../store/selectors/pig-selector';

@Component({
  selector: 'app-animal-farm',
  standalone: true,
  imports: [
    AnimalCardComponent,
    PushPipe,
    MatSnackBarModule,
    PigInteractionComponent,
  ],
  templateUrl: './animal-farm.component.html',
  styleUrl: './animal-farm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalFarmComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }

  public animals$: Observable<IAnimal[]> = this.store.select(selectAnimals);

  public onFeedAnimal(id: string): void {
    this.store.dispatch(feedAnimal({ id }));
  }

  public feedAnimalsuccess$: Observable<IFeedAnimalRes> = this.store
    .select(selectFeedAnimalSuccess)
    .pipe(
      distinctUntilChanged(
        (prev, curr) =>
          prev.thanksCount === curr.thanksCount && prev.message === curr.message
      ),
      filter(({ message }) => !!message),
      tap(({ message }) => this.openSnackBar(message!))
    );

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [`popup`],
    });
  }

  public loadingFeedAnimalById$: Observable<string | null> = this.store.select(
    selectAnimalFeedLoading
  );

  public pigstatus$: Observable<string | null> = this.store.select(selectPigStatus);

  public disableFeedComputed$: Observable<boolean> = combineLatest([
    this.loadingFeedAnimalById$,
    this.pigstatus$,
  ]).pipe(
    map(
      ([loadingAnimalId, pigstatus]) =>
        !!loadingAnimalId || pigstatus === 'putin' || pigstatus === 'happy'
    )
  );
}
