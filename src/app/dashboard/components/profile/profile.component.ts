import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { User } from '../../../shared/models/user.model';

import { UsersService } from '../../../shared/services/users.service';
import { IResult } from './../../../shared/models/result';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;
  profileForm: FormGroup;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      'userName': new FormControl(null, [ Validators.required ]),
      'email': new FormControl(null),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
      'newPassword': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });

    this.usersService.getUser().subscribe(
      (res: IResult) => {
        if (res.status) {
          this.user = res.data;
          this.profileForm.setValue({
            'userName': this.user.userName,
            'email': this.user.email,
            'password': null,
            'newPassword': null
          });
        }
      }
    );
  }

  onSubmit() {
    if(this.profileForm.valid) {
      const userData = this.profileForm.value;
      this.usersService.editUser(userData)
        .subscribe((res: IResult) => {
          Object.assign(this.user, res.data);
          this.profileForm.setValue({
            'userName': this.user.userName,
            'email': this.user.email,
            'password': null,
            'newPassword': null
          });
          this.markAsValid();
        });
    } else {
      this.markAsInvalid();
    }
  }

  private markAsValid () {
    this.profileForm.controls.userName.markAsUntouched();
    this.profileForm.controls.password.markAsUntouched();
    this.profileForm.controls.newPassword.markAsUntouched();
    this.profileForm.controls.password.markAsPristine();
    this.profileForm.controls.newPassword.markAsPristine();
    this.profileForm.controls.userName.markAsPristine();
  }

  private markAsInvalid () {
    this.profileForm.controls.userName.markAsTouched();
    this.profileForm.controls.password.markAsTouched();
    this.profileForm.controls.newPassword.markAsTouched();
    this.profileForm.controls.password.markAsDirty();
    this.profileForm.controls.newPassword.markAsDirty();
    this.profileForm.controls.userName.markAsDirty();
  }

}
