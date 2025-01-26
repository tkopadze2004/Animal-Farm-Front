import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSliders } from './store/selectors/animals.selectors';
import { PushPipe } from '@ngrx/component';
import { JsonPipe } from '@angular/common';
import { getAnimalsData } from './store/actions/animals.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PushPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'animal-farm-front';
  private readonly store: Store = inject(Store);

  public animals$ = this.store.select(selectSliders);

  ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }
}
