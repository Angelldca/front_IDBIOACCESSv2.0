import { Component,AfterViewInit, ViewChild, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CiudadanoService,Ciudadano } from '../ciudadano-table/ciudadano.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { urlBack } from '../Finals';

@Component({
  selector: 'app-ciudadanobash-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    MatIconModule,MatButtonModule,MatTooltipModule,
  ],
  providers:[],
  templateUrl: './ciudadanobash-table.component.html',
  styleUrl: './ciudadanobash-table.component.css'
})
export class CiudadanobashTableComponent implements AfterViewInit ,OnInit,OnChanges  {
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
        const urlFind = `${urlBack}ciudadanobash/?${atributo}=${value}`
        this.showCiudadanos(urlFind)
        
    }
  }

  displayedColumns: string[] = ['id',
  'opciones','primernombre','segundonombre', 'primerapellido','segundoapellido', 'identificadorarea', 
  'identificadorroluni', 'carnetidentidad','solapin','provincia','municipio',
  'sexo','residente','idexpediente','fechanacimiento'];
  ciudadanos: Ciudadano[] | undefined;
  ELEMENT_DATA: Ciudadano[] = [];
  dataSource = new MatTableDataSource<Ciudadano>(this.ELEMENT_DATA);
  user = { ////Poner unuario autenticado
    entidad :"UCI"
  }
  url:string = `${urlBack}ciudadanobash/`
  urlNext:string = `${urlBack}ciudadanobash/`
  urlPrevious:string = `${urlBack}ciudadanobash/`
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
        error: error =>{
           this.error = error;
           Swal.fire({
            title: 'Oops...',
            text: error.error.detail,
            icon: 'error',
            footer: `${error.statusText} error ${error.status}`,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-success px-4',
            },
            buttonsStyling: true,
            })
          }, 
      })
      
      
  }


  onPageFired(event:any){
    if(event.previousPageIndex > event.pageIndex){
      this.showCiudadanos(this.urlPrevious)
      console.log(this.urlPrevious)
      
    }else{
      this.showCiudadanos(this.urlNext)
      console.log(this.urlNext)
    }
    
  }
  
  ngOnInit(): void {
    
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
  edicionActivada:boolean = false
  editarElemento(e:any){
    e.editMode = !e.editMode
    this.edicionActivada =  !this.edicionActivada
    console.log(e)
    this.router.navigate([`home/ciudadano/${e.idpersona}`],{ state: { user: e } });
  }


  deleteCiudadano(e:any){
    this.openDialogDelete('0ms', '0ms',e)
    console.log("delete", e.idpersona)
  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, e:any): void {
    const dialogRef =  this.dialog.open(DialogComponent, {
      width: '500px',
  
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.delete){
        this.ciudadanoService.makeInactive(e.idpersona, result)
        .subscribe({
        next: data => {
          Swal.fire({
            title: 'Exito',
            text: `ciudadano eliminado`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
            
            },
            });
          this.showCiudadanos(this.url)
          if(this.error){
            this.showCiudadanos(this.urlPrevious)
            this.clear
          }
          
        }, // success path
        error: error => {
          console.log(error)
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
            footer: ``,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary px-4'
            },
            buttonsStyling: false,
            })
        }, // error path
      })
      }

    })
    
  }
  capturarImg(element:Ciudadano){
    element = {
      ...element,
      area: element.identificadorarea,
      roluniversitario: element.identificadorroluni,
     
    }
    
    this.ciudadanoService.createCiudadano(element, null).subscribe({
      next: data => {
        
        this.addNewUserID(data.idciudadano);
      }, // success path
      error: error => {
        let errorText =''
        console.log(error)
        for (const field in error.error) {
          if (error.error.hasOwnProperty(field)) {
            errorText += `${field}: ${error.error[field][0]}\n `;
            
          }
        }
        Swal.fire({
          title: 'Oops...',
          text: errorText,
          icon: 'error',
          footer: `Error`,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'btn btn-primary px-4'
          },
          buttonsStyling: false,
          })
       
      }, // error path X119041
    })
    
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

