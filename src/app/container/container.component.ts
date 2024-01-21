import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { PanelContenidoComponent } from '../panel-contenido/panel-contenido.component';

@Component({
  selector: 'app-containerCD',
  standalone: true,
  imports: [MenuComponent,PanelContenidoComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  todo = "design"

}
