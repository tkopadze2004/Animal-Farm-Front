import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pig-interaction',
  standalone: true,
  imports: [],
  templateUrl: './pig-interaction.component.html',
  styleUrl: './pig-interaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PigInteractionComponent {}
