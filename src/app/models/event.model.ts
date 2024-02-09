import { Company } from "./company.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export class Event {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    startDateTime: Date;
    endDateTime: Date;
    location: string;
    image: string;
    participants: string[];
    organizers: string[];
    tags: Tag[];
    userParticipating: number[] | undefined;
    realOrganizers: Company[];

    constructor(id: number, name: string, description: string, creationDate: Date, startDateTime: Date, endDateTime: Date, location: string, image: string, participants: string[], organizers: string[], tags: Tag[], userParticipating?: number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.location = location;
        this.image = image;
        this.participants = participants;
        this.organizers = organizers;
        this.tags = tags;
        this.realOrganizers = [];
        this.userParticipating = userParticipating;
    }
}
