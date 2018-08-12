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
  profileForm: FormGroup

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = Object.assign({}, this.authService.getUser());
    this.profileForm = new FormGroup({
      'name': new FormControl(this.user.name),
      'email': new FormControl(this.user.email),
      'password': new FormControl(null)
    });
  }

  onSubmit() {
    const userData = this.profileForm.value;
    this.usersService.editUser(userData)
      .subscribe(() => {
        console.log('Edited');
      });
  }

}
