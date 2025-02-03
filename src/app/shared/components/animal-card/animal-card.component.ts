import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent {
  public thanksCount = input<number>();
  public name = input<string>('');
  public food = input<string>('');
  public id = input<string>('');
  public feed = output<string>();
  public disableFeedComputed = input<boolean | undefined>(false);
  public loadingFeedAnimalById = input<string | null | undefined>('');

  public onFeed(): void {
    this.feed.emit(this.id());
  }
}
