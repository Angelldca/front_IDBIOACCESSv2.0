import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolapinService } from '../solapin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-modificar-solapin',
  templateUrl: './modificar-solapin.component.html',
  styleUrls: ['./modificar-solapin.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ModificarSolapinComponent implements OnInit {
  solapinForm: FormGroup;
  tiposSolapin: any[] = [];
  numerosolapin: string = "";
  nuevonumerosolapin: string = "";
  fecha: string = "";
  solapin: any;

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<ModificarSolapinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numerosolapin = data.idCiudadano.solapin; // Pasar el numerosolapin al componente
    this.nuevonumerosolapin = this.numerosolapin;
    this.solapinForm = this.fb.group({
      nuevonumerosolapin: ['', [Validators.required, numerosolapinValidator()]],
      codigobarra: ['', [Validators.required, codigobarraValidator()]],
      serial: ['', [Validators.required, serialValidator()]],
      idtiposolapin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.solapinService.getTiposSolapin().subscribe(data => {
      this.tiposSolapin = data;
    });

    this.solapinService.getSolapin({numerosolapin: this.numerosolapin}).subscribe(
      data => {
        this.solapin = data; 

        this.solapinForm.patchValue({ 
          nuevonumerosolapin: this.nuevonumerosolapin,
          codigobarra: this.solapin.codigobarra,
          serial: this.solapin.serial,
          idtiposolapin: this.solapin.idtiposolapin
        });

      },
      error => {
        console.error("ERROR:", error);
      }
    );

  }

  onSubmit(): void {
    if (this.solapinForm.valid) {
      if (this.solapinForm.dirty) {
        var formData = this.solapinForm.value;
      formData.numerosolapin = this.numerosolapin;
      formData.action_description = "Modificar datos";

      this.solapinService.updateSolapin(formData).pipe(
        catchError(error => {
          // Manejo del error
          Swal.fire('Error', 'No se pudo modificar el solapín', 'error');
          return of(null); // Retornar un observable nulo para completar el flujo
        })
      ).subscribe(response => {
        if (response) {
          Swal.fire('Éxito', 'Solapín modificado correctamente', 'success');
          this.dialogRef.close();
        }
      });
      }else{
        Swal.fire('Advertencia', 'No se ha modificado ningún campo', 'warning');
      }
      
    }else{
      Swal.fire('Advertencia', 'Alguno de los valores a modificar no es válido', 'warning');
    }
  }
}

export function numerosolapinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^[ETXVF][0-9]{6}$/;
    return regex.test(value) ? null : { invalidNumerosolapin: true };
  };
}

export function codigobarraValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^[ETXVF][0-9]{7}$/;
    return regex.test(value) ? null : { invalidCodigobarra: true };
  };
}

export function serialValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^[0-9]{6}$/;
    return regex.test(value) ? null : { invalidSerial: true };
  };
}
