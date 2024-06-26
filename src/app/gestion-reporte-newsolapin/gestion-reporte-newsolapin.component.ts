import { ChangeDetectorRef, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { TableReporteNewSolapinComponent } from '../table-reporte-newsolapin/table-reporte-newsolapin.component';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { urlBack } from '../Finals';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';


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
  selector: 'app-gestion-reporte-newsolapin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, 
    MatDatepickerModule,ReactiveFormsModule,
    MatButtonModule,
    TableReporteNewSolapinComponent,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    TomarFotoComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    HttpClient
  
  ],
  templateUrl: './gestion-reporte-newsolapin.component.html',
  styleUrl: './gestion-reporte-newsolapin.component.css'
})
export class GestionReporteNewSolapinComponent {
  constructor(private httpClient: HttpClient, private ciudadanoService: CiudadanoService,private cdr: ChangeDetectorRef){}
  userID:string| undefined| null;
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
    `${urlBack}newsolapinhist/rango_fecha/?fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`;
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
    const url = `${urlBack}newsolapinhist/exportar_csv/?fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    
    this.httpClient.get(url, { responseType: 'blob',headers: headers })
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
            })
        )
        .subscribe((response: Blob) => {
            const blob = new Blob([response], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `newsolapinhistorico_${data.fecha_inicio}_to_${data.fecha_fin}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        });
  
  }
  getUserID(value: string|undefined|null){
    this.userID = value;
    //this.rango=false;

 }
}

