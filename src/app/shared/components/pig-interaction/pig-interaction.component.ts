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
import { map, switchMap, tap, take, Observable, of } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { ImagePaths } from '../../enums/image-paths.enum';
import { AudioPaths } from '../../enums/audio-paths.enum';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
  imports: [PushPipe],
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

  public click(): void {
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
            })
          );
        })
      )
      .subscribe();
  }

  public playMusic(): void {
    this.currentPigStatus$
      .pipe(
        take(1),
        switchMap((pigStatus) => {
          const fileName =
            pigStatus === 'putin' ? AudioPaths.USSR : AudioPaths.Napoleon;

          return this.audioService.loadAudio(fileName);
        }),
        switchMap((arrayBuffer) => this.audioService.decodeAudio(arrayBuffer)),
        tap((buffer) => {
          this.audioService.play(buffer);
          this.isPlaying = true;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  public stop(): void {
    this.audioService.stop();
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
