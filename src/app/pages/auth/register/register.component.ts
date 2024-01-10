import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorManager: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required, this.validateEmail],
      plainPassword: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, { validators: this.checkPassword });
  }

  // checkPasswords(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirm_password = control.get('confirm_password');

  //   if (password?.value !== confirm_password?.value) {
  //     return { passwordsDoNotMatch: true };
  //   }

  //   return null;
  // }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.get('email');

    if (email?.value !== '') {
      return of({ invalidEmail: true });
    }

    return of(null);
  }

  checkPassword(control: AbstractControl): Observable<ValidationErrors | null> {
    const password = control.get('plainPassword');
    const confirm_password = control.get('confirm_password');

    if (password?.value !== confirm_password?.value) {
      return of({ passwordsDoNotMatch: true });
    }

    return of(null);
  }

  onSubmit() {
    if (this.registerForm?.invalid) {
      return;
    }
    const formData = this.registerForm?.value;
  }

  register() {
    this.errorManager = [];
    this.authService.register(this.registerForm.value).subscribe(resultat => {
      if (resultat) {
        this.router.navigate(['/login'])
      }
    });
  }

  findtruc(test : string) {
    return this.errorManager.find((element) => element.propertyPath === test);
  }
}
