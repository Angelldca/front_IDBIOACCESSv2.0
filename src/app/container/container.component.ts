import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { PanelContenidoComponent } from '../panel-contenido/panel-contenido.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-containerCD',
  standalone: true,
  imports: [MenuComponent,PanelContenidoComponent,RouterOutlet],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  todo = "design"

}
