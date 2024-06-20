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
  pagoActivo: boolean = false;

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
      tipopago: ['Efectivo'],
      monto: [null, [Validators.min(0.01)]]
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

        if(this.solapin.estado == 0){
          Swal.fire('Error', 'Este solapín ya se encuentra anulado', 'error');
          this.dialogRef.close();
        }

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

    // Suscribirse a los cambios del FormControl causaanulacion
    this.solapinForm.get('causaanulacion')?.valueChanges.subscribe(value => {
      switch (value) {
        case '1':
        case '4':
        case '7':
        case '8':
          this.pagoActivo = true;
          break;
        case '2':
        case '3':
        case '5':
        case '6':
          this.pagoActivo = false;
          break;
      }
    });

  }

  onSubmit(): void {
    if (this.solapinForm.valid) {
      var formData = this.solapinForm.value;
      formData.estado = 0;
      formData.action_description = "Anular";
      var idcausa = formData.causaanulacion;
      
        this.solapinService.updateSolapin(formData).pipe(
          catchError(error => {
            Swal.fire('Error', 'No se pudo anular el solapín', 'error');
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            if (this.pagoActivo) {
              var monto = formData.monto;
              var tipopago = formData.tipopago;
              this.registrarPago(response, idcausa, monto, tipopago);
            }
            this.registrarOperacionSolapin(response, idcausa);
            this.registrarCiudadanoSolapinHist(response, idcausa);

            if(idcausa == 6){
              this.solapinService.deleteSolapin(response.numerosolapin).pipe(
                catchError(error => {
                  console.log('Error al desasociar solapín');
                  this.dialogRef.close();
                  return of(null);
                })
              ).subscribe(response => {
              });
            }
            Swal.fire('Éxito', 'Solapín anulado correctamente', 'success');
            this.dialogRef.close();
          }
        });
    }else{
        Swal.fire('Advertencia', 'Complete el formulario correctamente', 'warning');
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
      }, error => {
        console.log("No se pudo crear el registro de ciudadano solapín historial");
      });
  }

  registrarPago(response: any, idcausa: number, monto: number, tipopago: string){
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
    dataReg.idusuario = userId;
    dataReg.idcausaanulacion = idcausa;
    dataReg.monto = monto;
    dataReg.tipopago = tipopago;
    dataReg.idtransferencia = "";
    dataReg.fecha = new Date();

      // Crear el registro de operacion del solapín
      this.solapinService.createRegistroPago(dataReg).subscribe(() => {
        console.log("REGISTRO DE PAGO CREADO");
        
      }, error => {
        console.log("No se pudo crear el registro de pago");
      });
  }
}