import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './property/property-add/add-property/add-property.component';
import { PropertyListComponent } from './property/property-list/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail/property-detail.component';
import { ErrorPageComponent } from './error-page/error-page/error-page.component';
import { UserLoginComponent } from './user/login/user-login/user-login.component';
import { UserRegisterComponent } from './user/register/user-register/user-register.component';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';

const routes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'property-detail/:id', component: PropertyDetailComponent, resolve: {property_resolver: PropertyDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'property-not-found', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
