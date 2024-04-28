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

  nombre = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]);
  apellido = new FormControl('', [Validators.required, 
    Validators.pattern(/^[a-zA-Z\s]+$/), 
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);

  username = new FormControl('', [Validators.required, 
  ]);
  password = new FormControl('', [Validators.required,
  ])
  confirm_password = new FormControl('', [Validators.required, 
  ])
  formInfoPersonal = new FormGroup({
    first_name:this.nombre,
    username: this.username,
    last_name:this.apellido,
    email: this.email,
    password: this.password,
  });

  onSubmitInformations(form: FormGroup){
    let data  = {
      ...form.value,
     }
     console.log(data)
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
      
          Swal.fire({
            title: 'Oops...',
            text: error,
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
     
 
      
     
  }


}
