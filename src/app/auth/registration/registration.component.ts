import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { MessageBase } from '../../shared/message.base';
import { IResult } from './../../shared/models/result';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent extends MessageBase implements OnInit {

  regForm: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.newMessage('', 'danger');
    this.regForm = new FormGroup({
      'userName': new FormControl(null, [ Validators.required ]),
      'email': new FormControl(null, [ Validators.required, Validators.email ], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
      'confirmPassword': new FormControl(null, [ Validators.required, Validators.minLength(6) ], this.checkPasswordConfirm.bind(this))
    });
  }

  onSubmit() {
    const {email, password, userName} = this.regForm.value;
    const userData  = new User(email, password, userName);
    this.usersService.AddNewUser(userData)
      .subscribe(
        (res: IResult) => {
          if (res.status) {
            this.router.navigate(['/login'], {
              queryParams: {
                nowCanLogin: true
              }
            });
          }
        },
        err => {
          if (!err.error.status) {
            this.showMessage({
              text: err.error.message,
              type: 'danger'
            });
          }
        }
      );
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((res, rej) => {
      this.usersService.getUserByEmail(control.value).
        subscribe((result: IResult) => {
          if (result.data) {
            res({
              forbiddenEmail: true
            });
          } else {
            res(null);
          }
      });
    });
  }

  checkPasswordConfirm(control: FormControl): Promise<any> {
    return new Promise((res, rej) => {
      if (this.regForm.value.password !== control.value) {
        res({
          confirmPassword: true
        });
      } else {
        res(null);
      }
    });
  }

}
