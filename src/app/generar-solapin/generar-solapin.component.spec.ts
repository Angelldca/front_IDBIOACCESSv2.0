import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarSolapinComponent } from './generar-solapin.component';

describe('GenerarSolapinComponent', () => {
  let component: GenerarSolapinComponent;
  let fixture: ComponentFixture<GenerarSolapinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarSolapinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerarSolapinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
