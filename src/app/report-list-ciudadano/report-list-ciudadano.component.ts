import { Component } from '@angular/core';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
@Component({
  selector: 'app-report-list-ciudadano',
  standalone: true,
  imports: [CiudadanoTableComponent,MatIconModule,MatButtonModule,],
  providers: [CiudadanoService],
  templateUrl: './report-list-ciudadano.component.html',
  styleUrl: './report-list-ciudadano.component.css'
})
export class ReportListCiudadanoComponent {
  user = {
    entidad:"UCI"
  }
  constructor(private ciudadanoService: CiudadanoService){}

  donwloadListCiudadanos(){
    const url = `http://127.0.0.1:8000/api/ciudadanos/%7Bpk%7D/ciudadanos_entidad_csv/?entidad=${this.user.entidad}`
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
