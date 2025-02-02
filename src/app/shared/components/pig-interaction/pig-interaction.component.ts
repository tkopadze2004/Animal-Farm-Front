import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import {
  disableFeeding,
  enableFeeding,
  getPigStatus,
} from '../../../store/actions/pig.actions';
import { selectPigStatus } from '../../../store/selectors/pig-selector';
import { AudioService } from '../../../services/audio.service';
import { PigStatusService } from '../../../services/pig-status.service';
import { map, switchMap, tap, take, Observable, of, finalize } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { ImagePaths } from '../../enums/image-paths.enum';
import { AudioPaths } from '../../enums/audio-paths.enum';
import { loadMusic, stopMusic } from '../../../store/actions/music.actions';
import { selectMusicLoading } from '../../../store/selectors/audio.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
  imports: [PushPipe, MatProgressSpinnerModule],
  templateUrl: './pig-interaction.component.html',
  styleUrls: ['./pig-interaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeAnimation', [
      state('default', style({ opacity: 1 })),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PigInteractionComponent {
  public pigStatus = input<string | null>(null);

  private readonly store = inject(Store);
  private readonly pigStatusService = inject(PigStatusService);
  private readonly audioService = inject(AudioService);
  private readonly cdr = inject(ChangeDetectorRef);

  public isPlaying: boolean = false;
  public pigStatus$: Observable<string | null> =
    this.store.select(selectPigStatus);

  get currentPigStatus$(): Observable<string | null> {
    return this.pigStatus() ? of(this.pigStatus()) : this.pigStatus$;
  }
  public clicked = false;

  public click(): void {
    if (this.clicked) {
      return;
    }

    this.clicked = true;

    this.stop();
    this.currentPigStatus$
      .pipe(
        take(1),
        switchMap((currentStatus) => {
          const newStatus = currentStatus === 'putin' ? 'start' : 'putin';

          if (newStatus === 'putin') {
            this.store.dispatch(disableFeeding());
          } else {
            this.store.dispatch(enableFeeding());
          }

          return this.pigStatusService.updateStatus(newStatus).pipe(
            tap(() => {
              this.store.dispatch(getPigStatus());
            }),
            finalize(() => {
              this.clicked = false;
            })
          );
        })
      )
      .subscribe();
  }

  public loading$: Observable<boolean> = this.store.select(selectMusicLoading);

  public playMusic(): void {
    if (this.isPlaying) return;

    this.currentPigStatus$.pipe(take(1)).subscribe((pigStatus) => {
      const fileName =
        pigStatus === 'putin' ? AudioPaths.USSR : AudioPaths.Napoleon;

      this.store.dispatch(loadMusic({ filePath: fileName }));
      this.isPlaying = true;
    });
  }

  public stop(): void {
    this.store.dispatch(stopMusic());
    this.isPlaying = false;
  }

  public get pigImage$(): Observable<ImagePaths> {
    return this.currentPigStatus$.pipe(
      map((pigStatus) =>
        pigStatus === 'putin'
          ? ImagePaths.Putin
          : pigStatus === 'happy'
          ? ImagePaths.NapoleonSmile
          : ImagePaths.Napoleon
      )
    );
  }

  public get animationState$(): Observable<ImagePaths> {
    return this.pigImage$;
  }
}
