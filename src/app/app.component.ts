import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CiudadanoComponent,ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'captura_datos';
}
