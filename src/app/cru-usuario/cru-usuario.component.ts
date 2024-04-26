import { Component, OnInit } from '@angular/core';
import { RegistrarComponent } from '../registrar/registrar.component';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
@Component({
  selector: 'app-cru-usuario',
  standalone: true,
  imports: [RegistrarComponent],
  templateUrl: './cru-usuario.component.html',
  styleUrl: './cru-usuario.component.css'
})
export class CruUsuarioComponent implements OnInit{
users: IUsuario[] = [];
usersBuscar: IUsuario[] = [];
textoBusqueda : string = ''

constructor(private ciudadanoService: CiudadanoService, private router:Router){}


ngOnInit(): void {
  this.ciudadanoService.getUsers(urlBack+'seguridad/user/').subscribe({
    next: data => {
      console.log(data)
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

userDelete(user: IUsuario){
  if(user.id == this.ciudadanoService.userAuth?.id){
    Swal.fire({
      title: 'Oops...',
      text: 'El usuario autenticado no se puede eliminar',
      icon: 'error',
      footer: `Eliminar usuario`,
      confirmButtonText: 'Aceptar',
      customClass: {
          confirmButton: 'btn btn-primary px-4'
      },
      buttonsStyling: false,
      })
  }else{
    this.ciudadanoService.delete(urlBack+`seguridad/user/${user.id}/`).subscribe({
      next: data => {
        
        Swal.fire({
          title: "Usuario eliminado correctamente",
          text: `Usuario : ${user.username}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then(data=>{
            this.router.navigate(['/home/user/']);
            
          
          })
      }, // success path
      error: error => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error',
          footer: `${error.error.name} error ${error.status}`,
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
userEdit(user:IUsuario){
  this.router.navigate([`/home/useredit/${user.id}`],{state:{user}});
 }


}
