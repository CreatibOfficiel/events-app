import { Company } from "./company.model";

export class User {
    id: number;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    company?: Company;
    token?: string;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, company: Company, token: string) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
        this.company = company;
        this.token = token;
    }
}