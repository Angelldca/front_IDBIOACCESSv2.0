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
  selector: 'app-activar-solapin',
  templateUrl: './activar-solapin.component.html',
  styleUrls: ['./activar-solapin.component.css'],
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
export class ActivarSolapinComponent implements OnInit {
  solapinForm: FormGroup;
  tiposSolapin: any[] = [];
  numerosolapin: string = "";
  fecha: string = "";
  solapin: any;

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<ActivarSolapinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numerosolapin = data.idCiudadano.solapin; // Pasar el numerosolapin al componente
    this.solapinForm = this.fb.group({
      numerosolapin: ['', Validators.required],
      codigobarra: ['', Validators.required],
      serial: ['', Validators.required],
      idtiposolapin: [{value: '', disabled: true}],
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
          numerosolapin: this.solapin.numerosolapin,
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
      var formData = this.solapinForm.value;
      formData.estado = 1; // Activar el solapin

      this.solapinService.updateSolapin(formData).pipe(
        catchError(error => {
          // Manejo del error
          Swal.fire('Error', 'No se pudo activar el solapín', 'error');
          return of(null); // Retornar un observable nulo para completar el flujo
        })
      ).subscribe(response => {
        if (response) {
          this.registrarOperacionSolapin(response);
          Swal.fire('Éxito', 'Solapín activado correctamente', 'success');
          this.dialogRef.close();
        }
      });
    }
  }

  registrarOperacionSolapin(response: any){
    var dataReg: any = {};
    var user = localStorage.getItem('user');
    var userId;

    if (user) {
        try {
            var userObj = JSON.parse(user);
            userId = userObj.id;
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
        }
    }

    dataReg.idsolapin = response.idsolapin;
    dataReg.codigobarra = response.codigobarra;
    dataReg.numerosolapin = response.numerosolapin;
    dataReg.serial = response.serial;
    dataReg.fechaoperacion = new Date();
    dataReg.idusuario = userId;
    dataReg.idcausaanulacion = null;
    dataReg.idtipooperacionsolapin = 1;

      // Crear el registro de operacion del solapín
      this.solapinService.createOperacionSolapin(dataReg).subscribe(() => {
        console.log("REGISTRO DE OPERACION ACTIVAR SOLAPIN CREADO");
      }, error => {
        console.log("No se pudo crear el registro de operacion solapín");
      });
  }
}