import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSliders } from '../../store/selectors/animals.selectors';
import { getAnimalsData } from '../../store/actions/animals.actions';
import { PushPipe } from '@ngrx/component';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IAnimal } from '../../core/models/animals.model';

@Component({
  selector: 'app-animal-farm',
  standalone: true,
  imports: [PushPipe, JsonPipe],
  templateUrl: './animal-farm.component.html',
  styleUrl: './animal-farm.component.scss',
})
export class AnimalFarmComponent implements OnInit {
  private readonly store: Store = inject(Store);

  public animals$: Observable<IAnimal[]> = this.store.select(selectSliders);

  ngOnInit(): void {
    this.store.dispatch(getAnimalsData());
  }
}
