import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolManageComponent } from './rol-manage.component';

describe('RolManageComponent', () => {
  let component: RolManageComponent;
  let fixture: ComponentFixture<RolManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
