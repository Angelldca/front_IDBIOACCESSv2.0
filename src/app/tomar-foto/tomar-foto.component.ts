import { Component, NgZone, OnInit, ViewChild, AfterViewInit, DoCheck, AfterContentInit, AfterContentChecked, Input, Output, EventEmitter } from '@angular/core';

import { WebcamModule, WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { MediaDevicesService } from './mediaDivice.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';



@Component({
  selector: 'app-tomar-foto',
  standalone: true,
  imports: [
    WebcamModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  providers:[MediaDevicesService, CiudadanoService],
  templateUrl: './tomar-foto.component.html',
  styleUrl: './tomar-foto.component.css'
})
export class TomarFotoComponent implements OnInit, AfterViewInit  {
  @ViewChild('webcam') webcam: any;
  @ViewChild('canvas') canvas: any;
  @Input() userID:string|null  = null
  @Output() newEmitterUserIDChange = new EventEmitter<string|null|undefined>()
  videoDevices: MediaDeviceInfo[] = [];
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string | null = null;
  public trigger: Subject<void> = new Subject();
  multiplesCamarasDisponibles: boolean = false
  siguienteWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public videoOptions: MediaTrackConstraints = {
    // ... opciones de video
  };
  public errors: WebcamInitError[] = [];

  // Capturando imagen
  public webcamImage: WebcamImage | null = null;
  captureImage = '';
  animationFrameId: number = 0;

  constructor(private mediaDevicesService: MediaDevicesService, private ciudadanoService: CiudadanoService) { }
  ngOnInit(): void {
    this.getVideoDevices();
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.webcam.webcamList = mediaDevices;
        this.multiplesCamarasDisponibles = mediaDevices && mediaDevices.length > 1;
      })
      .catch((error: WebcamInitError) => {
        console.error('Error al obtener dispositivos de video:', error);
      });
     
  }
 

  getVideoDevices(): void {
    this.mediaDevicesService
      .getVideoDevices()
      .then((devices) => {
        this.videoDevices = devices;
        
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oops...',
          text: 'Error al obtener dispositivos',
          icon: 'error',
          footer: error,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'btn btn-primary px-4'
          },
          buttonsStyling: false,
          })
      });
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.siguienteWebcam.asObservable();
  }
  
  isValid: boolean = false;
  imgValid: boolean = true;
  getValidate(e:boolean){
    this.isValid = e
   
  }
  public triggerCaptura(): void {
    this.trigger.next();
  
    if(this.isValid){
      this.mediaDevicesService.validarImage(this.webcamImage?.imageAsDataUrl) .subscribe({
        next: data => {
          this.imgValid = data.data
       
        }, 
        error: error => {
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
            footer: error,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary px-4'
            },
            buttonsStyling: false,
            })
        }, 
      })
    }else{
      this.imgValid = true
    }



  }

  recapturar(): void {
    this.webcamImage = null;
    this.drawPlanilla()
  }
  public showNextWebcam(directionOnDeviceId: boolean | string): void {
    this.siguienteWebcam.next(directionOnDeviceId);
  }

  // Método que se llama al capturar una imagen
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;


    const image = new Image();
    image.src = webcamImage.imageAsDataUrl;

    image.onload = () => {
    };



  }

  // Manejo de errores al iniciar la webcam
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  // Cambio de cámara
  public cameraWasSwitched(deviceId: string): void {

    this.deviceId = deviceId;
  }

  // Cambio de visibilidad de la webcam
  public showWebcamToggle(): void {
    this.showWebcam = !this.showWebcam;

  }

  // Cambio de cámara permitido
  public allowCameraSwitchToggle(): void {
    this.allowCameraSwitch = !this.allowCameraSwitch;
  }


  drawPlanilla() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

    // Dibuja el contorno de un rostro
    if (ctx) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusY = (canvas.height * 30) / 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, radiusY, 0, 2 * Math.PI); // Dibuja un círculo

      ctx.strokeStyle = '#d32b2e';
      ctx.lineWidth = 2;
      ctx.stroke();


      var width = canvas.width;
      var height = canvas.height;
      var radius = canvas.width / 2;

      var leftShoulderX = radius * Math.cos(Math.PI / 6);
      var leftShoulderY = radius * Math.sin(Math.PI / 6);
      var rightShoulderX = width - leftShoulderX;
      var rightShoulderY = height - leftShoulderY;

      ctx.beginPath();
      ctx.moveTo(leftShoulderX, leftShoulderY + radiusY - 20);
      ctx.lineTo(rightShoulderX, rightShoulderY + radiusY - 20);
      ctx.strokeStyle = "#d32b2e";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      //ctx.moveTo(leftShoulderX, leftShoulderY+ radiusY-20);
      ctx.lineWidth = 5;
      
      //ctx.arc(centerX, centerY+ radiusY*2.3, 80, Math.PI, 0);
      // Puntos de control de la curva cuadrática
      let controlX = 3;
      let controlY = 107;
      // Punto final de la curva
      let endX = 20;
      let endY = 200;

      // Punto de inicio (actual)
      let startX = leftShoulderX;
      let startY =  leftShoulderY + radiusY - 20;
      ctx.moveTo(startX,startY)

      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.strokeStyle = "#d32b2e";
      ctx.lineWidth = 2;
      ctx.stroke();

      /////Hombro derecho/////////////////////
      ctx.beginPath();
       controlX = 300;
       controlY = 107;
      // Punto final de la curva
       endX = 280;
       endY = 200;

      // Punto de inicio (actual)
      startX = rightShoulderX;
      startY =  rightShoulderY + radiusY - 20;
     ctx.moveTo(startX,startY)

     ctx.quadraticCurveTo(controlX, controlY, endX, endY);
     ctx.strokeStyle = "#d32b2e";
     ctx.lineWidth = 2;
     ctx.stroke();

     ctx.beginPath();
     ctx.moveTo(0, leftShoulderY-10 );
      ctx.lineTo(370, rightShoulderY-10);
      ctx.strokeStyle = "#d32b2e";
      ctx.lineWidth = 2;
      ctx.stroke();


      ctx.beginPath();
      ctx.moveTo(0, leftShoulderY-40 );
       ctx.lineTo(370, rightShoulderY-40);
       ctx.strokeStyle = "#d32b2e";
       ctx.lineWidth = 2;
       ctx.stroke();


       ctx.beginPath();
      ctx.moveTo(0, leftShoulderY-20 );
       ctx.fillText("Zona de los ojos",20, rightShoulderY-20);
       ctx.strokeStyle = "#444";
       ctx.lineWidth = 2;
       ctx.stroke();
    }
  }
  ngAfterViewInit(): void {
    this.drawPlanilla()
  }

  saveImg(){
      this.mediaDevicesService.createImage(this.userID,this.webcamImage?.imageAsDataUrl) .subscribe({
        next: data => {
          console.log(data)
          Swal.fire({
            title: data.detail,
            text: `Id del ciudadano: ${data.data.idciudadano} , fecha: ${data.data.fecha_actualizacion}`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
            
            },
            }).then(data=>{
              this.undo()

            })
        }, 
        error: error => {
          console.log(error)
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
            footer: error,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary px-4'
            },
            buttonsStyling: false,
            })
        }, 
      })
    

  }
  undo(){
    this.isValid = false
    this.userID = null
    this.newEmitterUserIDChange.emit(null)
  }
  undoCapture(){
    this.isValid = false;
    this.webcamImage = null;
  }

}
