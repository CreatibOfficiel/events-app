import { Company } from "./company.model";

export class User {
    id?: number;
    password?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    company?: Company;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, password?: string, company?: Company) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
        this.company = company;
    }

    getFullName(): string {
        return `${this.getFirstName()} ${this.getLastName()}`;
    }

    getCompany(): string {
        return this.company?.name || '';
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
}
