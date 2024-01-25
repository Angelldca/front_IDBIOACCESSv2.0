import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaDevicesService {
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
}
