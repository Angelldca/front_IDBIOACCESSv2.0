import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CiudadanoTableComponent } from '../ciudadano-table/ciudadano-table.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, NgForm, FormGroup} from '@angular/forms';
import { Ciudadano, CiudadanoService } from '../ciudadano-table/ciudadano.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-ciudadanos-import',
  standalone: true,
  imports: [CiudadanoTableComponent,MatInputModule,
    MatFormFieldModule,FormsModule,ReactiveFormsModule,
    MatIconModule,MatButtonModule,MatPaginatorModule,MatTableModule],
  providers:[CiudadanoService],
  templateUrl: './ciudadanos-import.component.html',
  styleUrl: './ciudadanos-import.component.css'
})
export class CiudadanosImportComponent implements AfterViewInit{
  importsCiudadanos: boolean = false;
  file = new FormControl('');
  selectedFile: File | null = null;
  nameFile = 'Ningun archivo seleccionado'
constructor(private ciudadanoService : CiudadanoService){}
  onSubmit(){
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
      this.selectedFile = null

    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
  onFileSelected(event:any){
    this.selectedFile = event.target.files?.[0] || null;
    this.nameFile = event.target.files[0].name

    
  }

  uploadFile(file: File) {
    console.log('Subiendo archivo:', file);
    const formData = new FormData();
    formData.append('planilla_ciudadanos', file);
    this.ciudadanoService.uploadFile('http://127.0.0.1:8000/api/ciudadanoscsv/',formData)
    .subscribe({
      next: data => {
        console.log(data)
        this.elementData = data;
        this.dataSource.data = this.elementData;
        this.dataSource.paginator = this.paginator;
        this.nameFile='Ningun archivo seleccionado'
        this.importsCiudadanos = true
      }, // success path
      error: error => {
        console.log(error)
        this.nameFile='Ningun archivo seleccionado'
      }, // error path
      
    }
    
    )
    this.nameFile='Ningun archivo seleccionado'
  }
  displayedColumns: string[] = ['id','img','primernombre','segundonombre', 
  'primerapellido','segundoapellido', 'area', 
  'roluniversitario', 'carnetidentidad','solapin','provincia','municipio',
  'sexo','residente','idexpediente','fechanacimiento'];
  elementData: any = []
  dataSource = new MatTableDataSource<Ciudadano>(this.elementData);
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
