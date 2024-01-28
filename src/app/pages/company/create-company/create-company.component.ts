import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../core/company.service';
import { CompanyCategory } from '../../../models/company-category.model';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  companyForm: FormGroup;
  errorManager: Array<any> = [];
  companyCategories: Array<CompanyCategory> = [];
  showCategories: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
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
          console.log(data);
        }
      );
    }

    onSubmit() {
      if (this.companyForm?.invalid) {
        return;
      }
      const formData = this.companyForm?.value;
    }
    
    getCategories()  {
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

  }
  