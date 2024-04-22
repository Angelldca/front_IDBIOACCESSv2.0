import { Component } from '@angular/core';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [EncabezadoComponent,PiePaginaComponent],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.css'
})
export class LandinPageComponent {

}
