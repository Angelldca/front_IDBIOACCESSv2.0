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
  selector: 'app-anular-solapin',
  templateUrl: './anular-solapin.component.html',
  styleUrls: ['./anular-solapin.component.css'],
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
export class AnularSolapinComponent implements OnInit {
  solapinForm: FormGroup;
  tiposSolapin: any[] = [];
  causasAnulacion: any[] = [];
  numerosolapin: string = "";
  idciudadano: number = 0;
  fecha: string = "";
  solapin: any;

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<AnularSolapinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numerosolapin = data.idCiudadano.solapin; // Pasar el numerosolapin al componente
    this.idciudadano = data.idCiudadano.idciudadano;
    this.solapinForm = this.fb.group({
      numerosolapin: ['', Validators.required],
      codigobarra: ['', Validators.required],
      serial: ['', Validators.required],
      idtiposolapin: [{value: '', disabled: true}],
      causaanulacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.solapinService.getTiposSolapin().subscribe(data => {
      this.tiposSolapin = data;
    });

    this.solapinService.getCausasAnulacion().subscribe(data => {
      this.causasAnulacion = data;
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
      formData.estado = 0;
      var idcausa = formData.causaanulacion;
      console.log("ESSSSSSSSSSSSSSSSSTOOOOOO: " + idcausa );

      this.solapinService.updateSolapin(formData).pipe(
        catchError(error => {
          // Manejo del error
          Swal.fire('Error', 'No se pudo anular el solapín', 'error');
          return of(null); // Retornar un observable nulo para completar el flujo
        })
      ).subscribe(response => {
        if (response) {
          this.registrarOperacionSolapin(response, idcausa);
          this.registrarCiudadanoSolapinHist(response, idcausa);
          Swal.fire('Éxito', 'Solapín anulado correctamente', 'success');
          this.dialogRef.close();
        }
      });
    }else{
        Swal.fire('Advertencia', 'Seleccione una causa de anulación', 'warning');
    }
  }

  registrarOperacionSolapin(response: any, idcausa:number){
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
    dataReg.idcausaanulacion = idcausa;
    dataReg.idtipooperacionsolapin = 2;

      // Crear el registro de operacion del solapín
      this.solapinService.createOperacionSolapin(dataReg).subscribe(() => {
        console.log("REGISTRO DE OPERACION ANULAR SOLAPIN CREADO");
      }, error => {
        console.log("No se pudo crear el registro de operacion solapín");
      });
  }

  registrarCiudadanoSolapinHist(response: any, idcausa:number){
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

    dataReg.idciudadano = this.idciudadano;
    dataReg.idsolapin = response.idsolapin;
    dataReg.fechaactivado = response.fecha;
    dataReg.serialsolapin = response.serial;
    dataReg.identificadoranulacion = idcausa;
    dataReg.idusuario = userId;
    dataReg.fechadesactivado = new Date();
    dataReg.codigobarra = response.codigobarra;

      // Crear el registro de operacion del solapín
      this.solapinService.createCiudadanoSolapinHist(dataReg).subscribe(() => {
        console.log("REGISTRO DE CIUDADANO SOLAPIN HISTORIAL CREADO");
        console.log(dataReg);
      }, error => {
        console.log("No se pudo crear el registro de ciudadano solapín historial");
      });
  }
}