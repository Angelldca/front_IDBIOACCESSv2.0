import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { ContainerComponent } from './container/container.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LandinPageComponent } from './landin-page/landin-page.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { CruUsuarioComponent } from './cru-usuario/cru-usuario.component';
import { CiudadanoService } from './ciudadano-table/ciudadano.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CiudadanoComponent,
    ContainerComponent,
    MenuPrincipalComponent,
    LoginComponent,
    RegistrarComponent,
    LandinPageComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    CruUsuarioComponent,
  ],
  providers:[CiudadanoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'captura_datos';
  constructor(private ciudadanoService: CiudadanoService){}
}
