import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule,FormGroup, ReactiveFormsModule} from '@angular/forms';
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
  control = new FormControl('carnetidentidad');
  busqueda = new FormControl('');
  @Output() newSearchEvent = new EventEmitter<Busqueda>();
   
  data:Busqueda = {
    carnetidentidad:'',
    solapin:'',
    idexpediente:'',
    nombre_apellidos:'',
    
  };
  userForm = new FormGroup({
    control: this.control,
    busqueda: this.busqueda
  });

  addNewSearch(value: Busqueda) {
    this.newSearchEvent.emit(value);
  }


  find(){
    this.clear()
    
    if(this.busqueda.value && this.control.value !== null){
      console.log(this.busqueda.value)
      console.log(this.control.value)
      let tipo = this.control.value
      this.data[tipo]= this.busqueda.value.trim()
      console.log(this.data)
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
