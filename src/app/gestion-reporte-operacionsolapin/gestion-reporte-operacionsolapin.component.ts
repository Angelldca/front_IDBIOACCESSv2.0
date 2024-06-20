import { ChangeDetectorRef, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { TableReporteOperacionSolapinComponent } from '../table-reporte-operacionsolapin/table-reporte-operacionsolapin.component';
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
  selector: 'app-gestion-reporte-operacionsolapin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, 
    MatDatepickerModule,ReactiveFormsModule,
    MatButtonModule,
    TableReporteOperacionSolapinComponent,
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
  templateUrl: './gestion-reporte-operacionsolapin.component.html',
  styleUrl: './gestion-reporte-operacionsolapin.component.css'
})
export class GestionReporteOperacionSolapinComponent {
  constructor(private httpClient: HttpClient, private ciudadanoService: CiudadanoService,private cdr: ChangeDetectorRef){}
  userID:string| undefined| null;
  search = false;
  urlCiudadanos = '';
  user={
    entidad:"UCI"
  }
  busqueda = new FormControl('', Validators.required);

  ciudadanoForm = new FormGroup({
    busqueda:this.busqueda,
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
  this.search=false
   const data = {
      ...form.value,
      busqueda: form.value.busqueda
    }
    if(data.busqueda.length == 0){
      data.busqueda = -1;
    }
    this.urlCiudadanos = `${urlBack}operacionsolapin/get_operacion_by_numero/?numerosolapin=${data.busqueda}`;
    this.cdr.detectChanges();
    this.search = true
  }

  donwloadListCiudadanos(form: FormGroup){
    const data = {
      ...form.value,
      busqueda: form.value.busqueda
    }

    const url = `${urlBack}operacionsolapin/exportar_csv/?numerosolapin=${data.busqueda}`
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
            a.download = `operacionsolapin_${data.busqueda}.csv`;
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

