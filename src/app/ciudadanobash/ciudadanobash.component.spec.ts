import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanobashComponent } from './ciudadanobash.component';

describe('CiudadanobashComponent', () => {
  let component: CiudadanobashComponent;
  let fixture: ComponentFixture<CiudadanobashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanobashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadanobashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
