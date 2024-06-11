import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
  fecha: string = "";
  solapin: any;

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<ModificarSolapinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numerosolapin = data.idCiudadano.solapin; // Pasar el numerosolapin al componente
    this.solapinForm = this.fb.group({
      numerosolapin: ['', Validators.required],
      codigobarra: ['', Validators.required],
      serial: ['', Validators.required],
      estado: ['', Validators.required],
      idtiposolapin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.solapinService.getTiposSolapin().subscribe(data => {
      this.tiposSolapin = data;
    });

    this.solapinService.getSolapin({numerosolapin: this.numerosolapin}).subscribe(
      data => {
        this.solapin = data;  // No se necesita `data.results` porque la respuesta no está paginada

        this.solapinForm.patchValue({ 
          numerosolapin: this.solapin.numerosolapin,
          codigobarra: this.solapin.codigobarra,
          serial: this.solapin.serial,
          estado: this.solapin.estado,
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
      var formData = this.solapinForm.value;

      var fechaHoraActual = new Date();
      formData.fecha = fechaHoraActual.toISOString();

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
    }
  }
}