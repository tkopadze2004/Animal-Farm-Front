import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAnimals,
  selectFeedAnimalSuccess,
} from '../../store/selectors/animals.selectors';
import { getAnimalsData } from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import {
  delayWhen,
  filter,
  mergeMap,
  Observable,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { IAnimal } from '../../core/models/animals.model';
import { AnimalCardComponent } from '../../shared/components/animal-card/animal-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PigInteractionComponent } from '../../shared/components/pig-interaction/pig-interaction.component';
import { selectPigStatus } from '../../store/selectors/pig-selector';
import { getPigStatus } from '../../store/actions/pig.actions';

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
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  public animals$: Observable<IAnimal[]> = this.store.select(selectAnimals);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  public pigStatus: string | null = '';
  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }

  public success$: Observable<string | null> = this.store
    .select(selectFeedAnimalSuccess)
    .pipe(
      tap(({ thanksCount, message }) => {
        if (thanksCount && message) {
          this.openSnackBar(message);
        }
      }),
      filter(({ thanksCount }) => !!thanksCount),
      mergeMap(({ pigStatus }) =>
        timer(300).pipe(
          tap(() => {
            this.pigStatus = pigStatus;
            this.cdr.markForCheck();
          }),
          delayWhen(() => timer(2300)),
          tap(() => this.store.dispatch(getPigStatus())),
          switchMap(() =>
            this.store.select(selectPigStatus).pipe(
              tap((updatedPigStatus) => {
                this.pigStatus = updatedPigStatus;
                this.cdr.markForCheck();
              })
            )
          )
        )
      )
    );

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [`popup`],
    });
  }
}
