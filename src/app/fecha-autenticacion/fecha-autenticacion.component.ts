import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { urlBack } from '../Finals';
import { CiudadanoService, IUsuario } from '../ciudadano-table/ciudadano.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-fecha-autenticacion',
  standalone: true,
  imports: [],
  templateUrl: './fecha-autenticacion.component.html',
  styleUrl: './fecha-autenticacion.component.css'
})
export class FechaAutenticacionComponent implements OnInit{
  users: IUsuario[] = [];
  usersBuscar: IUsuario[] = [];
  textoBusqueda : string = ''
  
  constructor(private httpClient: HttpClient, private ciudadanoService: CiudadanoService, private router:Router){}
  
  
  ngOnInit(): void {
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
  donwloadListCiudadanos(){

    const url = `${urlBack}seguridad/user/user_autenticados_csv/`
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
            a.download = `inicios_seccion.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        });
  
  }
  
  }
  