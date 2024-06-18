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
import { ActivatedRoute, Router } from '@angular/router';

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
    MatSelectModule,
  ]
})
export class GenerarSolapinComponent implements OnInit {
  solapinForm: FormGroup;
  tiposSolapin: any[] = [];
  idciudadano: number;
  fecha: string = "";
  prefijoNumeroSolapin: string = "";
  serialCount: number = 0;

  constructor(
    private fb: FormBuilder,
    private solapinService: SolapinService,
    public dialogRef: MatDialogRef<GenerarSolapinComponent>,
    private route: ActivatedRoute, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idciudadano = data.idCiudadano.idciudadano; // Pasar el idciudadano al componente
    this.solapinForm = this.fb.group({
      numerosolapin: ['', Validators.required],
      codigobarra: ['', Validators.required],
      serial: ['', Validators.required],
      idtiposolapin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.solapinService.getTiposSolapin().subscribe(data => {
      this.tiposSolapin = data;
    });

    if ( String(this.data.idCiudadano.area).match("XETID") ){
      this.prefijoNumeroSolapin = "X";
      this.solapinForm.patchValue({ idtiposolapin: 4 });

    }else{

      switch( this.data.idCiudadano.roluniversitario ) {
        case "Trabajador":
          this.prefijoNumeroSolapin = "T";
          this.solapinForm.patchValue({idtiposolapin: 1});
          break;
        case "Estudiante":
          this.prefijoNumeroSolapin = "E";
          this.solapinForm.patchValue({idtiposolapin: 2});
          break;
        case "Visitante":
          this.prefijoNumeroSolapin = "V";
          this.solapinForm.patchValue({idtiposolapin: 5});
          break;
        case "Familiar":
          this.prefijoNumeroSolapin = "F";
          this.solapinForm.patchValue({idtiposolapin: 7});
          break;
        case "Eventual":
          this.prefijoNumeroSolapin = "X";
          this.solapinForm.patchValue({idtiposolapin: 6});
          break;
        case "Servicios":
          this.prefijoNumeroSolapin = "T";
          this.solapinForm.patchValue({idtiposolapin: 3});
          break;
        case "Postgrado":
          this.prefijoNumeroSolapin = "T";
          this.solapinForm.patchValue({idtiposolapin: 8});
          break;
        default:
          this.prefijoNumeroSolapin = "T";
          this.solapinForm.patchValue({idtiposolapin: 1})
          break;
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
      var serial:string = data.serial;

      this.solapinService.getSerialCount(serial).subscribe(data => {
        this.serialCount = data.count;
      })

      this.solapinForm.patchValue({ serial: serial });
    });
  }

  nuevoLote(){
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

      this.solapinService.getSerialCount(serialS).subscribe(data => {
        this.serialCount = data.count;
      })

      this.solapinForm.patchValue({ serial: serialS });
      
    });
  }

  onSubmit(): void {
    if (this.solapinForm.valid) {

      // Datos solapin
      var formData = this.solapinForm.value;
      formData.idciudadano = this.idciudadano;
      formData.estado = 1;
      formData.fecha = new Date();

      this.solapinService.createSolapin(formData).pipe(
        catchError(error => {
          // Manejo del error
          Swal.fire('Error', 'No se pudo generar el solapín', 'error');
          return of(null); // Retornar un observable nulo para completar el flujo
        })
      ).subscribe(response => {
        if (response) {
          this.registrarNuevoSolapin(response);
          this.registrarOperacionSolapin(response);

          Swal.fire('Éxito', 'Solapín generado correctamente', 'success');
          this.dialogRef.close();
        }
      });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear(); // Año completo
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agrega un cero delante si es necesario
    const day = ('0' + date.getDate()).slice(-2); // Agrega un cero delante si es necesario
    return `${year}-${month}-${day}`;
  }

  registrarNuevoSolapin(response: any){
          var dataReg: any = {};
          dataReg.idsolapin = response.idsolapin;
          console.log(response)

          dataReg.numerosolapin = response.numerosolapin;
          dataReg.serial = response.serial;
          dataReg.codigobarra = response.codigobarra;
          dataReg.idtiposolapin = response.idtiposolapin;
          dataReg.nombrecompleto = this.data.idCiudadano.primernombre + " " + 
                                    ((this.data.idCiudadano.segundonombre == null) ? "" : (this.data.idCiudadano.segundonombre + " ")) + 
                                      this.data.idCiudadano.primerapellido + " " +
                                        this.data.idCiudadano.segundoapellido;
          dataReg.area = this.data.idCiudadano.area;
          dataReg.roluniversitario = this.data.idCiudadano.roluniversitario;
          dataReg.residente = this.data.idCiudadano.residente;
          dataReg.fecha = this.formatDate(new Date());
          dataReg.idciudadano = this.data.idCiudadano.idciudadano;
          
          // Obtener los detalles del tipo de solapín
          this.solapinService.getTipoSolapinById(response.idtiposolapin).subscribe(tipoSolapin => {
            dataReg.datatiposolapin = tipoSolapin.descripcion;
            dataReg.datacategoriasolapin = tipoSolapin.categoria;
  
            // Crear el historial del solapín
            this.solapinService.createNewSolapinHist(dataReg).subscribe(() => {
              console.log("REGISTRO DE NUEVO SOLAPIN CREADO");
            }, error => {
              console.log("No se pudo crear el registro del nuevo solapín");
            });
          }, error => {
            console.log("No se pudo obtener los datos de tipo de solapin");
          });
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
    dataReg.idtipooperacionsolapin = 3;

      // Crear el registro de operacion del solapín
      this.solapinService.createOperacionSolapin(dataReg).subscribe(() => {
        console.log("REGISTRO DE OPERACION CREAR SOLAPIN CREADO");
      }, error => {
        console.log("No se pudo crear el registro de operacion solapín");
      });
  }

}