import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanoListSsComponent } from './ciudadano-list-ss.component';

describe('CiudadanoListSsComponent', () => {
  let component: CiudadanoListSsComponent;
  let fixture: ComponentFixture<CiudadanoListSsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanoListSsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanoListSsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
