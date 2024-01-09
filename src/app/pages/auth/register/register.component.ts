import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required, this.validateEmail],
      password: ['', Validators.required, Validators.minLength(6)],
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
    const password = control.get('password');
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
    console.log('Form submitted');
  }
}
