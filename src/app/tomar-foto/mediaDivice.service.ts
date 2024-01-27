import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudadano } from '../ciudadano-table/ciudadano.service';

@Injectable()
export class MediaDevicesService {
  url = 'http://127.0.0.1:8000/api/img/'
  urlCiudadano = 'http://127.0.0.1:8000/api/ciudadano/'


  constructor(private http: HttpClient){}
  getVideoDevices(): Promise<MediaDeviceInfo[]> {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');
            resolve(videoDevices);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('La API MediaDevices no está disponible en este navegador.'));
      }
    });
  }


  validarImage(blobImagen: string|undefined){
    const formData = new FormData();
    if(blobImagen){
      formData.append('img', blobImagen);
    }
    
    return this.http.post<ResponseImg>(this.url, formData);
  }

  sendImage(id: string|null|undefined, blobImagen: string|undefined){
    const formData = new FormData();
    if(blobImagen){
      formData.append('img', blobImagen);
    }
    
    return this.http.patch<Ciudadano>(this.urlCiudadano+`${id}/`, formData);
  }

}

export interface ResponseImg{
  data:boolean
}