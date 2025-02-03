import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { updatePigStatus } from '../../../store/actions/pig.actions';
import { PigStatusService } from '../../../services/pig-status.service';
import { map, take, Observable, withLatestFrom } from 'rxjs';
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
  private readonly store = inject(Store);
  private readonly pigStatusService = inject(PigStatusService);

  public musicIsLoading$: Observable<boolean> =
    this.store.select(selectMusicLoading);
  public isPlaying = false;
  public clicked = false;

  @Input() pigStatus$: Observable<string | null> = new Observable();

  public click(): void {
    this.pigStatus$
      .pipe(take(1), withLatestFrom(this.musicIsLoading$))
      .subscribe(([pigStatus, isLoading]) => {
        if (isLoading) return;
        this.stop();

        const newStatus = pigStatus === 'putin' ? 'start' : 'putin';
        this.store.dispatch(updatePigStatus({ pigStatus: newStatus }));
      });
  }

  public playMusic(): void {
    this.pigStatus$.pipe(take(1)).subscribe((pigStatus) => {
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
    return this.pigStatus$.pipe(
      map((pigStatus) =>
        pigStatus === 'putin'
          ? ImagePaths.Putin
          : pigStatus === 'happy'
          ? ImagePaths.NapoleonSmile
          : ImagePaths.Napoleon
      )
    );
  }
}
