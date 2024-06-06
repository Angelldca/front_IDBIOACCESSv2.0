import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruUsuarioComponent } from './cru-usuario.component';

describe('CruUsuarioComponent', () => {
  let component: CruUsuarioComponent;
  let fixture: ComponentFixture<CruUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CruUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
