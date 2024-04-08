import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCiudadanoComponent } from './buscar-ciudadano.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('BuscarCiudadanoComponent', () => {
  let component: BuscarCiudadanoComponent;
  let fixture: ComponentFixture<BuscarCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCiudadanoComponent,HttpClientModule,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
