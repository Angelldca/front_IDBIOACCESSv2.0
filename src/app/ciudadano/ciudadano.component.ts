import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import moment  from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


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
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule, ReactiveFormsModule],
  providers:[
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' }, 
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    CiudadanoService
  ],
  templateUrl: './ciudadano.component.html',
  styleUrl: './ciudadano.component.css'
})
export class CiudadanoComponent implements OnInit {
  constructor(private ciudadanoService :CiudadanoService,private route: ActivatedRoute){
    
  }
  idCiudadano: string = '';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCiudadano = params['id'];
    });
  }

  isLoggedIn=true;
 
  primernombre = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]);
  segundonombre = new FormControl('', [ Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]);
  primerapellido = new FormControl('', [Validators.required, 
    Validators.pattern(/^[a-zA-Z\s]+$/), 
  ]);
  segundoapellido = new FormControl('', [Validators.required, 
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
 /*
 solapin = new FormControl('', [Validators.required, 
   
    Validators.maxLength(7),
    Validators.minLength(7), 
  ]);
 */ 
  expediente = new FormControl('', [Validators.required, 
  ]);
  fecha = new FormControl('', [Validators.required, 
  ]);
  provincia = new FormControl('', [Validators.required, 
  ]);
  municipio = new FormControl('', [Validators.required, 
  ]);
  sexo = new FormControl('', [Validators.required, 
  ]);
  residente = new FormControl('', [Validators.required, 
  ]);
  ciudadanoForm = new FormGroup({
    primernombre:this.primernombre,
    segundonombre:this.segundonombre,
    primerapellido:this.primerapellido,
    segundoapellido:this.segundoapellido,
    carnetidentidad:this.dni,
    //solapin:this.solapin,
    idexpediente:this.expediente,
    area:this.area,
    fechanacimiento:this.fecha,
    roluniversitario:this.rolInst,
    provincia: this.provincia,
    municipio: this.municipio,
    sexo : this.sexo,
    residente: this.residente,


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
   
    let data  = {
      ...form.value,
     }
    if(data.fechanacimiento){
      data.fechanacimiento= moment(form.value.fechanacimiento).format('YYYY-MM-DD')
      
    }
    this.createCiudadano(data)
  }


  createCiudadano(data: any){
    
    this.ciudadanoService.createiudadano(data, this.idCiudadano).subscribe({
      next: data => {
        console.log(data)
        Swal.fire({
          title: "Ciudadano creado correctamente",
          text: `ciudadano: ${data.primernombre} ${data.primerapellido}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then(data=>{
            this.limpiarInputs();
          })
      }, // success path
      error: error => {
        let errorText =''
        for (const field in error.error) {
          if (error.error.hasOwnProperty(field)) {
            errorText += `${field}: ${error.error[field][0]}\n `;
            
          }
        }
        Swal.fire({
          title: 'Oops...',
          text: errorText,
          icon: 'error',
          footer: `${error.statusText} error ${error.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'btn btn-primary px-4'
          },
          buttonsStyling: false,
          })
       
      }, // error path
    })
  }

  limpiarInputs(){
    this.primernombre.reset();
    this.segundonombre.reset();
    this.primerapellido.reset();
    this.segundoapellido.reset();
    this.municipio.reset();
    this.provincia.reset();
    this.sexo.reset();

    this.dni.reset();
   
    this.expediente.reset();
    this.area.reset();
    this.rolInst.reset();
    this.fecha.reset();
    this.residente.reset();
  }
}
