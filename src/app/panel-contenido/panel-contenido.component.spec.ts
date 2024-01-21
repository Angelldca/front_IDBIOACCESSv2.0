import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContenidoComponent } from './panel-contenido.component';

describe('PanelContenidoComponent', () => {
  let component: PanelContenidoComponent;
  let fixture: ComponentFixture<PanelContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelContenidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
