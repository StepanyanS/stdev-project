// import native modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';

// define routes
const authRoutes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: 'login',  component: LoginComponent },
      { path: 'registration',  component: RegistrationComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
