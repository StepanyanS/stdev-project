// import native modules
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

// import services
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';

// import models
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('', 'danger');
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

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.usersService.loginUser(formData)
    .subscribe((res: string | false) => {
      if (!res) {
        this.showMessage({
          text: 'Something went wrong',
          type: 'danger'
        });
        return;
      }

      this.authService.login(res);
      this.router.navigate(['/dashboard/profile']);
    });
  }
}
