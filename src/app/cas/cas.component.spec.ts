import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasComponent } from './cas.component';

describe('CasComponent', () => {
  let component: CasComponent;
  let fixture: ComponentFixture<CasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
