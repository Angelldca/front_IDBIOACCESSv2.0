import { Component } from '@angular/core';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
import { CiudadanobashComponent } from '../ciudadanobash/ciudadanobash.component';
import { CiudadanobashTableComponent } from '../ciudadanobash-table/ciudadanobash-table.component';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';

@Component({
  selector: 'app-panel-contenido-cd',
  standalone: true,
  imports: [BuscarCiudadanoComponent, CiudadanoTableComponent,
    TomarFotoComponent,
    CiudadanobashTableComponent,
    CiudadanoTableComponent,
  
  ],providers:[],
  templateUrl: './panel-contenido.component.html',
  styleUrl: './panel-contenido.component.css'
})
export class PanelContenidoComponent {
  userID:string| undefined| null;
  search:string| undefined;
  urlList = urlBack+'ciudadanobash/ciudadanosbash_sin_img/'
  constructor( ){
    
  }

  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
  getUserID(value: string|undefined|null){
     this.userID = value;

  }
}
