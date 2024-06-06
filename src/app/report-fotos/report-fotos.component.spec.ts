import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFotosComponent } from './report-fotos.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReportFotosComponent', () => {
  let component: ReportFotosComponent;
  let fixture: ComponentFixture<ReportFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFotosComponent,HttpClientModule,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
