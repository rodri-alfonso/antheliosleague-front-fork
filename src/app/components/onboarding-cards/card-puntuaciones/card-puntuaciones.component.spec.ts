import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPuntuacionesComponent } from './card-puntuaciones.component';

describe('CardPuntuacionesComponent', () => {
  let component: CardPuntuacionesComponent;
  let fixture: ComponentFixture<CardPuntuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPuntuacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPuntuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
