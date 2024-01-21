import { Component,AfterViewInit, ViewChild, OnInit, OnChanges } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService,Ciudadano } from './ciudadano.service';
import { ChangeDetectorRef } from '@angular/core';

import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-ciudadano-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  providers:[CiudadanoService],
  templateUrl: './ciudadano-table.component.html',
  styleUrl: './ciudadano-table.component.css'
})


export class CiudadanoTableComponent implements AfterViewInit ,OnInit {

  constructor(private ciudadanoService :CiudadanoService,private cdr: ChangeDetectorRef){
     
   
  }
  
  displayedColumns: string[] = ['id','nombre', 'apellidos', 'rol_institucional', 'dni','solapin','opciones'];
  ciudadano: Ciudadano[] | undefined;
  ELEMENT_DATA: Ciudadano[] = [];
  dataSource = new MatTableDataSource<Ciudadano>(this.ELEMENT_DATA);
  url:string = 'http://127.0.0.1:8000/api/ciudadano/'
  urlNext:string = 'http://127.0.0.1:8000/api/ciudadano/'
  urlPrevious:string = 'http://127.0.0.1:8000/api/ciudadano/'
  count:Number = 5
  page_size = 5
  
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
          
          this.ciudadano = data.results
          this.ciudadano.forEach(c => c.editMode = false)
          this.ELEMENT_DATA = this.ciudadano
          this.dataSource.data = this.ELEMENT_DATA;
          this.url = url
          this.urlNext = data.next
          this.urlPrevious = data.previous
          if(this.count != data.count){
            this.count = data.count
          }
          
          /*
          this.dataSource.paginator = this.paginator;
          
          //
          console.log(this.ciudadano)
          
          */
        }, // success path
        error: error => this.error = error, // error path
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
  
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

