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
      'userName': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'newPassword': new FormControl(null)
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
      });
  }

}
