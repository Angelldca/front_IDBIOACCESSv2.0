import { Routes } from '@angular/router';
import { PanelContenidoComponent } from './panel-contenido/panel-contenido.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { CiudanosCapturaImgComponent } from './ciudanos-captura-img/ciudanos-captura-img.component';
import { CiudadanosImportComponent } from './ciudadanos-import/ciudadanos-import.component';
import { ReportFotosComponent } from './report-fotos/report-fotos.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { ReportListCiudadanoComponent } from './report-list-ciudadano/report-list-ciudadano.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LandinPageComponent } from './landin-page/landin-page.component';
import { ContainerComponent } from './container/container.component';
import { authGuard } from './guard/auth.guard';
import { CiudadanoService } from './ciudadano-table/ciudadano.service';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'landingpage', component: LandinPageComponent },
  { path: 'home', component: ContainerComponent,
  children: [
    {
      path: 'ciudadanosbash',
      providers:[CiudadanoService],
      canActivate:[authGuard],
      data: { requiredPermissions: ['add_dimagenfacial', 'delete_user'] },
      component: PanelContenidoComponent, 
    },
    {
      path: 'ciudadano',
      component: CiudadanoComponent,
    },
    {
      path: 'ciudadano/:id',
      component: CiudadanoComponent,
    },
    {
      path: 'img_out',
      component: CiudanosCapturaImgComponent,
    },
    {
      path: 'ciudadanos_import',
      component: CiudadanosImportComponent,
    },
    {
      path: 'report_ciudadanos',
      component: ReportListCiudadanoComponent,
    },
    {
      path: 'report_historial_ciudadanos',
     
      component: ReportUserComponent,
    },
    {
      path: 'report_historial_fotos',
      component: ReportFotosComponent,
    },
  
  ],
},
  ///{ path: '**', component: <h4> Usuario sin autorizacion <h4/>}
 //{ path: '**', component: UnauthorizedComponent }
];
