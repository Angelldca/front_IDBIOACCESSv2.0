import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-menu-cd',
  standalone: true,
  imports: [MatSidenavModule ,MatCheckboxModule,
     FormsModule, MatButtonModule,MatIconModule, 
     RouterLink, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  shouldRun = true;
  events: string[] = [];
  opened: boolean = false;
  isSubmenuVisible = false;

  showSubmenu() {
    this.isSubmenuVisible = true;
  }

  hideSubmenu() {
    this.isSubmenuVisible = false;
  }
}
