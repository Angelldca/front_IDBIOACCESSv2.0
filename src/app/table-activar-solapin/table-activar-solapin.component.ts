import { Component,AfterViewInit, ViewChild, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { CiudadanoService, Ciudadano } from '../ciudadano-table/ciudadano.service';
import { ActivarSolapinComponent } from '../activar-solapin/activar-solapin.component';

import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { urlBack } from '../Finals';




@Component({
  selector: 'table-activar-solapin',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTooltipModule,
    MatIconModule,MatButtonModule,
  ],
  providers:[CiudadanoService],
  templateUrl: './table-activar-solapin.component.html',
  styleUrl: './table-activar-solapin.component.css'
})


export class TableActivarSolapinComponent implements AfterViewInit ,OnInit,OnChanges  {
  @Input() buscar:string|undefined;
  @Input() urlCiudadanos:string|undefined;
  @Output() newUserIDEvent = new EventEmitter<string>();
  constructor(private ciudadanoService :CiudadanoService,public dialog: MatDialog, private router: Router){

  }
  addNewUserID(value: string) {
    this.newUserIDEvent.emit(value);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.buscar !== undefined && this.buscar !==''){
      const obj =JSON.parse(this.buscar)
      let value ='';
      let atributo='';
      for (let key in obj){
        if(obj[key].length > 0){
          value  = obj[key]
          atributo = key
         break;
        }
      }
      if( this.urlCiudadanos !== undefined){
        const urlFind = `${this.urlCiudadanos}?${atributo}=${value}`
        this.showCiudadanos(urlFind)
      }else{
        const urlFind = `${urlBack}ciudadanoas/?${atributo}=${value}`
        this.showCiudadanos(urlFind)

      }
    }
  }

  displayedColumns: string[] = ['id',
  'opciones',
  'img','primernombre','segundonombre', 'primerapellido','segundoapellido', 'area', 
  'roluniversitario', 'carnetidentidad', 'solapin', 'provincia','municipio',
  'sexo','residente','idexpediente','fechanacimiento'];
  ciudadanos: Ciudadano[] | undefined;
  ELEMENT_DATA: Ciudadano[] = [];
  dataSource = new MatTableDataSource<Ciudadano>(this.ELEMENT_DATA);
  user = { ////Poner usuario autenticado
    entidad :"UCI"
  }
  url:string = `${urlBack}ciudadanoas/`
  urlNext:string = `${urlBack}ciudadanoas/`
  urlPrevious:string = `${urlBack}ciudadanoas/`
  count:Number = 5
  page_size = 6
  ciudadano:Ciudadano | undefined
  
  error: any;
  headers: string[] = [];
  clear() {
    this.ciudadano = undefined;
    this.error = undefined;
    this.headers = [];
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  showCiudadanos(url:string) {
    this.ciudadanoService.getCiudadano_pagination(url)
      .subscribe({
        next: data => {
          console.log(data)
          if(data.results.length> 0){
            this.ciudadanos = data.results
            this.ciudadanos.forEach(c => c.editMode = false)
            this.ELEMENT_DATA = this.ciudadanos
            this.dataSource.data = this.ELEMENT_DATA;
            this.url = url
            this.urlNext = data.next
            this.urlPrevious = data.previous
            if(this.count != data.count){
              this.count = data.count
            }

          }else this.ciudadanos = undefined
        }, 
        error: error => this.error = error, 
      })
      
      
  }


  onPageFired(event:any){
    if(event.previousPageIndex > event.pageIndex){
      this.showCiudadanos(this.urlPrevious)
      
      
    }else{
      this.showCiudadanos(this.urlNext)
     
    }
    
  }
  
  parseResidente(residente:boolean){
    return residente? "Sí" : "No";
  }

  ngOnInit(): void {
    // Lógica que deseas ejecutar al renderizar el componente
    if(this.urlCiudadanos != undefined){
      if(this.urlCiudadanos.includes('?')){
        this.showCiudadanos(`${this.urlCiudadanos}`);

      }else{
        this.showCiudadanos(`${this.urlCiudadanos}`);
      }
    }else{
      this.showCiudadanos(this.url);

    }

  }
  
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;

  }

  openActivarSolapinDialog(idCiudadano: number): void {
    const dialogRef = this.dialog.open(ActivarSolapinComponent, {
      width: '400px',
      data: { idCiudadano }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        this.showCiudadanos(this.url); // Actualizar la tabla si es necesario
    });
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

