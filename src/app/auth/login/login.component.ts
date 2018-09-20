import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';

import { MessageBase } from '../../shared/message.base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends MessageBase implements OnInit {

  loginForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.newMessage('', 'danger');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Now You can log in',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'You must log in',
            type: 'danger'
          });
        }
      });
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.usersService.loginUser(formData)
    .subscribe(
      res => {
        this.authService.login(res.data);
        this.router.navigate(['/dashboard/profile']);
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
}
