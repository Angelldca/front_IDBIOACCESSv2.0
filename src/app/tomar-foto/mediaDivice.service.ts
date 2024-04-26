import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudadano } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';

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
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
   
    'Authorization': `Bearer ${token}`
  });
    
    return this.http.post<ResponseImg>(urlBack+'img/validate/validateimg/', formData,{headers});
  }

  createImage(id: string | null , blobImagen: string| undefined, url:string){
    const formData = new FormData();
    if(blobImagen && id){
      formData.append('foto', blobImagen);
      formData.append('idciudadano', id);
      formData.append('valida', 'true');
    }
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Authorization': `Token ${token}`
  });
    return this.http.post<ImagenFacial>(url, formData,{headers});
    
  }
  updateImage(id: string | null , blobImagen: string| undefined){
    const formData = new FormData();
    if(blobImagen && id){
      formData.append('foto', blobImagen);
      formData.append('idciudadano', id);
    }
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  });
    return this.http.patch<ImagenFacial>(this.url, formData, {headers});
    
  }
  getImage(id: string|null) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  });
    if(id != null)
    return this.http.get<ImagenFacial[]>(this.url+`${id}/`,{headers});
    return null
  }

}

export interface ResponseImg{
  data:boolean
}

export interface ImagenFacial{
  results: any,
  detail: string,
  iciudadano: string,
  foto: any,
  valida: boolean,
  fecha: Date,
  fecha_actualizacion: Date,
  data: any,
}