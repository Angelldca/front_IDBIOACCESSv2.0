import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { ContainerComponent } from './container/container.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CiudadanoComponent,
    ContainerComponent,
    MenuPrincipalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'captura_datos';
}
