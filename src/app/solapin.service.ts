import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolapinService {
  private apiUrl = 'http://127.0.0.1:8000/api/solapin/';
  private apiUrlTipo = 'http://127.0.0.1:8000/api/tiposolapin/';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }

  createSolapin(data: any): Observable<any> {
    const url = `${this.apiUrl}create_solapin/`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSolapin(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/delete_solapin/`;
    return this.http.delete<any>(url)
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
}