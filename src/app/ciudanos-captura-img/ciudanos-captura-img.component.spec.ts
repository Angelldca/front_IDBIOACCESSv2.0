import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudanosCapturaImgComponent } from './ciudanos-captura-img.component';

describe('CiudanosCapturaImgComponent', () => {
  let component: CiudanosCapturaImgComponent;
  let fixture: ComponentFixture<CiudanosCapturaImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudanosCapturaImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudanosCapturaImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
