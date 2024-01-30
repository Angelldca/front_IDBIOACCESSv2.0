import { Routes } from '@angular/router';
import { PanelContenidoComponent } from './panel-contenido/panel-contenido.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { CiudanosCapturaImgComponent } from './ciudanos-captura-img/ciudanos-captura-img.component';
import { CiudadanosImportComponent } from './ciudadanos-import/ciudadanos-import.component';

export const routes: Routes = [

  { path: 'buscar-ciudadano', component: PanelContenidoComponent },
  { path: 'ciudadano', component: CiudadanoComponent },
  { path: 'img-out', component: CiudanosCapturaImgComponent },
  { path: 'ciudadanos_import', component: CiudadanosImportComponent },
];
