import { Component } from '@angular/core';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';

@Component({
  selector: 'app-panel-contenido-cd',
  standalone: true,
  imports: [BuscarCiudadanoComponent, CiudadanoTableComponent,TomarFotoComponent],
  templateUrl: './panel-contenido.component.html',
  styleUrl: './panel-contenido.component.css'
})
export class PanelContenidoComponent {
  userID:string| undefined;
  search:string| undefined;

  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
}
