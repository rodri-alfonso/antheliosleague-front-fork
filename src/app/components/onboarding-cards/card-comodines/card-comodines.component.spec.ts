import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComodinesComponent } from './card-comodines.component';

describe('CardComodinesComponent', () => {
  let component: CardComodinesComponent;
  let fixture: ComponentFixture<CardComodinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComodinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComodinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
