
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';

export interface Ciudadano {
  editMode: boolean,
  nombre: string;
  apellidos: string;
  img: BinaryType;
  id: any ,
  dni: any ,
  solapin: any ,
  expediente: any ,
  fecha_nacimiento: any,
  edad: any ,
  rol_institucional: any ,
  area: any ,
  entidad: any,
  created_At: any,
  detail: string,
  data: {
    nombre: string;
    apellidos: string;
    img: BinaryType;
    id: any ,
    dni: any ,
    solapin: any ,
    expediente: any ,
    fecha_nacimiento: any,
    edad: any ,
    rol_institucional: any ,
    area: any ,
    entidad: any,
    created_At: any,
  }
}

export interface Pagination {
  count: Number,
  next: string,
  previous:string,
  results: Ciudadano[]


}

@Injectable()
export class CiudadanoService {
  ciudadanoUrl = 'http://127.0.0.1:8000/api/ciudadano/';

  constructor(private http: HttpClient) { }

  getCiudadanos() {
    return this.http.get<Ciudadano>(this.ciudadanoUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCiudadano_1() {
    return this.http.get<Ciudadano[]>(this.ciudadanoUrl);
  }
  getCiudadano_pagination(url:string) {
    return this.http.get<Pagination>(url);
  }


  getConfig_untyped_response() {
    return this.http.get(this.ciudadanoUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Ciudadano[]>> {
    return this.http.get<Ciudadano[]>(
      this.ciudadanoUrl, { observe: 'response' });
  }
  deleteCiudadano(id:string) {
    return this.http.delete<Ciudadano>(this.ciudadanoUrl+`${id}`)
  }
  updateCiudadano(id:string,data:any) {
    return this.http.put<Ciudadano>(this.ciudadanoUrl+`${id}/`,data)
  }
  createiudadano(data:any) {
    return this.http.post<Ciudadano>(this.ciudadanoUrl,data)
  }
  exportCiudadanos(url: string){
    return this.http.get<any>(url)
  }

  uploadFile( urlUploadFile:string,formData: FormData) {
    return this.http.post<any[]>(urlUploadFile, formData);
  }
  donwloadCiudadanoList(entidad: string){
      return this.http.get(`http://127.0.0.1:8000/api/ciudadanos/%7Bpk%7D/ciudadanos_entidad_csv/?entidad=${entidad}`)
  }

  getCiudadanos_fechas(){

  }
  donwloadCiudadanos_fecha(){
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
