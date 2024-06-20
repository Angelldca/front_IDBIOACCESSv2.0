import { Component,AfterViewInit, ViewChild, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PagoService, Pagination, RegistroPago } from '../pago.service';

import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-table-reporte-pago',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTooltipModule,
    MatIconModule,MatButtonModule,
  ],
  providers:[PagoService],
  templateUrl: './table-reporte-pago.component.html',
  styleUrl: './table-reporte-pago.component.css'
})


export class TableReportePagoComponent implements AfterViewInit ,OnInit,OnChanges  {
  @Input() buscar:string|undefined;
  @Input() urlCiudadanos:string|undefined;
  @Output() newUserIDEvent = new EventEmitter<string>();
  constructor(private pagoService: PagoService,public dialog: MatDialog, private router: Router){

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
        const urlFind = `http://127.0.0.1:8000/api/ciudadano/?${atributo}=${value}`
        this.showCiudadanos(urlFind)

      }
    }
  }

  displayedColumns: string[] = ['id', 'idciudadano', 'idsolapin', 'idusuario', 'idcausaanulacion', 'monto',
    'tipopago', 'idtransferencia', 'fecha'
  ];
  ciudadanos: RegistroPago[] | undefined;
  ELEMENT_DATA: RegistroPago[] = [];
  dataSource = new MatTableDataSource<RegistroPago>(this.ELEMENT_DATA);
  user = { ////Poner usuario autenticado
    entidad :"UCI"
  }
  url:string = `http://127.0.0.1:8000/api/newsolapinhist/`
  urlNext:string = `http://127.0.0.1:8000/api/newsolapinhist/`
  urlPrevious:string = `http://127.0.0.1:8000/api/newsolapinhist/`
  count:Number = 5
  page_size = 6
  ciudadano:RegistroPago | undefined
  
  error: any;
  headers: string[] = [];
  clear() {
    this.ciudadano = undefined;
    this.error = undefined;
    this.headers = [];
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  showCiudadanos(url:string) {
    this.pagoService.getRegistroPago_pagination(url)
      .subscribe({
        next: data => {
          console.log(data)
          if(data.results.length> 0){
            this.ciudadanos = data.results
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

  parseCausaAnulacion(idcausaanulacion: any){
    var nombreCausa;
    switch (idcausaanulacion) {
      case 1:
        nombreCausa = "Pérdida de solapín";
        break;
      case 2:
        nombreCausa = "Corrección de datos";
        break;
      case 3:
        nombreCausa = "Corrección de imágenes";
        break;
      case 4:
        nombreCausa = "Deterioro de solapín";
        break;
      case 5:
        nombreCausa = "Baja";
        break;
      case 6:
        nombreCausa = "Desasociar";
        break;
      case 7:
        nombreCausa = "Baja con pérdida de solapín";
        break;
      case 8:
        nombreCausa = "Baja con adeudos";
        break;
    }
    return nombreCausa;
  }


  onPageFired(event:any){
    if(event.previousPageIndex > event.pageIndex){
      this.showCiudadanos(this.urlPrevious)
      
      
    }else{
      this.showCiudadanos(this.urlNext)
     
    }
    
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
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


