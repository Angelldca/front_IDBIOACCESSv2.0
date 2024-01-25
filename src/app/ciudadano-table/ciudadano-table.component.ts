import { Component,AfterViewInit, ViewChild, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService,Ciudadano } from './ciudadano.service';
import { ChangeDetectorRef } from '@angular/core';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { Busqueda } from '../buscar-ciudadano/buscar-ciudadano.component';


@Component({
  selector: 'app-ciudadano-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  providers:[CiudadanoService],
  templateUrl: './ciudadano-table.component.html',
  styleUrl: './ciudadano-table.component.css'
})


export class CiudadanoTableComponent implements AfterViewInit ,OnInit,OnChanges  {
  @Input() buscar:string|undefined;
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
      console.log(value,atributo)
      const urlFind = `http://127.0.0.1:8000/api/ciudadano/?${atributo}=${value}`
      this.showCiudadanos(urlFind)
    }
  }


  constructor(private ciudadanoService :CiudadanoService,public dialog: MatDialog){
     
   
  }
  
  displayedColumns: string[] = ['id','nombre', 'apellidos', 'rol_institucional', 'dni','solapin','opciones'];
  ciudadanos: Ciudadano[] | undefined;
  ELEMENT_DATA: Ciudadano[] = [];
  dataSource = new MatTableDataSource<Ciudadano>(this.ELEMENT_DATA);
  url:string = 'http://127.0.0.1:8000/api/ciudadano/'
  urlNext:string = 'http://127.0.0.1:8000/api/ciudadano/'
  urlPrevious:string = 'http://127.0.0.1:8000/api/ciudadano/'
  count:Number = 5
  page_size = 5
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
  
  ngOnInit(): void {
    // Lógica que deseas ejecutar al renderizar el componente
    this.showCiudadanos(this.url);
    
   
  }
  
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;

  }
  edicionActivada:boolean = false
  editarElemento(e:any){
    e.editMode = !e.editMode
    this.edicionActivada =  !this.edicionActivada
    console.log(e.editMode)
    //this.cdr.detectChanges();
  }
  cancelEdit(e:any){
    e.editMode = !e.editMode
    this.edicionActivada =  !this.edicionActivada
    console.log(e.editMode)
    this.showCiudadanos(this.url)
  }
  senEdit(e:any){
     // this.ciudadanoService.updateCiudadano(e.id, )
     
     const nameInputs = document.getElementById(`${e.nombre}`) as HTMLInputElement;
     const apellidoInputs = document.getElementById(`${e.apellidos}`) as HTMLInputElement;
     const nameDni = document.getElementById(`${e.dni}`) as HTMLInputElement;
     const nameSolapin = document.getElementById(`${e.solapin}`) as HTMLInputElement;
     const nameRol = document.getElementById(`${e.rol_institucional}`) as HTMLInputElement;
     const nuevosDatos = { 
       nombre:nameInputs.value,
       apellidos:apellidoInputs.value,
       dni: nameDni.value,
       solapin: nameSolapin.value,
       rol_institucional:nameRol.value
      };
      this.ciudadanoService.updateCiudadano(e.id,nuevosDatos).subscribe({
        next: data => {
          console.log(data)
        }, // success path
        error: error => {
          this.error = error
          console.log(error)
        }, // error path
      })
     e.editMode = !e.editMode
    this.edicionActivada =  !this.edicionActivada
  }
  deleteCiudadano(e:any){
    this.openDialogDelete('0ms', '0ms',e)
    console.log("delete", e.id)
  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, e:any): void {
    const dialogRef =  this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ciudadanoService.deleteCiudadano(e.id)
        .subscribe({
        next: data => {
          this.showCiudadanos(this.url)
          if(this.error){
            this.showCiudadanos(this.urlPrevious)
            this.clear
          }
          
        }, // success path
        error: error => this.error = error, // error path
      })
      }

    })
    
  }
  
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

