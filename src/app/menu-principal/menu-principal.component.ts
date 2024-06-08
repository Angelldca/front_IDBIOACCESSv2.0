import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule ,MatCheckboxModule,
    FormsModule, MatButtonModule,MatIconModule, 
    RouterLink, RouterOutlet],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
  shouldRun = true;
  events: string[] = [];
  opened: boolean = false;
  isReportesCapturaVisible = false;
  isCapturaDatosVisible = false;
  isSeguridadVisible = false;
  isReporteSeguridadVisible = false;
  isGestionSolapinVisible = false;

  showSubmenu(elements: string) {
    switch (elements){
      case 'captura_datos':
        this.isCapturaDatosVisible = !this.isCapturaDatosVisible;
        break;
      case 'reporte_captura_datos':
        this.isReportesCapturaVisible = !this.isReportesCapturaVisible;
        break;
      case 'seguridad':
        this.isSeguridadVisible = !this.isSeguridadVisible;
        break;
      case 'seguridadReportes':
          this.isReporteSeguridadVisible = !this.isReporteSeguridadVisible;
          break;
      case 'gestion_solapin':
          this.isGestionSolapinVisible = !this.isGestionSolapinVisible;
          break;
    }
    
  }

  hideSubmenu(elements: string) {
    switch (elements){
      case 'captura_datos':
        this.isCapturaDatosVisible = false;
        break;
      case 'reporte_captura_datos':
        this.isReportesCapturaVisible = false;
        break;
      case 'seguridad':
          this.isSeguridadVisible = false;
          break;
      case 'seguridadReportes':
            this.isReporteSeguridadVisible = false;
            break;
      case 'gestion_solapin':
            this.isGestionSolapinVisible = false;
            break;

    }
  }
  }
