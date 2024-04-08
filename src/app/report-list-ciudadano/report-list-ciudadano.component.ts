import { Component } from '@angular/core';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
@Component({
  selector: 'app-report-list-ciudadano',
  standalone: true,
  imports: [CiudadanoTableComponent,
    MatIconModule,MatButtonModule,
    BuscarCiudadanoComponent,
    TomarFotoComponent
  
  ],
  providers: [CiudadanoService],
  templateUrl: './report-list-ciudadano.component.html',
  styleUrl: './report-list-ciudadano.component.css'
})
export class ReportListCiudadanoComponent {
  user = {
    entidad:"UCI"
  }
  userID:string| undefined| null;
  search:string| undefined;
  constructor(private ciudadanoService: CiudadanoService){}
  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
  getUserID(value: string|undefined|null){
     this.userID = value;

  }
  donwloadListCiudadanos(){
    const url = `http://127.0.0.1:8000/api/ciudadanoscsv/%7Bpk%7D/ciudadanos_entidad_csv/`
    const a = document.createElement('a');
    a.href = url
    a.download = 'nombre-del-archivo.csv'; // Asigna un nombre al archivo
    document.body.appendChild(a);

    // Inicia la descarga
    a.click();

    // Libera recursos
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    /*
    this.ciudadanoService.donwloadCiudadanoList(this.user.entidad).subscribe({
     next: data=>{
       console.log(data)
     },
     error: error => console.log(error), 
    })
   
    
    */
  }

}
