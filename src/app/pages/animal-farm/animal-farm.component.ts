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
import { Observable, switchMap, tap, timer } from 'rxjs';
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
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly store: Store = inject(Store);
  public animals$: Observable<IAnimal[] | undefined> =
    this.store.select(selectAnimals);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  public pigStatus: string | null | undefined | unknown = '';
  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }

  public success$ = this.store.select(selectFeedAnimalSuccess).pipe(
    tap((response) => {
      const { thanksCount, message } = response;

      if (thanksCount === undefined || thanksCount === 0) {
        return;
      }

      if (thanksCount > 0 && message!) {
        this.openSnackBar(message!);
      }
    }),
    switchMap((response) => {
      const { pigStatus, thanksCount } = response;

      if (thanksCount === undefined || thanksCount === 0) {
        return [];
      }
      return timer(300).pipe(
        tap(() => {
          this.pigStatus = pigStatus;
          this.cdr.markForCheck();
        }),
        switchMap(() => {
          return timer(3000).pipe(
            switchMap(() => {
              this.store.dispatch(getPigStatus());
              return this.store.select(selectPigStatus).pipe(
                tap((newPigStatus) => {
                  this.pigStatus = newPigStatus;
                  this.cdr.markForCheck();
                })
              );
            })
          );
        })
      );
    })
  );

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [`test`],
    });
  }
  // isloadig$:Observable<boolean> = this.store.select(selectLoading);
}
