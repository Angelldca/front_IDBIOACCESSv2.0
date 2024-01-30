import { Component } from '@angular/core';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import { BuscarCiudadanoComponent, Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';
import { TomarFotoComponent } from '../tomar-foto/tomar-foto.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
@Component({
  selector: 'app-ciudanos-captura-img',
  standalone: true,
  imports: [CiudadanoTableComponent,BuscarCiudadanoComponent,
     TomarFotoComponent,MatIconModule,MatButtonModule],
  providers:[CiudadanoService],
  templateUrl: './ciudanos-captura-img.component.html',
  styleUrl: './ciudanos-captura-img.component.css'
})
export class CiudanosCapturaImgComponent {
  
  userID:string| undefined| null;
  search:string| undefined;
constructor(private ciudadanoService: CiudadanoService ){

}
  getBusqueda(value:Busqueda){
    this.search =  JSON.stringify(value)
  }
  getUserID(value: string|undefined|null){
     this.userID = value;

  }
  exportCiudadanos_sin_img(){
    this.ciudadanoService.exportCiudadanos('http://127.0.0.1:8000/api/img/') .subscribe({
      next: data => {
        console.log(data)
      }, 
      error: error => console.log(error), 
    })
    console.log("Export")
  }
}
