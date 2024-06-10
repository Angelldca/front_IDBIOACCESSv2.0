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
  prefijoNumeroSolapin: string = "";

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
      this.tiposSolapin = data;
    });

    if ( String(this.data.idCiudadano.area).match("XETID") ){
      this.prefijoNumeroSolapin = "X";
    }else{
      if ( String(this.data.idCiudadano.roluniversitario).match("Trabajador") ){
        this.prefijoNumeroSolapin = "T";
      }
      if ( String(this.data.idCiudadano.roluniversitario).match("Estudiante") ){
        this.prefijoNumeroSolapin = "E";
      }
      if ( String(this.data.idCiudadano.roluniversitario).match("Visitante") ){
        this.prefijoNumeroSolapin = "V";
      }
      if ( String(this.data.idCiudadano.roluniversitario).match("Familiar") ){
        this.prefijoNumeroSolapin = "F";
      }
    }

    this.solapinService.getUltimoNumerosolapin().subscribe(data => {
      var numerosolapin: string = data.numerosolapin;
      var numerosolapinNum: number = parseInt(numerosolapin.slice(1));
      numerosolapinNum++;
      numerosolapin = this.prefijoNumeroSolapin + String(numerosolapinNum);

      this.solapinForm.patchValue({ numerosolapin: numerosolapin });
    });

    this.solapinService.getUltimoCodigobarra().subscribe(data => {
      var codigobarra:string = data.codigobarra;
      var codigobarraNum:number = parseInt(codigobarra.slice(1));
      codigobarraNum++;
      codigobarra = this.prefijoNumeroSolapin + String(codigobarraNum);

      this.solapinForm.patchValue({ codigobarra: codigobarra });
    });

    this.solapinService.getUltimoSerial().subscribe(data => {
      var serial:number = data.serial;
      serial++;
      var serialS: string = "";
      
      switch ( (serial.toString()).length ){
        case 6:
          serialS = serial.toString();
          break;
        case 5:
          serialS = "0" + serial.toString();
          break;
        case 4:
          serialS = "00" + serial.toString();
          break;
        case 3:
          serialS = "000" + serial.toString();
          break;
        case 2:
          serialS = "0000" + serial.toString();
          break;
        case 1:
          serialS = "00000" + serial.toString();
          break;
      }

      this.solapinForm.patchValue({ serial: serialS });
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