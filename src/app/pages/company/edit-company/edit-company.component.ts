import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CompanyCategory } from '../../../models/company-category.model';
import { CompanyService } from '../../../core/company.service';
import { Company } from '../../../models/company.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.css'
})
export class EditCompanyComponent {
  editCompanyForm: FormGroup;
  errorManager: Array<any> = [];
  companyCategories: Array<CompanyCategory> = [];
  showCategories: boolean = false;
  selectedCompany: Company | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute
    ) { 
      this.editCompanyForm = this.formBuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        categories: [''],
        description: ['', Validators.required],
        creationDate: [''],
        location: ['', Validators.required],
        validated: ['']
      });
      
      this.route.params.subscribe(params => {
        // Access the 'id' parameter from the route
        const companyId = params['id'];
        
        this.getSelectedCompany(companyId).then(
          (data) => {
            console.log(data);
            this.selectedCompany = data!;
            
            this.setDefaultValues();
            
            this.editCompanyForm.get('type')?.valueChanges.subscribe((value) => {
              if (value == 'Entreprise') {
                this.showCategories = true;
              } else {
                this.showCategories = false;
      
                this.editCompanyForm.get('categories')?.setValue('');
                this.editCompanyForm.get('categories')?.clearValidators();
              }
      
              this.editCompanyForm.get('categories')?.setValidators(this.categoriesValidator(this.editCompanyForm.get('type')!));
              this.editCompanyForm.get('categories')?.updateValueAndValidity();
            });
          }
          );
        });
      }
      
      ngOnInit(): void {
        this.getCategories();
        
        console.log(this.companyCategories);
      }
      
      getCategories()  {
        this.companyService.getCompanyCategories().subscribe(
          (data: CompanyCategory[]) => {
            this.companyCategories = data;
          }
          );
        }
        
        async getSelectedCompany(id: number): Promise<Company|null> {
          let company=  await this.companyService.getCompanyById(id);
          
          if (company !== null) {
            return company;
          }
          
          return null;
        }
        
        findtruc(test : string) {
          return this.errorManager.find((element) => element.propertyPath === test);
        }
        
        updateCompany() {

          if (this.editCompanyForm.invalid) {
            return;
          }
          
          this.companyService.editCompany(this.selectedCompany?.id as number, this.editCompanyForm.value).then(
            (data) => {
              console.log(data);
            }
            );
          }
          
          onSubmit() {
            if (this.editCompanyForm?.invalid) {
              return;
            }
            const formData = this.editCompanyForm?.value;
          }
          
          setDefaultValues() {
            console.log(this.selectedCompany)
            this.editCompanyForm.patchValue({
              name: this.selectedCompany?.name,
              type: this.selectedCompany?.type,
              categories: this.selectedCompany?.categories,
              description: this.selectedCompany?.description,
              creationDate: this.selectedCompany?.creationDate,
              location: this.selectedCompany?.location,
              validated: this.selectedCompany?.validated
            });
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
        