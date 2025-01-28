import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSliders,
  selectThanksCount,
} from '../../store/selectors/animals.selectors';
import { getAnimalsData } from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { IAnimal } from '../../core/models/animals.model';
import { AnimalCardComponent } from '../../shared/animal-card/animal-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PigInteractionComponent } from '../../shared/pig-interaction/pig-interaction.component';
import { AnimalsService } from '../../services/animals.service';

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
    this.store.select(selectSliders);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  pigStatus: string | null | undefined | unknown = '';
  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }

  sharedse = inject(AnimalsService);

  public success$ = this.store.select(selectThanksCount).pipe(
    tap((response) => {
      console.log('Store response:', response);

      const { thanksCount, pigStatus } = response;

      if (thanksCount === undefined || thanksCount === 0) {
        return;
      }

      if (thanksCount > 0) {
        this.openSnackBar('Thanks to our leader!');
      }

      this.pigStatus = pigStatus;
    }),
    switchMap((response) => {
      const { thanksCount } = response;

      if (thanksCount === undefined || thanksCount === 0) {
        return [];
      }

      return timer(2000).pipe(
        switchMap(() =>
          this.sharedse.stat().pipe(
            tap((newPigStatus) => {
              this.pigStatus = newPigStatus;
              console.log('Updated pigStatus:', newPigStatus);
              this.cdr.markForCheck();
            })
          )
        )
      );
    })
  );

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: [`test`],
    });
  }
  // isloadig$:Observable<boolean> = this.store.select(selectLoading);
}
