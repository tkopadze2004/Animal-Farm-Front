import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSliders,
  selectThanksCount,
} from '../../store/selectors/animals.selectors';
import { getAnimalsData } from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import { Observable, tap } from 'rxjs';
import { IAnimal } from '../../core/models/animals.model';
import { AnimalCardComponent } from '../../shared/animal-card/animal-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-farm',
  standalone: true,
  imports: [AnimalCardComponent, PushPipe, MatSnackBarModule],
  templateUrl: './animal-farm.component.html',
  styleUrl: './animal-farm.component.scss',
})
export class AnimalFarmComponent implements OnInit {
  private readonly store: Store = inject(Store);
  public animals$: Observable<IAnimal[] | undefined> =
    this.store.select(selectSliders);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }
  public success$: Observable<number | undefined> = this.store
    .select(selectThanksCount)
    .pipe(
      tap((thanksCount) => {
        if (thanksCount == 0) {
          return;
        }
        this.openSnackBar('Thanks!', 'Close');
      })
    );

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
