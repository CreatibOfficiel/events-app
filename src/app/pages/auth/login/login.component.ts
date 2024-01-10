import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/authentication.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);
  constructor(
    private authService: AuthenticationService,
    private router: Router
) {
  }

  login() {
    //
    if (this.emailFormControl.valid && this.passwordFormControl.valid
    && this.emailFormControl.value !== '' && this.passwordFormControl.value !== ''
    && this.emailFormControl.value !== null && this.passwordFormControl.value !== null) {


      this.authService.login(this.emailFormControl.value, this.passwordFormControl.value ).subscribe(resultat => {
        if (resultat) {
          this.router.navigate(['']);
        } else {
          console.log('Échec de la connexion');
        }
      });

    }
  }

  ngOnInit(): void {
  }
}
