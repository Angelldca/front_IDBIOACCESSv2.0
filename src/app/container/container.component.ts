import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { PanelContenidoComponent } from '../panel-contenido/panel-contenido.component';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';

@Component({
  selector: 'app-containerCD',
  standalone: true,
  imports: [MenuComponent,
    PanelContenidoComponent,
    RouterOutlet,EncabezadoComponent,
    PiePaginaComponent, MenuPrincipalComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {


}
