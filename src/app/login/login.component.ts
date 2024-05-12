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
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  mostrarMensaje = true;
  mostrarContrasena=true;

  userForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });

  constructor( private ciudadanoService: CiudadanoService, private router: Router )  {

  }

  ngOnInit(): void {
       const token = localStorage.getItem('Token')
       const userLog = localStorage.getItem('user')
       const route = this.router
       if(userLog && token){
        let userL = JSON.parse(userLog)
           this.ciudadanoService.validateToken(token).subscribe({
            next(data) {
              if(userL.permissions.length > 0 || userL.roles.length > 0 || userL.is_superuser)
              route.navigate(['home'],{ state: { user: userL } });
             else
              route.navigate([''],{ state: { user: userL } });
            },
            error(err) {
              console.log("Token invalid or expired")
            },
          })
        }

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
        console.log(data)
        this.ciudadanoService.setUser(data.user) 
        localStorage.setItem('Token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if(data.user.permissions.length > 0 || data.user.roles.length > 0 || data.user.is_superuser)
          this.router.navigate(['home'],{ state: { user: data.user } });
        else{
          //this.router.navigate([''],{ state: { user: data.user } });
          Swal.fire({
            title: 'Oops...',
            text: "Usuario sin autorización",
            icon: 'info',
            footer: `Póngase en contacto con el administrador`,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-success px-4',
            },
            buttonsStyling: true,
            })
        }
        }, 
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Oops...',
          text: error.error.non_field_errors[0],
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

  loginCass(){
    window.location.href = 'http://localhost:8000/accounts/login'
  }
}
