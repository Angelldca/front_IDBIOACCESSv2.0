import { Component } from '@angular/core';

import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';

@Component({
  selector: 'app-landin-page-not-permisos',
  standalone: true,
  imports: [ PiePaginaComponent, EncabezadoComponent],
  templateUrl: './landin-page-not-permisos.component.html',
  styleUrl: './landin-page-not-permisos.component.css'
})
export class LandinPageNotPermisosComponent {

}
