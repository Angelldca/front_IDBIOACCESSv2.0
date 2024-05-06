import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaAutenticacionComponent } from './fecha-autenticacion.component';

describe('FechaAutenticacionComponent', () => {
  let component: FechaAutenticacionComponent;
  let fixture: ComponentFixture<FechaAutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaAutenticacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FechaAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
