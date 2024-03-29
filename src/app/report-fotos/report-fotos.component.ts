import { ChangeDetectorRef, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import {MatIconModule} from '@angular/material/icon';
import moment from 'moment';




const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report-fotos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, 
    MatDatepickerModule,ReactiveFormsModule,
    MatButtonModule,
    CiudadanoTableComponent,
    MatIconModule,
    FormsModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    CiudadanoService,
  
  ],
  templateUrl: './report-fotos.component.html',
  styleUrl: './report-fotos.component.css'
})
export class ReportFotosComponent {
  constructor(private ciudadanoService: CiudadanoService,private cdr: ChangeDetectorRef){}

  
  rango = false;
  urlCiudadanos = '';
  user={
    entidad:"UCI"
  }
  fecha_inicio = new FormControl('', [Validators.required, 
  ]);
  fecha_final = new FormControl('', [Validators.required, 
  ]);
  ciudadanoForm = new FormGroup({
    fecha_inicio:this.fecha_inicio,
    fecha_fin:this.fecha_final,
  });
  
  getErrorMessage(element:FormControl) {
    if (element.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (element.hasError('maxlength') || element.hasError('minlength') ) {
      return 'Longitud incorrecta';
    }

    return element.hasError('pattern') ? `el contenido no es válido` : '';
  }

  onSubmit(form: FormGroup){
   this.rango = false;
   const data = {
      ...form.value,
      fecha_inicio: moment(form.value.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: moment(form.value.fecha_fin).format('YYYY-MM-DD')
    }
    for(let e in data){
      if (data[e].length <= 0 ){
        console.log(e, "  Datos incompletos")
        this.rango = false;
        return;
      }
    }
    this.urlCiudadanos =
    `http://127.0.0.1:8000/api/ciudadano/%7Bpk%7D/ciudadanos_Img_rangoFecha/?fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`;
    this.cdr.detectChanges();
    this.rango = true
  }

  donwloadListCiudadanos(form: FormGroup){
    const data = {
      ...form.value,
      fecha_inicio: moment(form.value.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: moment(form.value.fecha_fin).format('YYYY-MM-DD')
    }
    for(let e in data){
      if (data[e].length <= 0 ){
        console.log(e, "  Datos incompletos")
        return;
      }
    }
    const url = `http://127.0.0.1:8000/api/ciudadanos/%7Bpk%7D/ciudadanos_fecha_foto_csv/?fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}&entidad=${this.user.entidad}`
    const a = document.createElement('a');
    a.href = url
    a.download = 'nombre-del-archivo.csv'; // Asigna un nombre al archivo
    document.body.appendChild(a);

    // Inicia la descarga
    a.click();

    // Libera recursos
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
