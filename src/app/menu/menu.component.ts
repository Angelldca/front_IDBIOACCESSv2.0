import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-menu-cd',
  standalone: true,
  imports: [MatSidenavModule ,MatCheckboxModule, FormsModule, MatButtonModule,MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  shouldRun = true;
  events: string[] = [];
  opened: boolean = false;
}
