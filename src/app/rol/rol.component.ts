import { Component, OnInit } from '@angular/core';
import { CiudadanoService, IPersmisos, IRol } from '../ciudadano-table/ciudadano.service';
import {urlBack} from '../Finals'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit{
 rol: IRol[]  = []
 permisos: IPersmisos[] =[]
 permisosServer: IPersmisos[]  = []
 opcionesSeleccionadas: IPersmisos[] = [];
 opcionesSeleccionadasRol: IPersmisos[] = [];
 opcionesRolServer: IPersmisos[] = [];
 opcionesRol: IPersmisos[] = [];
 textoBusqueda: string = '';
 textoBusquedaRol: string = '';
 nameInput: string = ''
 rol_admin: IRol | null = null
 constructor(private ciudadanoService: CiudadanoService, private router: Router){
  const navigation = this.router.getCurrentNavigation();
  if (navigation && navigation.extras && navigation.extras.state) {
    this.rol_admin = navigation.extras.state['rol'];
  }
 }

  ngOnInit(): void {
    if(this.rol_admin){
      this.nameInput = this.rol_admin.name
    }
    this.getPermisos();
   
  }

  toggleSeleccion(opcion: IPersmisos, event: MouseEvent) {
    if (event.ctrlKey) {
      // Si se presiona Ctrl, se permite la selección múltiple
      const index = this.opcionesSeleccionadas.indexOf(opcion);
      if (index !== -1) {
        this.opcionesSeleccionadas.splice(index, 1); 
      } else {
        this.opcionesSeleccionadas.push(opcion);
      }
    } else {
      
      this.opcionesSeleccionadas = [opcion];
    }
   
  }
  isSelected(opcion: IPersmisos): boolean {
    return this.opcionesSeleccionadas.includes(opcion);
  }
  toggleSeleccionRol(opcion: IPersmisos, event: MouseEvent) {
    if (event.ctrlKey) {
      // Si se presiona Ctrl, se permite la selección múltiple
      const index = this.opcionesSeleccionadasRol.indexOf(opcion);
      if (index !== -1) {
        this.opcionesSeleccionadasRol.splice(index, 1); 
      } else {
        this.opcionesSeleccionadasRol.push(opcion);
      }
    } else {
      
      this.opcionesSeleccionadasRol = [opcion];
    }
   
  }
  isSelectedRol(opcion: IPersmisos): boolean {
    return this.opcionesSeleccionadasRol.includes(opcion);
  }

  addPermiso(){
    this.opcionesRol= this.opcionesRol.concat(this.opcionesSeleccionadas)
    this.opcionesRolServer =this.opcionesRolServer.concat(this.opcionesSeleccionadas)
    if(this.permisos)
    this.permisos = this.permisos.filter(elemento => !this.opcionesRol.includes(elemento));
    this.opcionesSeleccionadas = [];
    
  }
  removePermiso(){
    console.log(this.opcionesSeleccionadasRol)
    this.opcionesRol = this.opcionesRol.filter(elemento => !this.opcionesSeleccionadasRol.includes(elemento));
    
    this.opcionesRolServer = this.opcionesRolServer.filter(elemento => !this.opcionesSeleccionadasRol.includes(elemento));
    if(this.permisos){
      this.permisos = this.permisos.concat(this.opcionesSeleccionadasRol)
      //this.permisosServer.push(...this.permisos)
    }
    this.opcionesSeleccionadasRol = [];
  }
  buscarPermisos(event:any){
    this.textoBusqueda = event.target.value
    this.permisos= [];
    this.permisosServer.forEach(permiso => {
      if (permiso.codename.toLowerCase().includes(this.textoBusqueda.toLowerCase())) {
        
        if (!this.opcionesRol.includes(permiso)) {
          this.permisos.push(permiso);
        }
      }
    });
  }
  buscarPermisosRoll(event:any){
    this.textoBusquedaRol = event.target.value
    this.opcionesRol = [];
    this.opcionesRolServer.forEach(permiso => {
      if (permiso.codename.toLowerCase().includes(this.textoBusquedaRol.toLowerCase())) {
          this.opcionesRol.push(permiso);
      }
    });

  }

  addAllPermisos(){
    this.opcionesRol.push(...this.permisos)
    this.opcionesRolServer.push(...this.permisos)
    this.permisos = [];
    this.opcionesSeleccionadas = [];
  }
  removeAllPermisos(){
    this.permisos.push(...this.opcionesRol)
    this.opcionesRolServer = this.opcionesRolServer.filter(elemento => !this.opcionesRol.includes(elemento));
    this.opcionesRol = []
    this.opcionesSeleccionadasRol = []
  }

  getPermisos(){
    this.ciudadanoService.getAllPermissions( urlBack+'seguridad/permiso/' ).subscribe({
      next: data => { 
        this.permisosServer = data
       
          this.opcionesRol = data.filter(permiso => {
            if(this.rol_admin)
            return this.rol_admin.permissions.some(id => id === permiso.id);
            return
        });
        
        this.permisosServer = this.permisosServer.filter(permiso => {
          return !this.opcionesRol.some(opcion => opcion.id === permiso.id);
      });
        this.permisos = [...this.permisosServer];
        }, 
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Oops...',
          text: error.error.error,
          icon: 'error',
          footer: `${error.statusText} error ${error.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success px-4',
          },
          buttonsStyling: true,
          })
       
      }, // error path
    })
  }
  onKey(event: any) { // without type info
    this.nameInput = event.target.value;
  }   
  //Crear rol
  guardarRol(){
   if(this.nameInput.trim().length > 0 && this.opcionesRol.length > 0){
   let ids = this.opcionesRol.map(objeto => objeto.id);
   
     const data = {
      name: this.nameInput,
      permissions: ids
      }
      let url = urlBack+ 'seguridad/rol/';
      let method = 'POST'

      if(this.rol_admin){
        
          url += `${this.rol_admin.id}/`
          method = 'PUT'
      }
      
      this.ciudadanoService.createRol(url,data,method).subscribe({
        next: data => {
          Swal.fire({
            title: "Rol guardado correctamente",
            text: `Rol : ${data.name}`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
            
            },
            }).then(data=>{
              this.router.navigate(['/home/rol/']);
            })
        }, // success path
        error: error => {
          console.log(error)
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error',
            footer: `${error.error.name} error ${error.status}`,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary px-4'
            },
            buttonsStyling: false,
            })
         
        }, // error path
      })
   }else{
    Swal.fire({
      title: 'Oops...',
      text: "Proporcione un nombre de rol y asigne permisos",
      icon: 'error',
      footer: `Intente de nuevo`,
      confirmButtonText: 'Aceptar',
      customClass: {
          confirmButton: 'btn btn-primary px-4'
      },
      buttonsStyling: false,
      })
   }
    /*
   
    */
  }

  deleteRol(){
    this.ciudadanoService.deleteRol(urlBack+`seguridad/rol/${this.rol_admin?.id}/`).subscribe({
      next: data => {
        console.log(data)
        Swal.fire({
          title: "Rol eliminado correctamente",
          text: `Rol : ${this.rol_admin?.name}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then(data=>{
            this.router.navigate(['/home/rol/']);
          })
      }, // success path
      error: error => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error',
          footer: `${error.error.name} error ${error.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'btn btn-primary px-4'
          },
          buttonsStyling: false,
          })
       
      }, // error path
    })
  }

}
