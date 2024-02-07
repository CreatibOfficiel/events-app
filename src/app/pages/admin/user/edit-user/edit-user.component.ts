import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../models/user.model';
import { Company } from '../../../../models/company.model';
import { CompanyService } from '../../../../core/company.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editUserForm: FormGroup;
  selectedUser: User | undefined;
  companies: Company[] = [];

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
    });

    this.route.params.subscribe(params => {
      const userId = params['id'];

      this.getSelectedUser(userId).then(
        (data) => {
          this.selectedUser = data!;
          this.setDefaultValues();
        }
      );
    });
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  async getSelectedUser(userId: number) {
    let user = await this.userService.getUserById(userId);

    if (user !== null) {
      return user;
    }

    return null;

  }

  setDefaultValues() {
    this.editUserForm.patchValue({
      firstname: this.selectedUser?.firstname,
      lastname: this.selectedUser?.lastname,
      email: this.selectedUser?.email,
      company: this.selectedUser?.company
    });
  }

  getCompanies() {
    this.companyService.getAllCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  updateUser() {
    if (this.editUserForm.invalid) {
      return;
    }

    if (this.selectedUser?.email === this.editUserForm.value.email) {
      this.editUserForm.removeControl('email');
    }

    if (this.selectedUser !== undefined) {
      this.userService.updateUser(this.selectedUser.id ?? 0, this.editUserForm.value).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log("User is undefined");
    }
    
  }
}
