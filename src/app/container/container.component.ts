import { Component } from '@angular/core';

import { PanelContenidoComponent } from '../panel-contenido/panel-contenido.component';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';

@Component({
  selector: 'app-containerCD',
  standalone: true,
  imports: [
    PanelContenidoComponent,
    RouterOutlet,EncabezadoComponent,
    PiePaginaComponent, MenuPrincipalComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {


}
