import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarFotoComponent } from './tomar-foto.component';
import { MediaDevicesService } from './mediaDivice.service';
import { WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { HttpClientModule } from '@angular/common/http';

describe('TomarFotoComponent', () => {
  let component: TomarFotoComponent;
  let fixture: ComponentFixture<TomarFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TomarFotoComponent,HttpClientModule],
      providers: [MediaDevicesService,CiudadanoService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TomarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should capture an image', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Mock window.confirm
   
  })

})