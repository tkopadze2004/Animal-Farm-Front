import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
  imports: [],
  templateUrl: './pig-interaction.component.html',
  styleUrl: './pig-interaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.4s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PigInteractionComponent {
  @Input() pigStatus: string | null | undefined | unknown;

  // get pigImage(): string {
  //   return this.pigStatus === 'happy'
  //     ? 'animals/napoleon-smile.png'
  //     : 'animals/napoleon.png';
  // }
}
