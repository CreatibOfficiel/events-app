import { Company } from "./company.model";

export class User {
    id?: number;
    password?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    company?: Company;
    roles?: string[];

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, password?: string, company?: Company, roles?: string[]) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
        this.company = company;
        this.roles = roles;
    }

    getCompany(): Company | null | undefined {
        return this.isCompany() ? this.company : null;
    }

    isCompany(): boolean {
      return this.company !== undefined;
    }

    getEmail(): string {
        return this.email || '';
    }

    getId(): number {
        return this.id || -1;
    }

    getFirstName(): string {
        return this.firstname || '';
    }

    getLastName(): string {
        return this.lastname || '';
    }

    isAdmin(): boolean {
        return this.roles!.includes('ROLE_ADMIN');
    }
}
