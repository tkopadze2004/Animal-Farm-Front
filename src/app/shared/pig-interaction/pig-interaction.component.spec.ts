import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigInteractionComponent } from './pig-interaction.component';

describe('PigInteractionComponent', () => {
  let component: PigInteractionComponent;
  let fixture: ComponentFixture<PigInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PigInteractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
