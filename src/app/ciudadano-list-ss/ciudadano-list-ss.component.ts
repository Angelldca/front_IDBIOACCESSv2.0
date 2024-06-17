import { Component } from '@angular/core';
import { TableGenerarSolapinComponent } from '../table-generar-solapin/table-generar-solapin.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlBack } from '../Finals';

@Component({
  selector: 'ciudadano-list-ss',
  standalone: true,
  imports: [TableGenerarSolapinComponent,
    MatIconModule,MatButtonModule,
    BuscarCiudadanoComponent,
    TomarFotoComponent
  ],
  providers: [],
  templateUrl: './ciudadano-list-ss.component.html',
  styleUrl: './ciudadano-list-ss.component.css'
})
export class CiudadanoListSSComponent {
  user = {
    entidad:"UCI"
  }

  urlList: string = urlBack + 'ciudadanoss/'
  userID: string | undefined | null;
  search: string | undefined;

  constructor(private ciudadanoService: CiudadanoService, private http: HttpClient){}
  
  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
  getUserID(value: string|undefined|null){
     this.userID = value;
  }

  donwloadListCiudadanos(){
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${urlBack}ciudadanoscsv/ciudadanos_entidad_csv/`;

    // Realiza la solicitud HTTP con los encabezados
    this.http.get(url, { headers, responseType: 'blob' }).subscribe(response => {
      
      // Crea un objeto Blob con la respuesta y crea un enlace para descargar el archivo
      const blob = new Blob([response], { type: 'text/csv' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'lista_ciudadanos.csv';
      document.body.appendChild(a);

      // Inicia la descarga
      a.click();

      // Libera recursos
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
  }

}
