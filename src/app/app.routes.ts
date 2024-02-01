import { Routes } from '@angular/router';
import { PanelContenidoComponent } from './panel-contenido/panel-contenido.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { CiudanosCapturaImgComponent } from './ciudanos-captura-img/ciudanos-captura-img.component';
import { CiudadanosImportComponent } from './ciudadanos-import/ciudadanos-import.component';
import { ReportFotosComponent } from './report-fotos/report-fotos.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { ReportListCiudadanoComponent } from './report-list-ciudadano/report-list-ciudadano.component';

export const routes: Routes = [

  { path: 'buscar-ciudadano', component: PanelContenidoComponent },
  { path: 'ciudadano', component: CiudadanoComponent },
  { path: 'img-out', component: CiudanosCapturaImgComponent },
  { path: 'ciudadanos_import', component: CiudadanosImportComponent },
  { path: 'report_ciudadanos', component: ReportListCiudadanoComponent },
  { path: 'report_historial_ciudadanos', component: ReportUserComponent },
  { path: 'report_historial_fotos', component: ReportFotosComponent },
];
