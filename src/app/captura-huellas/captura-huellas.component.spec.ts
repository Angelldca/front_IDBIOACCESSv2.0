import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaHuellasComponent } from './captura-huellas.component';

describe('CapturaHuellasComponent', () => {
  let component: CapturaHuellasComponent;
  let fixture: ComponentFixture<CapturaHuellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturaHuellasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturaHuellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
