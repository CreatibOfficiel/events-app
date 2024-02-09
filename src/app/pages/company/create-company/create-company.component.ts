import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CompanyService } from '../../../core/company.service';
import { CompanyCategory } from '../../../models/company-category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../core/user.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  companyForm: FormGroup;
  errorManager: Array<any> = [];
  companyCategories: Array<CompanyCategory> = [];
  showCategories: boolean = false;
  faAngleLeft = faAngleLeft;
  userData: User = new User();
  currentUserId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private userService: UserService,
    private _location: Location,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      categories: [''],
      description: ['', Validators.required],
      creationDate: [''],
      location: ['', Validators.required],
      validated: ['']
    });

    this.companyForm.get('type')?.valueChanges.subscribe((value) => {
      if (value == 'Entreprise') {
        this.showCategories = true;
      } else {
        this.showCategories = false;

        this.companyForm.get('categories')?.setValue('');
        this.companyForm.get('categories')?.clearValidators();
      }

      this.companyForm.get('categories')?.setValidators(this.categoriesValidator(this.companyForm.get('type')!));
      this.companyForm.get('categories')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getUserData();

    console.log(this.companyCategories);
  }

  createCompany() {
    this.companyForm.value.creationDate = new Date();
    this.companyForm.value.validated = false;
    console.log(this.companyForm.value);

    if (this.companyForm.invalid) {
      return;
    }

    this.companyService.postCompany(this.companyForm.value).then(
      (data) => {
        if (data !== null) {
          this.setUserCompany(data.id);
          console.log(data);
          this.router.navigate(['/company/detail/' + data.id]);

        } else {
          console.log('Error');
        }
      }
    );
  }

  onSubmit() {
    if (this.companyForm?.invalid) {
      return;
    }
    const formData = this.companyForm?.value;
  }

  getCategories() {
    this.companyService.getCompanyCategories().subscribe(
      (data: CompanyCategory[]) => {
        this.companyCategories = data;
      }
    );
  }

  categoriesValidator(typeControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeControl.value === 'Entreprise' && !control.value) {
        return { 'categoriesRequired': true };
      }
      return null;
    };
  }

  backClicked() {
    this._location.back();
  }

  setUserCompany(companyId: number) {
    if (this.currentUserId !== 0) {
      console.log(this.currentUserId);
      this.userService.setCompany(this.currentUserId, companyId).subscribe((res: any) => {
        console.log(res);
      });
    } else {
      console.log('User not found');
    }

  }

  async getUserData() {
    this.userData = await this.userService.getCurrentUser();
    this.cdr.detectChanges();
    if (this.userData.id !== undefined) {
      this.currentUserId = this.userData.id;
    }
  }

}
