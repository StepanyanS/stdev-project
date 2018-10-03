import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule, MatStepperModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ConfirmPopupComponent } from '../dashboard/components/projects/projects.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  declarations: [
    ConfirmPopupComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatStepperModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    UsersService
  ],
  entryComponents: [ConfirmPopupComponent],
})
export class SharedModule { }
