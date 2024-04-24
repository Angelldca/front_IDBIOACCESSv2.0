import { Component, OnInit } from '@angular/core';
import { RegistrarComponent } from '../registrar/registrar.component';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';
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

constructor(private ciudadanoService: CiudadanoService){}


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

}
