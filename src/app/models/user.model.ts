import { Company } from "./company.model";

export class User {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    company?: Company;
    token?: string;

    constructor(id: number, firstName: string, lastName: string, username: string, password: string, company: Company, token: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.company = company;
        this.token = token;
    }
}