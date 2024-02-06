import { CompanyCategory } from "./company-category.model";

export class Company {
    id: number;
    name: string;
    type: string;
    categories: CompanyCategory[];
    description: string;
    creationDate: Date;
    location: string;
    validated: boolean;

    constructor(id: number, name: string, type: string, categories: CompanyCategory[], description: string, creationDate: Date, location: string, validated: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.categories = categories;
        this.description = description;
        this.creationDate = creationDate;
        this.location = location;
        this.validated = validated;
    }

    getCompanyType(): string {
        return this.type;
    }

    getDescritpion(): string {
        return this.description;
    }
}
