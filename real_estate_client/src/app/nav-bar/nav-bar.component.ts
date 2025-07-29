import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

   public loggedUser : string;
   public items : MenuItem[];

   ngOnInit(){
    this.initMenuActions();
   }

   isUserLoggedIn() {
      this.loggedUser = localStorage.getItem('token');
      return this.loggedUser;
   }
   
   initMenuActions(){
      this.items = [
        { 
            label: 'View Dashboard',
            icon: 'fa-solid fa-dashboard'
        },
        { 
          label: 'My Profile',
          icon: 'fa-solid fa-user'
        },
        { 
          label: 'Sign Out', 
          icon: 'fa-solid fa-right-from-bracket', 
          command: () => {
            localStorage.removeItem('token');
          }
        }
      ];
   }
}
