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
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  disableFeeding,
  enableFeeding,
  getPigStatus,
} from '../../store/actions/pig.actions';
import { selectPigStatus } from '../../store/selectors/pig-selector';
import { AudioService } from '../../services/audio.service';

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
  @Input() pigStatus: string | null | unknown = null;
  store = inject(Store);
  htto = inject(HttpClient);
  isPlaying = false; // Flag to track music state

  updateStatus(status: string): Observable<any> {
    return this.htto.post<any>('http://localhost:3000/api/bidzina/update', {
      status,
    });
  }

  constructor(private audioService: AudioService) {}

  clic() {
    this.stop();

    this.store
      .select(selectPigStatus)
      .pipe(take(1))
      .subscribe((currentStatus) => {
        let newStatus = currentStatus === 'putin' ? 'start' : 'putin';

        this.pigStatus = newStatus;
        // if (!this.pigStatus) {
        //   this.pigStatus = 'start';
        // }
        // console.log(this.pigStatus);

        this.cdr.markForCheck();
        if (newStatus === 'putin') {
          this.store.dispatch(disableFeeding());
        } else {
          this.store.dispatch(enableFeeding());
        }

        this.updateStatus(newStatus).subscribe(() => {
          this.store.dispatch(getPigStatus());
        });
      });
  }

  playMusic() {
    if (!this.pigStatus) {
      this.pigStatus = 'start';
    }

    if (this.pigStatus === 'putin') {
      this.audioService.loadAndPlay('music/audio/ssrk.mp3');
      this.isPlaying = true;
    }

    if (this.pigStatus === 'start') {
      this.audioService.loadAndPlay('music/audio/pig.mp3');
      this.isPlaying = true;
    }
  }

  stop() {
    this.audioService.stop();
    this.isPlaying = false;
  }
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

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
