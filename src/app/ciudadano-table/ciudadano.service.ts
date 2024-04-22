
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
  
 })
export class CiudadanoService {
  ciudadanoUrl = 'http://127.0.0.1:8000/api/ciudadano/';
  userAuth: IUsuario | undefined = undefined;
  

  constructor(private http: HttpClient) {
 
   }

  getCiudadanos() {
    return this.http.get<Ciudadano>(this.ciudadanoUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCiudadano_1(id: string | null) {
    if (id != null)
      return this.http.get<Ciudadano[]>(this.ciudadanoUrl + `${id}/`);
    return null
  }
  getCiudadano_pagination(url: string) {
    return this.http.get<Pagination>(url);
  }


  getConfig_untyped_response() {
    return this.http.get(this.ciudadanoUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Ciudadano[]>> {
    return this.http.get<Ciudadano[]>(
      this.ciudadanoUrl, { observe: 'response' });
  }


  deleteCiudadano(id: string) {
    return this.http.delete<Ciudadano>(this.ciudadanoUrl + `${id}`)
  }
  updateCiudadano(id: string, data: any) {
    return this.http.put<Ciudadano>(this.ciudadanoUrl + `${id}/`, data)
  }
  eliminarAtributosVacios(objeto: any): any {
    return Object.fromEntries(
      Object.entries(objeto)
        .filter(([_, valor]) => valor !== null && valor !== undefined && valor !== '')
    );
  }
  createiudadano(data: any, id: any | undefined) {
    console.log(id)
    if (id != undefined || id != null) {
      data = this.eliminarAtributosVacios(data)
      console.log(data)
      return this.http.patch<Ciudadano>(this.ciudadanoUrl + `${id}/`, data)

    }
    else
      return this.http.post<Ciudadano>(this.ciudadanoUrl, data)

  }
  exportCiudadanos(url: string) {
    return this.http.get<any>(url)
  }

  uploadFile(urlUploadFile: string, formData: FormData) {
    return this.http.post<any[]>(urlUploadFile, formData);
  }
  donwloadCiudadanoList(entidad: string) {
    return this.http.get(`http://127.0.0.1:8000/api/ciudadanos/%7Bpk%7D/ciudadanos_entidad_csv/?entidad=${entidad}`)
  }

  setUser(user:IUsuario){
    this.userAuth = user;
    console.log(this.userAuth)
  }
  // login user
  loginCiudadano(data: any, urlLog: string) {
    return  this.http.post<IUserLog>(urlLog, data);;
  }
   logOut(){
    localStorage.removeItem('Token');
    this.userAuth = undefined
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

  public isAuthenticated() : boolean {
    const token = localStorage.getItem('Token');
    if(token){
      return true;
    }else{
      return false;

    }
  }
  getUserAutenticate() {
    if(this.userAuth != undefined)
    return this.userAuth;
  else return null
  }
  getUserRoles(): string[] {
    return this.userAuth ? this.userAuth.roles.map((role: any) => role.name) : [];
  }
  getAllPermissions(): string[] {
    let permissions: string[] = [];
    if (this.userAuth) {
      permissions = permissions.concat(this.userAuth.permissions);
      console.log(this.userAuth)
      if (this.userAuth.roles) {
        this.userAuth.roles.forEach((role: any) => {
          if (role.permissions) {
            permissions = permissions.concat(role.permissions);
          }
        });
      }
    }
    return permissions;
  }

  hasAllPermissions(requiredPermissions: string[]): boolean {
    const userPermissions = this.getAllPermissions();
    console.log(this.userAuth);
    console.log(userPermissions)
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }

}



export interface IUserLog {
  token: string,
  user: {
    id: number,
    username: string,
    last_login: Date,
    is_superuser: boolean,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: boolean,
    date_joined: Date,
    roles: [],
    permissions: []
  },
  detail: string
}
export interface IUsuario {
  id: number,
  username: string,
  last_login: Date,
  is_superuser: boolean,
  first_name: string,
  last_name: string,
  email: string,
  is_staff: boolean,
  is_active: boolean,
  date_joined: Date,
  roles: [],
  permissions: []
}
export interface IResp {
  detail: string
}
export interface Ciudadano {
  editMode: boolean,
  primernombre: string;
  segundonombre: string;
  primerapellido: string;
  segundoapellido: string;
  img: BinaryType;
  idciudadano: any,
  carnetidentidad: any,
  solapin: any,
  idexpediente: any,
  fechanacimiento: any,
  residente: boolean;
  sexo: string,
  provincia: string;
  municipio: string;
  roluniversitario: any,
  area: any,
  fecha: any,
  detail: string,
  data: {
    primernombre: string;
    segundonombre: string;
    primerapellido: string;
    segundoapellido: string;
    img: BinaryType;
    idciudadano: any,
    carnetidentidad: any,
    solapin: any,
    idexpediente: any,
    fechanacimiento: any,
    residente: boolean;
    sexo: string,
    provincia: string;
    municipio: string;
    roluniversitario: any,
    area: any,
    fecha: any,
  }
}

export interface Pagination {
  count: Number,
  next: string,
  previous: string,
  results: Ciudadano[]


}
