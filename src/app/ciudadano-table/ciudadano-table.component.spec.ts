import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanoTableComponent } from './ciudadano-table.component';

describe('CiudadanoTableComponent', () => {
  let component: CiudadanoTableComponent;
  let fixture: ComponentFixture<CiudadanoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
