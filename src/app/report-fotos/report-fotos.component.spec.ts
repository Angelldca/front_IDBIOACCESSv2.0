import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFotosComponent } from './report-fotos.component';

describe('ReportFotosComponent', () => {
  let component: ReportFotosComponent;
  let fixture: ComponentFixture<ReportFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFotosComponent]
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
