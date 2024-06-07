import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanoHuellaTableComponent } from './ciudadano-huella-table.component';

describe('CiudadanoHuellaTableComponent', () => {
  let component: CiudadanoHuellaTableComponent;
  let fixture: ComponentFixture<CiudadanoHuellaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanoHuellaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanoHuellaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
