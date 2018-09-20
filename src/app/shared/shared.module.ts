import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule, MatStepperModule, MatIconModule } from '@angular/material';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatStepperModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    UsersService
  ]
})
export class SharedModule { }
