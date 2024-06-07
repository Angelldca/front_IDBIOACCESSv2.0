import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [EncabezadoComponent,PiePaginaComponent, LoginComponent],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.css'
})
export class LandinPageComponent implements OnInit{
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
           if(userL.permissions.length > 0 || userL.roles.length > 0)
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
}
