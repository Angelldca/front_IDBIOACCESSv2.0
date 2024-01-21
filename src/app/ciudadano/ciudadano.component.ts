import { Component } from '@angular/core';

@Component({
  selector: 'app-ciudadano',
  standalone: true,
  imports: [],
  templateUrl: './ciudadano.component.html',
  styleUrl: './ciudadano.component.css'
})
export class CiudadanoComponent {
  name="Angel";
  isLoggedIn=true;
}
