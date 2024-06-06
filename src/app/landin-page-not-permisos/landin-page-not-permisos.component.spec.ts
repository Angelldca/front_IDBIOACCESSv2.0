import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinPageNotPermisosComponent } from './landin-page-not-permisos.component';

describe('LandinPageNotPermisosComponent', () => {
  let component: LandinPageNotPermisosComponent;
  let fixture: ComponentFixture<LandinPageNotPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandinPageNotPermisosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandinPageNotPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
