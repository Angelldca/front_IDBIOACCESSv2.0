
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';
import { urlBack } from '../Finals';



@Injectable({
  providedIn: 'root',
  
 })
export class CiudadanoService {
  ciudadanoUrl = urlBack+'ciudadano/';
  userAuth: IUsuario | undefined = undefined;

  constructor(private http: HttpClient) {
    const userLocal = localStorage.getItem('user')
    if(userLocal)
    this.userAuth = JSON.parse(userLocal)
   }
   validateToken(token: any){
   
    return this.http.post<any>(urlBack+'seguridad/validatetoken/',{token})
  }
  getCiudadanos() {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Ciudadano>(this.ciudadanoUrl,{headers})
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCiudadano_1(id: string | null) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    if (id != null)
      return this.http.get<Ciudadano[]>(this.ciudadanoUrl + `${id}/`,{headers});
    return null
  }
  getCiudadano_pagination(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Pagination>(url,{headers});
  }


  getConfig_untyped_response() {
    return this.http.get(this.ciudadanoUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Ciudadano[]>> {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<Ciudadano[]>(
      this.ciudadanoUrl, { observe: 'response' });
  }


  deleteCiudadano(id: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.delete<Ciudadano>(this.ciudadanoUrl + `${id}`,{headers})
  }

  makeInactive(id: string, data:any){
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<Ciudadano>(urlBack + `ciudadanobash/${id}/make_estado_delete/`,data,{headers})
  }
  updateCiudadano(id: string, data: any) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<Ciudadano>(this.ciudadanoUrl + `${id}/`, data,{headers})
  }
  eliminarAtributosVacios(objeto: any): any {
    return Object.fromEntries(
      Object.entries(objeto)
        .filter(([_, valor]) => valor !== null && valor !== undefined && valor !== '')
    );
  }
  createiudadano(data: any, id: any | undefined) {
   const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

    if (id != undefined || id != null) {
      data = this.eliminarAtributosVacios(data)

      return this.http.patch<Ciudadano>(urlBack+`ciudadanobash/${id}/`, data, {headers})
    }
    else{
      return this.http.post<Ciudadano>(urlBack+`ciudadanobash/`, data, {headers})

    }

  }
createCiudadano(data: any, id: any | undefined) {
    const token = localStorage.getItem('Token')
     const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   });
  return this.http.post<Ciudadano>(urlBack+`ciudadano/`, data, {headers})
}


  exportCiudadanos(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    //'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<any>(url, {headers})
  }

  uploadFile(urlUploadFile: string, formData: FormData) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<any[]>(urlUploadFile, formData, {headers});
  }
  donwloadCiudadanoList() {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get(`http://127.0.0.1:8000/api/ciudadanos/%7Bpk%7D/ciudadanos_entidad_csv/`,{headers})
  }

  setUser(user:IUsuario){
    this.userAuth = user;
    
  }
  // login user
  loginCiudadano(data: any, urlLog: string) {
    return  this.http.post<IUserLog>(urlLog, data);;
  }
   logOut(){
    localStorage.removeItem('Token');
    localStorage.removeItem('user');
    this.userAuth = undefined
   }
   updatePassword(url: string, data: any) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.patch<any>(url, data,{headers})
  }
  updateUser(url: string, data: any) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  
    return this.http.patch<any>(url, data,{headers})
  }
  createUser(url: string, data: any) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<any>(url, data,{headers})
  }
  deleteUser(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.delete<any>(url,{headers})
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

  ///Seguridad 
  getAllPermissions(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<IPersmisos[]>(url,{headers});
  }
  getAllRol(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<IRol[]>(url,{headers});
  }
  getUserPermissons(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<any>(url,{headers});
  }
////crear rol
  createRol(url: string, data: any, method: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  if(method == 'POST')
    return this.http.post<any>(url,data,{headers});
  else
    return this.http.put<any>(url,data,{headers});
  }
  ///Eliminar rol
  delete(url: string) {
    const token = localStorage.getItem('Token')
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.delete<any>(url,{headers});

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
  getUserAllPermissions(): string[] {
    let permissions: string[] = [];
    const userLocal =   localStorage.getItem('user')
    if(userLocal && !this.userAuth){
      this.userAuth = JSON.parse(userLocal)
     
    }
    if (this.userAuth) {
      permissions = permissions.concat(this.userAuth.permissions);
    
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
    const userLocal =   localStorage.getItem('user')
    if(userLocal && !this.userAuth){
      this.userAuth = JSON.parse(userLocal)
     
    }
    if (this.userAuth?.is_superuser)
    return true
    const userPermissions = this.getUserAllPermissions();
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
////Users
getUsers(url: string) {
  const token = localStorage.getItem('Token')
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});
  return this.http.get<any>(url,{headers});
}

getUserInfo() {
  // Obtener la cookie sessionid
  const sessionid = this.getCookie('sessionid');
  console.log("Esta es la cookie "+ sessionid)

 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken'),
    'Cookie': `sessionid=${sessionid}`
  });

  // Realizar la solicitud HTTP
  return this.http.get<any>('http://localhost:8000/user_logeado', { headers: headers });
}

// Función para obtener el valor de una cookie por su nombre
 getCookie(name: string) {
  // Separar las cookies por punto y coma
  var cookies = document.cookie.split(';');
  
  // Iterar sobre las cookies para encontrar la que buscamos
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if(cookie.indexOf(name) === 0) {
          return cookie.substring(name.length + 1, cookie.length);
      }
  }
  // Si no se encuentra la cookie, devolvemos null
  return "";
}

}

export interface IPersmisos{
  
    id: number,
    name: string,
    codename: string,
    content_type: number,
    detail: string
  
}
export interface IRol{
  id: number,
  name: string,
  permissions: []
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
  permissions: [],

}//  user_permissions: [],
  //groups:[],

  export interface IUsuarioBack {
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
    user_permissions: [],
    groups:[],
  
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
  identificadorroluni: any,
  area: any,
  identificadorarea: any,
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
