import { Component, OnInit } from '@angular/core';
import { CiudadanoService, IUserLog, IResp } from '../ciudadano-table/ciudadano.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {urlBack} from '../Finals'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[CiudadanoService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  mostrarMensaje = true;
  mostrarContrasena=true;

  userForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });

  constructor( private ciudadanoService: CiudadanoService, private router: Router ) {

  }


  
  onInput1(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }

  onInput2(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarContrasena = false;
    } else {
      this.mostrarContrasena = true;
    }
  }
  onSubmit(){
    this.loginCiudadano(this.userForm.value);
  }
  loginCiudadano(data: any){
    this.ciudadanoService.loginCiudadano(data, urlBack+'seguridad/login/' ).subscribe({
      next: data => { 
        this.ciudadanoService.setUser(data.user) 
        localStorage.setItem('Token', data.token);  
        if(data.user.permissions.length > 0 && data.user.roles.length > 0)
          this.router.navigate(['home'],{ state: { user: data.user } });
        else
          this.router.navigate(['landingpage'],{ state: { user: data.user } });
        }, 
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Oops...',
          text: error.error.error,
          icon: 'error',
          footer: `${error.statusText} error ${error.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success px-4',
          },
          buttonsStyling: true,
          })
       
      }, // error path
    })
  }
  limpiarInputs(){
    console.log("Acuerdate de limpiar los inputs")
  }
}
