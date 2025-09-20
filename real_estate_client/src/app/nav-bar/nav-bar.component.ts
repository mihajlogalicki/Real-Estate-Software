import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
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

   constructor(private messageService: MessageService) {}

   ngOnInit(){
    this.initMenuActions();
   }

   isUserLoggedIn() {
      this.loggedUser = localStorage.getItem('username');
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
            localStorage.removeItem('username');
            this.messageService.add({ severity: 'success', summary: 'Logout Successful!', life: 4000});
          }
        }
      ];
   }
}
