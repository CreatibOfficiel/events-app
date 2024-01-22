import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
        creationDate: ['', Validators.required],
        location: ['', Validators.required],
        validated: ['', Validators.required]
      });

      this.companyForm.get('type')?.valueChanges.subscribe((value) => {
        if (value == 'Entreprise') {
          this.showCategories = true;
        } else {
          this.showCategories = false;
        }
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
    
    findtruc(test : string) {
      return this.errorManager.find((element) => element.propertyPath === test);
    }

    getCategories()  {
      this.companyService.getCompanyCategories().subscribe(
        (data: CompanyCategory[]) => {
          this.companyCategories = data;
        }
      );
    }

  }
  