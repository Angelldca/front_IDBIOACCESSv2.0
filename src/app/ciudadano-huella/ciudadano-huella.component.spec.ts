import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanoHuellaComponent } from './ciudadano-huella.component';

describe('CiudadanoHuellaComponent', () => {
  let component: CiudadanoHuellaComponent;
  let fixture: ComponentFixture<CiudadanoHuellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanoHuellaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanoHuellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
