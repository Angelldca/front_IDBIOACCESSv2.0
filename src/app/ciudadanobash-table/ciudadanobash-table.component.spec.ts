import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanobashTableComponent } from './ciudadanobash-table.component';

describe('CiudadanobashTableComponent', () => {
  let component: CiudadanobashTableComponent;
  let fixture: ComponentFixture<CiudadanobashTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanobashTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanobashTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
