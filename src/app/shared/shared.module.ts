// import native modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

// import services
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService,
    UsersService
  ]
})
export class SharedModule { }
