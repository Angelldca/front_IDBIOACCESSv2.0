import { Component } from '@angular/core';
import { urlBack } from '../Finals';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CiudadanoHuellaTableComponent } from '../ciudadano-huella-table/ciudadano-huella-table.component';
@Component({
  selector: 'app-captura-huellas',
  standalone: true,
  imports: [CiudadanoHuellaTableComponent,BuscarCiudadanoComponent,
    TomarFotoComponent,MatIconModule,MatButtonModule],
  templateUrl: './captura-huellas.component.html',
  styleUrl: './captura-huellas.component.css'
})
export class CapturaHuellasComponent {
  urlList = urlBack+'ciudadano/ciudadanos_sin_huella/'
  userID:string| undefined| null;
  search:string| undefined;
constructor(private ciudadanoService: CiudadanoService,private http: HttpClient ){

}
  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
  getUserID(value: string|undefined|null){
     this.userID = value;

  }
  exportCiudadanos_sin_huella(){
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${urlBack}ciudadanoscsv/ciudadanossinhuellas_csv/`;

    // Realiza la solicitud HTTP con los encabezados
    this.http.get(url, { headers, responseType: 'blob' }).subscribe(response => {
      
      const blob = new Blob([response], { type: 'text/csv' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'lista_ciudadanos_sin_huella.csv';
      document.body.appendChild(a);

      
      a.click();

      // Libera recursos
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
    
  }
}
