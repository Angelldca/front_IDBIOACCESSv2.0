import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanoListCsComponent } from './ciudadano-list-cs.component';

describe('CiudadanoListCsComponent', () => {
  let component: CiudadanoListCsComponent;
  let fixture: ComponentFixture<CiudadanoListCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanoListCsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanoListCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
