import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadanoService, IPersmisos, IRol, IUsuario, IUsuarioBack } from '../ciudadano-table/ciudadano.service';
import { urlBack } from '../Finals';
import Swal from 'sweetalert2';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-usermanage',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './usermanage.component.html',
  styleUrl: './usermanage.component.css'
})
export class UsermanageComponent implements OnInit{
nameInput = ''
user: IUsuarioBack| null = null; // Assuming user has any type

constructor(private router: Router, private ciudadanoService: CiudadanoService) { }
permisosDisponibles: IPersmisos []= [];
rolesDisponibles :IRol[]= [];
permisosUsuario: IPersmisos[]= [];
rolesUsuario : IRol[]= [];

permisosDisponiblesServer: IPersmisos []= [];
rolesDisponiblesServer :IRol[]= [];
permisosUsuarioServer: IPersmisos[]= [];
rolesUsuarioServer : IRol[]= [];

rolSelect: string[]= [];
rolSelectRemove: string[] = [];
permisoSelect: string[] = [];
permisoSelectRemove: string[] = [];
searchPerUser : string = ''
searchPerDisp : string = ''
searchRolUser : string = ''
searchRolDisp : string = ''


nombre = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]);
apellido = new FormControl('', [Validators.required, 
  Validators.pattern(/^[a-zA-Z\s]+$/), 
]);
email = new FormControl('', [Validators.required, Validators.email]);
is_active = new FormControl(false, [Validators.required, ]);
is_staff = new FormControl(false, [Validators.required, ]);
is_superuser = new FormControl(false, [Validators.required, ]);
username = new FormControl('', [Validators.required, 
]);
password = new FormControl('', [Validators.required,
])
confirm_password = new FormControl('', [Validators.required, 
])
formInfoPersonal = new FormGroup({
  first_name:this.nombre,
  last_name:this.apellido,
  email: this.email,
  is_active:this.is_active,
  is_staff:this.is_staff,
  is_superuser:this.is_superuser,
});

formCredenciales = new FormGroup({
  username:this.username,
  password:this.password,
  confirm_password:this.confirm_password,
});

