import { Component, OnInit } from '@angular/core';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { ActivatedRoute, Router } from '@angular/router';
import { urlBack } from '../Finals';

@Component({
  selector: 'app-cas',
  standalone: true,
  imports: [],
  templateUrl: './cas.component.html',
  styleUrl: './cas.component.css'
})
export class CasComponent  implements OnInit{
  constructor(private ciudadanoService: CiudadanoService, private router: Router, private activeRoute: ActivatedRoute){}

  token  = ''
  ngOnInit(): void {
    const route = this.router
    //route.navigate(['home'],{ state: { user: data.user } });
    this.activeRoute.params.subscribe(params => {
      this.token = params['token'];
    });

    if (this.token){
      localStorage.setItem("Token", this.token)
      this.ciudadanoService.validateToken(this.token).subscribe({
        next: data =>{
          if(data.user_id){
            this.ciudadanoService.getUsers(urlBack +`seguridad/user/user_id?id=${data.user_id}`).subscribe({
                next: data =>{
                  
                  const userL = data.user
                  
              
                   if(userL.permissions.length > 0 || userL.roles.length > 0 || userL.is_superuser){
                     route.navigate(['home'],{ state: { user: userL } });
                     localStorage.setItem("user", JSON.stringify(userL))
                   }
                   else{
                     localStorage.removeItem("user")
                     localStorage.removeItem("Token")
                     //window.location.href = 'http://localhost:8000/accounts/login'
                     route.navigate(['']);
                   }
              
                 
                },  error: (error) => {
                  console.log(error)
                  
                },
                
            })

          }
        },
        error: (error) => {
          console.log(error)
          localStorage.removeItem("user")
          localStorage.removeItem("Token")
        },
      })
    }
    route.navigate(['']);
    
  }
}
