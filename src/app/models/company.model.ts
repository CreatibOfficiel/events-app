import { CompanyCategory } from "./company-category.model";
import { Event } from "./event.model";

export class Company {
    id: number;
    name: string;
    type: string;
    categories: CompanyCategory[];
    description: string;
    creationDate: Date;
    location: string;
    validated: boolean;
    events: [];
    suscribersNumber: number | undefined;

    constructor(id: number, name: string, type: string, categories: CompanyCategory[], description: string, creationDate: Date, location: string, validated: boolean, events: [], suscribersNumber: number = 0) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.categories = categories;
        this.description = description;
        this.creationDate = creationDate;
        this.location = location;
        this.validated = validated;
        this.events = events;
        this.suscribersNumber = suscribersNumber;
    }

    getCompanyType(): string {
        return this.type;
    }

    getDescritpion(): string {
        return this.description;
    }
}
