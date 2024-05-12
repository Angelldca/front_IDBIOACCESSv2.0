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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RolComponent } from './rol/rol.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { CruUsuarioComponent } from './cru-usuario/cru-usuario.component';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FechaAutenticacionComponent } from './fecha-autenticacion/fecha-autenticacion.component';
import { AccionesUsuariosComponent } from './acciones-usuarios/acciones-usuarios.component';
import { CasComponent } from './cas/cas.component';

export const routes: Routes = [

  { path: '', component: LandinPageComponent },
  { path: 'cas', component: CasComponent },
  { path: 'cas/:token', component: CasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ContainerComponent,
  canActivate:[authGuard],
  data: { expectedRoles: []},
  children: [
    {
      path: 'ciudadanosbash',
      providers:[], //CiudadanoService
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: PanelContenidoComponent, 
    },
    {
      path: 'ciudadano',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: CiudadanoComponent,
    },
    {
      path: 'ciudadano/:id',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: CiudadanoComponent,
    },
    {
      path: 'img_out',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: CiudanosCapturaImgComponent,
    },
    {
      path: 'ciudadanos_import',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: CiudadanosImportComponent,
    },
    {
      path: 'report_ciudadanos',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: ReportListCiudadanoComponent,
    },
    {
      path: 'report_historial_ciudadanos',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: ReportUserComponent,
    },
    {
      path: 'report_historial_fotos',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: ReportFotosComponent,
    }, {
      path: 'user',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: CruUsuarioComponent,
      
    },
    {
      path: 'registrar',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: RegistrarComponent,
      },
    {
      path: 'useredit/:id',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: UsermanageComponent,
    },
    {
      path: 'rol',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: RolListComponent,
    },
    {
      path: 'rol/create_rol',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: RolComponent,
    },
    {
      path: 'trazas/seccion',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: FechaAutenticacionComponent,
    },
    {
      path: 'trazas/accionesusuarios',
      canActivate:[authGuard],
      data: { expectedRoles: ['view_user']},
      component: AccionesUsuariosComponent,
    },
  
  ],
},
  { path: 'unauthorized', component: UnauthorizedComponent},
 { path: '**', component: NotFoundComponent }
];
