import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudanosCapturaImgComponent } from './ciudanos-captura-img.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CiudanosCapturaImgComponent', () => {
  let component: CiudanosCapturaImgComponent;
  let fixture: ComponentFixture<CiudanosCapturaImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudanosCapturaImgComponent,HttpClientModule,BrowserAnimationsModule]
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
