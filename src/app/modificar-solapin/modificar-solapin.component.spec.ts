import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolapinComponent } from './modificar-solapin.component';

describe('ModificarSolapinComponent', () => {
  let component: ModificarSolapinComponent;
  let fixture: ComponentFixture<ModificarSolapinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarSolapinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarSolapinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
