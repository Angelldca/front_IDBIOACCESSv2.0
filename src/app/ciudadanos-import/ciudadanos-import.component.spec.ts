import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanosImportComponent } from './ciudadanos-import.component';
import { HttpClientModule } from '@angular/common/http';

describe('CiudadanosImportComponent', () => {
  let component: CiudadanosImportComponent;
  let fixture: ComponentFixture<CiudadanosImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanosImportComponent,HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanosImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
