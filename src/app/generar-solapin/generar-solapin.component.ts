import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SolapinService } from '../solapin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-solapin',
  templateUrl: './generar-solapin.component.html',
  styleUrls: ['./generar-solapin.component.css'],
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
export class GenerarSolapinComponent implements OnInit {
  solapinForm: FormGroup;
  tiposSolapin: any[] = [];
  idciudadano: number;
  fecha: string = "";

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<GenerarSolapinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idciudadano = data.idCiudadano.idciudadano; // Pasar el idciudadano al componente
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
      this.tiposSolapin = data.results;
    });

    this.solapinService.getUltimoNumerosolapin().subscribe(data => {
      this.solapinForm.patchValue({ numerosolapin: data.numerosolapin });
    });

    this.solapinService.getUltimoCodigobarra().subscribe(data => {
      this.solapinForm.patchValue({ codigobarra: data.codigobarra });
    });

    this.solapinService.getUltimoSerial().subscribe(data => {
      this.solapinForm.patchValue({ serial: data.serial });
    });
  }

  onSubmit(): void {
    if (this.solapinForm.valid) {
      var formData = this.solapinForm.value;
      formData.idciudadano = this.idciudadano;

      var fechaHoraActual = new Date();
      formData.fecha = fechaHoraActual.toISOString();

      this.solapinService.createSolapin(formData).subscribe(response => {
        Swal.fire('Éxito', 'Solapín generado correctamente', 'success');
        console.log('Solapín creado:', response);
        this.dialogRef.close();
      });
    }
  }
}