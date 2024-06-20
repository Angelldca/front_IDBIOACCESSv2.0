import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { urlBack } from './Finals';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = urlBack;
  private apiUrlRegistroPagos = urlBack + 'registropago/';

  constructor(private http: HttpClient) {}

  getRegistroPago(data: { fecha_inicio: Date, fecha_fin: Date }): Observable<any> {
    const url = `${this.apiUrlRegistroPagos}rango_fecha/`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRegistroPago_pagination(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Pagination>(url,{headers});
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }

}

export interface RegistroPago {
  idregistropago: any;
  idciudadano: number;
  idsolapin: number;
  idusuario: number;
  idcausaanulacion: number;
  monto: number,
  tipopago: string,
  idtransferencia: string,
  fecha: any,
  data: {
    idregistropago: any;
    idciudadano: number;
    idsolapin: number;
    idusuario: number;
    idcausaanulacion: number;
    monto: number,
    tipopago: string,
    idtransferencia: string,
    fecha: any,
  }
}

export interface Pagination {
  count: Number,
  next: string,
  previous: string,
  results: RegistroPago[]
}