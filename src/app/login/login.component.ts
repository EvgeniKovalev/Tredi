import { Component } from '@angular/core';
import { Login } from '../models/Login';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticationService } from '../data-access/authentication.service';
import { Requestor } from '../data-access/requestor';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private subscriptions = new Subscription();
  private requestor = new Requestor<string>();

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.get('direction') === '0') {
          this.requestor.load(this.authService.logout()).then((p) => {});
        } else {
          this.checkLoggedIn();
        }
      })
    );
  }

  checkLoggedIn() {
    this.requestor.load(this.authService.checkUserIsLogged()).then((p) => {
      if (!this.requestor.hasError && this.requestor.data === 'ok') {
        this.router.navigate(['workspace']);
      }
    });
  }

  login() {
    const loginModel: Login = {
      username: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };
    this.requestor.load(this.authService.login(loginModel)).then((p) => {
      this.loginForm.reset();
      this.checkLoggedIn();
    });
  }
}
