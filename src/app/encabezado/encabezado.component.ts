import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  providers: [CiudadanoService],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
 username: string| null ="username"
 user: IUsuario|null = null
 constructor(private ciudadanoService: CiudadanoService, private router: Router){
  const navigation = this.router.getCurrentNavigation();
  if (navigation && navigation.extras && navigation.extras.state) {
    this.user = navigation.extras.state['user'];
    if( this.user != null)
    this.username = this.user.username;
 }else{
  this.router.navigate(['']);
 }
}


logOut(){
  this.user=null;
  this.username =null;
  this.router.navigate(['']);
  console.log("Click")
  this.ciudadanoService.logOut();
}

}