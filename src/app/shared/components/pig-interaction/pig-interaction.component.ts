import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  disableFeeding,
  enableFeeding,
  getPigStatus,
} from '../../../store/actions/pig.actions';
import { selectPigStatus } from '../../../store/selectors/pig-selector';
import { AudioService } from '../../../services/audio.service';
import { PigStatusService } from '../../../services/pig-status.service';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
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
  @Input() pigStatus: string | null = null;
  private readonly store: Store = inject(Store);
  public isPlaying: boolean = false;
  private readonly pigStatusService = inject(PigStatusService);
  private readonly audioService = inject(AudioService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  clic() {
    this.stop();

    this.store
      .select(selectPigStatus)
      .pipe(take(1))
      .subscribe((currentStatus) => {
        let newStatus = currentStatus === 'putin' ? 'start' : 'putin';

        this.pigStatus = newStatus;
        this.cdr.markForCheck();
        if (newStatus === 'putin') {
          this.store.dispatch(disableFeeding());
        } else {
          this.store.dispatch(enableFeeding());
        }

        this.pigStatusService.updateStatus(newStatus).subscribe(() => {
          this.store.dispatch(getPigStatus());
        });
      });
  }

  playMusic() {
    if (!this.pigStatus) {
      this.pigStatus = 'start';
    }

    const fileName =
      this.pigStatus === 'putin'
        ? 'music/audio/ssrk.mp3'
        : 'music/audio/pig.mp3';

    this.audioService.loadAudio(fileName).subscribe({
      next: (arrayBuffer) => {
        this.audioService.decodeAudio(arrayBuffer).subscribe({
          next: (buffer) => {
            this.audioService.play(buffer);
            this.isPlaying = true;
            this.cdr.markForCheck();
          },
        });
      },
    });
  }

  stop() {
    this.audioService.stop();
    this.isPlaying = false;
  }

  get pigImage(): string {
    if (this.pigStatus === 'putin') {
      return 'putin.png';
    } else if (this.pigStatus === 'happy') {
      return 'animals/napoleon-smile.png';
    }
    return 'animals/napoleon.png';
  }
  get animationState(): string {
    return this.pigImage;
  }
}
