import { Component } from '@angular/core';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-ciudanos-captura-img',
  standalone: true,
  imports: [CiudadanoTableComponent,BuscarCiudadanoComponent,
     TomarFotoComponent,MatIconModule,MatButtonModule],
  providers:[],
  templateUrl: './ciudanos-captura-img.component.html',
  styleUrl: './ciudanos-captura-img.component.css'
})
export class CiudanosCapturaImgComponent {
  urlList = urlBack+'ciudadano/ciudadanos_sin_img/'
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
  exportCiudadanos_sin_img(){
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${urlBack}ciudadanoscsv/ciudadanossinimg_csv/`;

    // Realiza la solicitud HTTP con los encabezados
    this.http.get(url, { headers, responseType: 'blob' }).subscribe(response => {
      
      const blob = new Blob([response], { type: 'text/csv' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'lista_ciudadanos_sin_img.csv';
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
