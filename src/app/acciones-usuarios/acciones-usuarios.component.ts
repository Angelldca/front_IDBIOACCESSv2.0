import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { urlBack } from '../Finals';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-acciones-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './acciones-usuarios.component.html',
  styleUrl: './acciones-usuarios.component.css'
})
export class AccionesUsuariosComponent implements OnInit {
  users: IUsuario[] = [];
  usersBuscar: IUsuario[] = [];
  textoBusqueda : string = ''
  usuario: IUsuario| null = null
  logs : any = [];
  constructor(private httpClient: HttpClient, private ciudadanoService: CiudadanoService, private router:Router){}
  
  
  ngOnInit(): void {
    this.usuario = null;
    this.ciudadanoService.getUsers(urlBack+'seguridad/user/user_autenticados/').subscribe({
      next: data => {
        console.log(data)
        this.users = data
        
        this.usersBuscar = [...this.users]
      },
      error: error => {
        console.log(error)
      },
    })
  }
  buscarUser(event:any){
    this.textoBusqueda = event.target.value
    this.users = []
    this.usersBuscar.forEach(user => {
      if (user.username.toLowerCase().includes(this.textoBusqueda.toLowerCase())) {
          this.users.push(user);
      }
    });
  
  }

  undo(){
    this.logs = []
    this.usuario = null
  }

  donwloadListLogs(id: any){
    
    const url = `${urlBack}seguridad/trazas/historial_usuario/?userid=${id}`
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    
    this.httpClient.get(url, { responseType: 'blob',headers: headers })
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
            })
        )
        .subscribe((response: Blob) => {
            const blob = new Blob([response], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `registros_de_acciones.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        });
  }
  viewAcciones(user: IUsuario){
    this.usuario = user;
    this.ciudadanoService.getUsers(urlBack+`seguridad/trazas/historial_usuario/?userid=${user.id}`).subscribe({
      next: data => {
        console.log(data)
        this.logs = data
      },
      error: error => {
        console.log(error)
      },
    })
  }
}
