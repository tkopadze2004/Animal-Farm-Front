import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAnimalFeedFail,
  selectAnimalFeedLoading,
  selectAnimals,
  selectAnimalsFail,
  selectFeedAnimalSuccess,
} from '../../store/selectors/animals.selectors';
import {
  clearAnimalMessages,
  feedAnimal,
  getAnimalsData,
} from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import {
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  lastValueFrom,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { IAnimal, IFeedAnimalRes } from '../../core/models/animals.model';
import { AnimalCardComponent } from '../../shared/components/animal-card/animal-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PigInteractionComponent } from '../../shared/components/pig-interaction/pig-interaction.component';
import {  pigStatusFail, selectPigStatus, selectPigStatusUpdateFail } from '../../store/selectors/pig-selector';
import { clearPigMessagess } from '../../store/actions/pig.actions';
import { clearMusicMessages } from '../../store/actions/music.actions';
import { selectMusicFail } from '../../store/selectors/audio.selectors';

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
  public animals$: Observable<IAnimal[]> = this.store.select(selectAnimals);
  public statusUpdateError$ : Observable<string | null> = this.store.select(selectPigStatusUpdateFail)
  public getAnimalsError$: Observable<string | null> = this.store.select(selectAnimalsFail)
  public selectAnimalfeedError$: Observable<string | null> = this.store.select(selectAnimalFeedFail)
  public pigStatusError$: Observable<string | null> = this.store.select(pigStatusFail)
  public audioError$ : Observable<string|null> = this.store.select(selectMusicFail)

  public ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }

  public error$:Observable<string | null | undefined> = combineLatest([
    this.statusUpdateError$,
    this.getAnimalsError$,
    this.selectAnimalfeedError$,
    this.pigStatusError$,
    this.audioError$
  ]).pipe(
    map(errors => errors.find(error => !!error)) 
  );
  
  public showError(error: string) : void {
    this.snackBar.open(error,'', { duration: 3000, panelClass:[ 'popup','error'] });
    lastValueFrom(of(null).pipe(
      delay(1000),
      tap(() => {
        this.store.dispatch(clearAnimalMessages());
        this.store.dispatch(clearPigMessagess());
        this.store.dispatch(clearMusicMessages());
      })
    ))}
  
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
      tap(({ message }) => this.showSuccessMessage(message!))
    );

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['popup','success'],
    });
  }

  public loadingFeedAnimalById$: Observable<string | null> = this.store.select(
    selectAnimalFeedLoading
  );

  public pigstatus$: Observable<string | null> =
    this.store.select(selectPigStatus);

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
