import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListCiudadanoComponent } from './report-list-ciudadano.component';
import { HttpClientModule } from '@angular/common/http';

describe('ReportListCiudadanoComponent', () => {
  let component: ReportListCiudadanoComponent;
  let fixture: ComponentFixture<ReportListCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportListCiudadanoComponent,HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportListCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
