import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import Swal from 'sweetalert2';
import { urlBack } from '../Finals';
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
constructor(private router: Router, private ciudadanoService: CiudadanoService){

}

  nombre = new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚ][a-záéíóú]*(\s[A-ZÁÉÍÓÚ][a-záéíóú]*)*$/)]);
  apellido = new FormControl('', [Validators.required, 
    Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/), 
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);

  username = new FormControl('', [Validators.required,Validators.pattern(/^[a-z]+$/)
  ]);
  password = new FormControl('', 
  [Validators.required,Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ])
  confirm_password = new FormControl('', [Validators.required, 
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ])
  formInfoPersonal = new FormGroup({
    first_name:this.nombre,
    username: this.username,
    last_name:this.apellido,
    email: this.email,
    password: this.password,
  });
  getErrorMessage(element:FormControl, fieldName: string) {
  
    if (element.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (element.hasError('email')) {
      return 'El correo no es válido';
    }
    if (element.hasError('maxlength') || element.hasError('minlength') ) {
      return 'Longitud incorrecta';
    }
  
    if (element.hasError('pattern')) {
      if (fieldName === 'password') {
        return 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.';
      }
      return `El contenido no es válido "${element.value}"`;
    }
    return `El contenido no es válido "${element.value}"`;
  }
  onSubmitInformations(form: FormGroup){
    let data  = {
      ...form.value,
     }
 
     if(data.password !== this.confirm_password.value){
      Swal.fire({
        title: 'Oops...',
        text: 'La contraseña deben coincidir',
        icon: 'error',
        footer: `Datos invalidos`,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'btn btn-primary px-4'
        },
        buttonsStyling: false,
        })
     }else{
      this.ciudadanoService.createUser(urlBack+`seguridad/user/`,data).subscribe({
        next: data => {
          console.log(data)
          Swal.fire({
            title: "Usuario creado exitosamente",
            text: `Usuario: ${data.first_name}`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
            
            },
            }).then(data=>{
              this.router.navigate(['home/user']);
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
            text: errorText,
            icon: 'error',
            footer: ``,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary px-4'
            },
            buttonsStyling: false,
            })
         
        }, // error path
      })
     }
     
 
      
     
  }


}
