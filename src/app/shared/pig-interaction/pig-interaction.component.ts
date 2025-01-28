import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { AnimalsService } from '../../services/animals.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
  imports: [],
  templateUrl: './pig-interaction.component.html',
  styleUrl: './pig-interaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   trigger('replaceAnimation', [
  //     transition('* => *', [
  //       animate(
  //         '800ms ease-in-out',
  //         keyframes([
  //           style({ opacity: 1, transform: 'rotateY(0deg)', offset: 0 }),
  //           style({ opacity: 0, transform: 'rotateY(90deg)', offset: 0.5 }),
  //           style({ opacity: 0, transform: 'rotateY(90deg)', offset: 0.55 }),
  //           style({ opacity: 1, transform: 'rotateY(0deg)', offset: 1 }),
  //         ])
  //       ),
  //     ]),])]
})
export class PigInteractionComponent {
  @Input() pigStatus: string | null | undefined | unknown;
  get pigImage(): string {
    return this.pigStatus === 'happy'
      ? 'animals/napoleon-smile.png'
      : 'animals/napoleon.png';
  }


  // servic = inject(AnimalsService);
  // pigImage = '';
  // pigStatus: any;
  // constructor(private cdr: ChangeDetectorRef) {}

  // as = this.servic.stat().subscribe((response: any) => {
  //   this.pigStatus = response.currentStatus;
  //   this.updatePigImage(this.pigStatus);
  //   console.log(this.pigStatus);

  //   this.cdr.markForCheck(); // Manually trigger change detection
  //   if (response) {
  //     setTimeout(() => {
  //       this.servic.reset().subscribe(); // Call reset after 3 seconds
  //     }, 3000); // 3000ms = 3 seconds
  //   }
  // });
  // updatePigImage(status: string) {
  //   console.log(this.pigStatus);

  //   if (status === 'happy') {
  //     this.pigImage = 'animals/napoleon.png';
  //   } else if (status === 'start') {
  //     this.pigImage = 'animals/napoleon-smile.png';
  //   }
  // }
}
