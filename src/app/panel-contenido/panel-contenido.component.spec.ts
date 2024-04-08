import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContenidoComponent } from './panel-contenido.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PanelContenidoComponent', () => {
  let component: PanelContenidoComponent;
  let fixture: ComponentFixture<PanelContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelContenidoComponent,HttpClientModule,BrowserAnimationsModule]
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
