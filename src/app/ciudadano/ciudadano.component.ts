import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Ciudadano, CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import moment  from 'moment';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


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
    
  ],
  templateUrl: './ciudadano.component.html',
  styleUrl: './ciudadano.component.css'
})
export class CiudadanoComponent implements OnInit {

  user: Ciudadano|null = null
  
  constructor(private ciudadanoService :CiudadanoService,
    private route: ActivatedRoute, private router: Router){

  }
  idpersona: string = '';
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.idpersona = params['id'];
    });
    this.user = history.state.user;
    if(this.user){
      console.log(this.user)
      this.primernombre.setValue(this.user.primernombre)
      this.segundonombre.setValue(this.user.segundonombre)
      this.primerapellido.setValue(this.user.primerapellido)
      this.segundoapellido.setValue(this.user.segundoapellido)
      this.dni.setValue(this.user.carnetidentidad)
      this.expediente.setValue(this.user.idexpediente)
      this.area.setValue(this.user.identificadorarea)
      this.rolInst.setValue(this.user.identificadorroluni)
      this.sexo.setValue(this.user.sexo)
      this.provincia.setValue(this.user.provincia)
      this.municipio.setValue(this.user.municipio)
      this.residente.setValue(`${this.user.residente}`)
      this.fecha.setValue(this.user.fechanacimiento)
      
      
    }
    
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
  residente = new FormControl("false", [Validators.required, 
  ]);
  ciudadanoForm = new FormGroup({
    primernombre:this.primernombre,
    segundonombre:this.segundonombre,
    primerapellido:this.primerapellido,
    segundoapellido:this.segundoapellido,
    carnetidentidad:this.dni,
    //solapin:this.solapin,
    idexpediente:this.expediente,
    identificadorarea:this.area,
    fechanacimiento:this.fecha,
    identificadorroluni:this.rolInst,
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

    return element.hasError('pattern') ? `El contenido no es válido "${element.value}"` : '';
  }

  onSubmit(form: FormGroup){
   if(form.valid){
     let data  = {
       ...form.value,
      }
     
     if(data.fechanacimiento){
       data.fechanacimiento= moment(form.value.fechanacimiento).format('YYYY-MM-DD')
       
     }
     this.createCiudadano(data)

   }else{
    console.log(form.getError)
   }
  }


  createCiudadano(data: any){

    this.ciudadanoService.createiudadano(data, this.idpersona).subscribe({
      next: data => {
        
        Swal.fire({
          title: "Ciudadano creado/modificado correctamente",
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
            //this.limpiarInputs();
            this.router.navigate([`home/ciudadanosbash/`]);
          })
      }, // success path
      error: error => {
        console.log(error)
        let errorText =''
        for (const field in error.error) {
          if (error.error.hasOwnProperty(field)) {
            errorText += `${field}: ${error.error[field][0]}\n `;
            
          }
        }
        Swal.fire({
          title: 'Oops...',
          text: error.error,
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
