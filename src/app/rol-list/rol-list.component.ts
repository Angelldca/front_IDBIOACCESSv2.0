import { Component, OnInit } from '@angular/core';

import { Router, RouterLink ,RouterOutlet} from '@angular/router';
import { CiudadanoService, IRol } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './rol-list.component.html',
  styleUrl: './rol-list.component.css'
})
export class RolListComponent implements OnInit {
roles: IRol[] = [];
rolesBuscar: IRol[] = [];
textoBusquedaRol : string = ''
constructor(private ciudadanoService: CiudadanoService,private router: Router){}

ngOnInit(): void {
   this.ciudadanoService.getAllRol(urlBack+'seguridad/rol/').subscribe({
    next: data => {
      this.roles = data
      this.rolesBuscar = [...this.roles]
    },
    error: error => {
      console.log(error)
    },
  })
}
buscarRoll(event:any){
  this.textoBusquedaRol = event.target.value
  this.roles = []
  this.rolesBuscar.forEach(rol => {
    if (rol.name.toLowerCase().includes(this.textoBusquedaRol.toLowerCase())) {
        this.roles.push(rol);
    }
  });

}
manageRol(rol:IRol){

this.router.navigate(['/home/rol/create_rol'],{ state: { rol } });
}

}
