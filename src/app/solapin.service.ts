import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { urlBack } from './Finals';

@Injectable({
  providedIn: 'root'
})
export class SolapinService {
  private apiUrl = urlBack + 'solapin/';
  private apiUrlTipo = urlBack + 'tiposolapin/';
  private apiUrlCausasAnulacion = urlBack + 'causaanulacion/';
  private apiUrlTipoOperacion = urlBack + 'tipooperacionsolapin/';
  private apiUrlRegistroPagos = urlBack + 'registropago/';
  private apiUrlCiudadanoSolapinHist = urlBack + 'ciudadanosolapinhist/';
  private apiUrlNewSolapinHist = urlBack + 'newsolapinhist/';
  private apiUrlOperacionSolapin = urlBack + 'operacionsolapin/';
  private apiUrlSerialCount = this.apiUrl + 'get_solapin_count_by_serial/'

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }

  getSolapin(data: { numerosolapin: string }): Observable<any> {
    const url = `${this.apiUrl}get_solapin_by_numero/`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  createSolapin(data: any): Observable<any> {
    const url = `${this.apiUrl}create_solapin/`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSolapin(data: any): Observable<any> {
    const url = `${this.apiUrl}update_solapin/`;
    return this.http.put<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSolapin(numerosolapin: string): Observable<void> {
    const url = `${this.apiUrl}delete_solapin/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { numerosolapin }
    };

    return this.http.delete<void>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUltimoNumerosolapin(): Observable<any> {
    const url = `${this.apiUrl}ultimo_numerosolapin/`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUltimoCodigobarra(): Observable<any> {
    const url = `${this.apiUrl}ultimo_codigobarra/`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUltimoSerial(): Observable<any> {
    const url = `${this.apiUrl}ultimo_serial/`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTiposSolapin(): Observable<any> {
    const url = `${this.apiUrlTipo}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTipoSolapinById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlTipo}${id}`);
  }

  getSerialCount(serial: string): Observable<any> {
    return this.http.get(`${this.apiUrlSerialCount}?serial=${serial}`);
  }

  getCausasAnulacion(): Observable<any> {
    const url = `${this.apiUrlCausasAnulacion}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTipoOperacion(): Observable<any> {
    const url = `${this.apiUrlTipoOperacion}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createRegistroPago(data: any): Observable<any> {
    const url = `${this.apiUrlRegistroPagos}`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCiudadanoSolapinHist(data: any): Observable<any> {
    const url = `${this.apiUrlCiudadanoSolapinHist}`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  createNewSolapinHist(data: any): Observable<any> {
    const url = `${this.apiUrlNewSolapinHist}`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  createOperacionSolapin(data: any): Observable<any> {
    const url = `${this.apiUrlOperacionSolapin}`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
}