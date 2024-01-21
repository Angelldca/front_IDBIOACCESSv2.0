import { Component } from '@angular/core';
import { BuscarCiudadanoComponent } from '../buscar-ciudadano/buscar-ciudadano.component';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';

@Component({
  selector: 'app-panel-contenido-cd',
  standalone: true,
  imports: [BuscarCiudadanoComponent, CiudadanoTableComponent],
  templateUrl: './panel-contenido.component.html',
  styleUrl: './panel-contenido.component.css'
})
export class PanelContenidoComponent {

}