ngOnInit(): void {
  // Retrieving user from the state object
  this.user = history.state.user;
  if(this.user){
    this.nameInput = this.user.username
    this.permisosUsuario = this.user.user_permissions
    this.permisosUsuarioServer = [...this.permisosUsuario]
    this.rolesUsuario = this.user.groups
    this.rolesUsuarioServer = [...this.rolesUsuario]
  
    this.getRoles()
    this.getPermissions()
    this.username.setValue(this.user.username)
    this.nombre.setValue(this.user.first_name)
    this.apellido.setValue(this.user.last_name)
    this.email.setValue(this.user.email)
    this.is_active.setValue(this.user.is_active)
    this.is_staff.setValue(this.user.is_staff)
    this.is_superuser.setValue(this.user.is_superuser)
    
    
  }
}
deleteUser(){
  this.ciudadanoService.deleteUser(urlBack+`seguridad/user/${this.user?.id}/`).subscribe({
    next: data => {
      
      Swal.fire({
        title: "Contraseña actualizada correctamente",
        text: `Usuario: ${this.user?.username}`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        
        customClass: {
            confirmButton: 'btn btn-primary px-4',
            cancelButton: 'btn btn-danger ms-2 px-4',
        
        },
        }).then(data=>{
          this.router.navigate(['/home']);
        })
    }, // success path
    error: error => {
 console.log(error)
  
      Swal.fire({
        title: 'Oops...',
        text: error,
        icon: 'error',
        footer: `${error.statusText} error ${error.status}`,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'btn btn-primary px-4'
        },
        buttonsStyling: false,
        })
     
    }, // error path
  })
 

}
onSubmitCredenciales(form: FormGroup){
   
  let data  = {
    ...form.value,
   }
   if(data.password !== data.confirm_password)
   console.log("las contrasenas no coinciden")
   else{
    this.ciudadanoService.updatePassword(urlBack+`seguridad/user/${this.user?.id}/`,data).subscribe({
      next: data => {
        
        Swal.fire({
          title: "Contraseña actualizada correctamente",
          text: `Usuario: ${this.user?.username}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then(data=>{
            //this.limpiarInputs();
          })
      }, // success path
      error: error => {
   console.log(error)
    
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error',
          footer: `${error.statusText} error ${error.status}`,
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

onSubmitInformations(form: FormGroup){
  let permisosIds = this.permisosUsuario.map(permiso => permiso.id)
  let rolesIds = this.rolesUsuario.map(rol => rol.id)
  console.log(rolesIds)
  console.log(permisosIds)
  let data  = {
    ...form.value,
    user_permissions: permisosIds,
    groups:rolesIds,
   }
  console.log(data)
    this.ciudadanoService.updateUser(urlBack+`seguridad/user/${this.user?.id}/`,data).subscribe({
      next: data => {
        console.log(data)
        Swal.fire({
          title: "Contraseña actualizada correctamente",
          text: `Usuario: ${this.user?.username}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then(data=>{
            //this.limpiarInputs();
          })
      }, // success path
      error: error => {
   console.log(error)
    
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error',
          footer: `${error.statusText} error ${error.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'btn btn-primary px-4'
          },
          buttonsStyling: false,
          })
       
      }, // error path
    })
   
}
addRol(){
 this.rolesDisponibles.forEach((rol) => {
  if (this.rolSelect.includes( rol.id.toString() )) {
    this.rolesUsuario.push(rol);
    this.rolesUsuarioServer.push(rol);
    this.rolesDisponibles = this.rolesDisponibles.filter(r => r!= rol)
    this.rolesDisponiblesServer = this.rolesDisponiblesServer.filter(r => r!= rol)
  }
});
this.rolSelect =[]

}
removeRol(){
 
  this.rolesUsuario.forEach((rol) => {
    if (this.rolSelectRemove.includes( rol.id.toString() )) {
      this.rolesDisponibles.push(rol);
      this.rolesDisponiblesServer.push(rol)
      this.rolesUsuario = this.rolesUsuario.filter(r => r!= rol)
      this.rolesUsuarioServer = this.rolesUsuarioServer.filter(r => r!= rol)
    }
  });
  this.rolSelectRemove =[]
}
addPermiso(){
  
  this.permisosDisponibles.forEach((permiso) => {
    if (this.permisoSelect.includes( permiso.id.toString() )) {
      this.permisosUsuario.push(permiso);
      this.permisosUsuarioServer.push(permiso);
      this.permisosDisponibles = this.permisosDisponibles.filter(p => p!= permiso)
      this.permisosDisponiblesServer = this.permisosDisponiblesServer.filter(p => p!= permiso)
    }
  });
  this.permisoSelect =[]
 }
 removePermiso(){

  this.permisosUsuario.forEach((permiso) => {
    if (this.permisoSelectRemove.includes( permiso.id.toString() )) {
      this.permisosDisponibles.push(permiso);
      this.permisosDisponiblesServer.push(permiso);
      this.permisosUsuario = this.permisosUsuario.filter(p => p!= permiso)
      this.permisosUsuarioServer = this.permisosUsuarioServer.filter(p => p!= permiso)
    }
  });
  this.permisoSelectRemove =[]
 }

 buscarPermisosUser(event:any){
  this.searchPerUser = event.target.value
  this.permisosUsuario = [];
  this.permisosUsuarioServer.forEach(permiso => {
    if (permiso.codename.toLowerCase().includes(this.searchPerUser.toLowerCase())) {
        this.permisosUsuario.push(permiso);
    }
  });

}
buscarPermisosDisponible(event:any){
  this.searchPerDisp = event.target.value
  this.permisosDisponibles = [];
  this.permisosDisponiblesServer.forEach(permiso => {
    if (permiso.codename.toLowerCase().includes(this.searchPerDisp.toLowerCase())) {
        this.permisosDisponibles.push(permiso);
    }
  });

}
buscarRolesDisponible(event:any){
  this.searchRolDisp = event.target.value
  this.rolesDisponibles = [];
  this.rolesDisponiblesServer.forEach(rol => {
    if (rol.name.toLowerCase().includes(this.searchRolDisp.toLowerCase())) {
        this.rolesDisponibles.push(rol);
    }
  });

}
buscarRolesUser(event:any){
  this.searchRolUser = event.target.value
  this.rolesUsuario = [];
  this.rolesUsuarioServer.forEach(rol => {
    if (rol.name.toLowerCase().includes(this.searchRolUser.toLowerCase())) {
        this.rolesUsuario.push(rol);
    }
  });

}

getPermissions(){
  this.ciudadanoService.getAllPermissions(urlBack+'seguridad/permiso').subscribe({
    next: data => { 
       this.permisosDisponibles = data
       
       this.permisosDisponibles = this.permisosDisponibles.filter(option2 => 
        !this.permisosUsuario.find(option1 => option1.id === option2.id)
      );
      this.permisosDisponiblesServer = [...this.permisosDisponibles]
      // selectedRolUser: new FormControl(this.rolesDisponibles),
      //selectedPermisosUser: new FormControl(this.permisosDisponibles),
    

      }, 
    error: (error) => {
      
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
getRoles(){
  this.ciudadanoService.getAllRol(urlBack+'seguridad/rol').subscribe({
    next: data => { 
       this.rolesDisponibles = data
       
       this.rolesDisponibles = this.rolesDisponibles.filter(option2 => 
        !this.rolesUsuario.find(option1 => option1.id === option2.id)
      );
      this.rolesDisponiblesServer = [...this.rolesDisponibles]

      }, 
    error: (error) => {
     
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
}
