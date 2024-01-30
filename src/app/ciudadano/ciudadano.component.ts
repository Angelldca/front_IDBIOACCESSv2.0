import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import moment  from 'moment';


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
  selector: 'app-ciudadano',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatDatepickerModule,FormsModule, ReactiveFormsModule],
  providers:[
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    CiudadanoService
  ],
  templateUrl: './ciudadano.component.html',
  styleUrl: './ciudadano.component.css'
})
export class CiudadanoComponent {
  constructor(private ciudadanoService :CiudadanoService){}
  
  ciudadano = {
    "id": 20,
      "nombre": "Eitan",
      "apellidos": "Izquierdo",
      "dni": "85441203079",
      "solapin": "E547667",
      "expediente": 545434,
      "fecha_nacimiento": "1998-11-23",
      "edad": 67,
      "rol_institucional": "Trabajador",
      "rol_sistema":"Administrador General",
      "area": "Comedor",
      "img":null,
      "entidad": "UCI",
      "created_At": "2024-01-20"

  }
  isLoggedIn=true;
 
  nombre = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]);
  apellidos = new FormControl('', [Validators.required, 
    Validators.pattern(/^[a-zA-Z\s]+$/), 
  ]);
  rolInst = new FormControl('', 
   [Validators.required, 
    Validators.pattern(/^[a-zA-Z\s]+$/), 
  ]);
  area = new FormControl('', 
  [Validators.required, 
    
 ]);
  dni = new FormControl('', [Validators.required, 
    Validators.pattern(/^\d+$/), 
    Validators.maxLength(11),
    Validators.minLength(11)
  ]);
  solapin = new FormControl('', [Validators.required, 
   
    Validators.maxLength(7),
    Validators.minLength(7), 
  ]);
  expediente = new FormControl('', [Validators.required, 
  ]);
  fecha = new FormControl('', [Validators.required, 
  ]);
  ciudadanoForm = new FormGroup({
    nombre:this.nombre,
    apellidos:this.apellidos,
    dni:this.dni,
    solapin:this.solapin,
    expediente:this.expediente,
    area:this.area,
    fecha_nacimiento:this.fecha,
    rol_institucional:this.rolInst

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
   
    const data = {...form.value,
      fecha_nacimiento: moment(form.value.fecha_nacimiento).format('YYYY-MM-DD'),
      entidad:this.ciudadano.entidad,
      edad: this.edadCalcular(form.value.fecha_nacimiento)
      
    }
    for(let e in data){
      if (data[e].length <= 0 ){
        console.log(e, "  Datos incompletos")
        return;
      }
    }
    
    this.createCiudadano(data)
  }
  edadCalcular(fechaNacimiento:Date):any{
    if (fechaNacimiento) {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const hoy = new Date();
  
      // Calcula la diferencia en años
      let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
  
      // Ajusta la edad si aún no ha cumplido años en el año actual
      if (hoy.getMonth() < fechaNacimientoDate.getMonth() ||
          (hoy.getMonth() === fechaNacimientoDate.getMonth() && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
      }
  
     return edad
    }
  }

  createCiudadano(data: any){
    this.ciudadanoService.createiudadano(data).subscribe({
      next: data => {
        console.log(data)
      }, // success path
      error: error => {
        console.log(error.error)
      }, // error path
    })
  }
}
