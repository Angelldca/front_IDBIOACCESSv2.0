import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-buscar-ciudadano',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buscar-ciudadano.component.html',
  styleUrl: './buscar-ciudadano.component.css'
})
export class BuscarCiudadanoComponent {
  control = new FormControl('dni');
  @Output() newSearchEvent = new EventEmitter<Busqueda>();
  busqueda :string = ''
  data:Busqueda = {
    carnetidentidad:'',
    solapin:'',
    idexpediente:'',
    nombre_apellidos:'',
    
  };
  addNewSearch(value: Busqueda) {
    this.newSearchEvent.emit(value);
  }


  find(){
    this.clear()
    if(this.busqueda.trim().length>0 && this.control.value !== null){
      let tipo = this.control.value
      this.data[tipo]= this.busqueda.trim()
      this.addNewSearch(this.data)
    }
  }
   clear(){
    this.data = {
      carnetidentidad:'',
      solapin:'',
      idexpediente:'',
      nombre_apellidos:'',
    }
   }

}

export interface Busqueda{
  solapin:string,
  carnetidentidad:string,
  nombre_apellidos:string,
  idexpediente:string,
  [key: string]: string;
}
