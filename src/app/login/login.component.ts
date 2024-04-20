import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mostrarMensaje = true;
  mostrarContrasena=true;
  
  onInput1(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }

  onInput2(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarContrasena = false;
    } else {
      this.mostrarContrasena = true;
    }
  }


}
