import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { urlBack } from '../Finals';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  selector: 'app-acciones-usuarios',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, 
    MatDatepickerModule,ReactiveFormsModule,
    MatButtonModule,
    CiudadanoTableComponent,
    MatIconModule,
    FormsModule,
    ],
    providers:[
      provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }, 
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
      
      HttpClient
    
    ],
  templateUrl: './acciones-usuarios.component.html',
  styleUrl: './acciones-usuarios.component.css'
})
export class AccionesUsuariosComponent implements OnInit {
  users: IUsuario[] = [];
  usersBuscar: IUsuario[] = [];
  textoBusqueda : string = ''
  usuario: IUsuario| null = null
  logs : any = [];
  rango = false;
  constructor(private httpClient: HttpClient, private ciudadanoService: CiudadanoService, private router:Router){}
  
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
         this.rango = false;
         return;
       }
     }
     const urlCiudadanos =
     `${urlBack}ciudadano/ciudadanos_rangoFecha/?fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`;
     //this.cdr.detectChanges();
     this.rango = true
     this.ciudadanoService.getUsers(urlBack+
      `seguridad/trazas/historial_usuario/?userid=${this.usuario?.id}&fecha_inicio=
      ${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`).subscribe({
      next: data => {
        console.log(data)
        this.logs = data
      },
      error: error => {
        console.log(error)
      },
    })
    
   }

  ngOnInit(): void {
    this.usuario = null;
    this.ciudadanoService.getUsers(urlBack+'seguridad/user/user_autenticados/').subscribe({
      next: data => {
        
        this.users = data
        
        this.usersBuscar = [...this.users]
      },
      error: error => {
        console.log(error)
      },
    })
  }
  buscarUser(event:any){
    this.textoBusqueda = event.target.value
    this.users = []
    this.usersBuscar.forEach(user => {
      if (user.username.toLowerCase().includes(this.textoBusqueda.toLowerCase())) {
          this.users.push(user);
      }
    });
  
  }

  undo(){
    this.logs = []
    this.usuario = null
  }

  donwloadListLogs(id: any){
    const data = {
      ...this.ciudadanoForm.value,
      fecha_inicio: moment(this.ciudadanoForm.value.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: moment(this.ciudadanoForm.value.fecha_fin).format('YYYY-MM-DD')
    }
    
    const url = `${urlBack}seguridad/trazas/historial_usuario_csv/?userid=${id}&fecha_inicio=${data.fecha_inicio}&fecha_fin=${data.fecha_fin}`
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
            a.download = `registros_de_acciones.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        });
  }
  viewAcciones(user: IUsuario){
    this.usuario = user;
 
  }
}
