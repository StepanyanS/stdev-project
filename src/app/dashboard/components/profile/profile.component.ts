// import native modules
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// import models
import { User } from '../../../shared/models/user.model';

// import services
import { UsersService } from '../../../shared/services/users.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
      (res) => {
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
      .subscribe((res) => {
        this.user = res;
        this.profileForm.setValue({
          'userName': this.user.userName,
          'email': this.user.email,
          'password': null,
          'newPassword': null
        });
      });
  }

}
