import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFarmComponent } from './animal-farm.component';

describe('AnimalFarmComponent', () => {
  let component: AnimalFarmComponent;
  let fixture: ComponentFixture<AnimalFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalFarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
