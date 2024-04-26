import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanageComponent } from './usermanage.component';

describe('UsermanageComponent', () => {
  let component: UsermanageComponent;
  let fixture: ComponentFixture<UsermanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsermanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
