export class Person {
    id: number; 
    first_name: string;
    last_name: string;
    url: string;
}

export class Button {
    type: number;
    icon: string;
    label: string; 
    content: string;
}

export class Paper {
    id: number; 
    title: string;
    abstract: string;
    year: number; 
    status: string;
    order: number;
    type: number; 
    coauthors: Person[]; 
    buttons: Button[]; 
    keywords: Keyword[]; 
}

export class Software {
    id: number; 
    name: string; 
    slug: string; 
    details: string; 
    order: number; 
    buttons: Button[]; 
}

export class File {
    name: string;
    url: string; 
    extension: string; 
    size: number; 
    date: Date; 
}

export class Message {
    message: string;
    type: string;
}

export class FileMessage {
    message: string;
    type: string;
    name: string; 
}

export class Keyword {
    id: number; 
    keyword: string; 
    description: string; 
    icon: string; 
    order: number; 
    slug: string;
}

export class Course {
    id: number; 
    name: string; 
    term: string; 
    level: string; 
    details: string; 
    role: string; 
    order: number; 
    buttons: Button[]; 
    people: Person[]; 
}

export class User { 
    id: number; 
    first_name: string; 
    last_name: string; 
    email: string; 
    token?: string;
}

export class Me {
    first_name: string; 
    last_name: string; 
    position: string; 
    about: string; 
    cv: string; 
    address: string; 
    map_url: string;
    socials: Social[]
}

export class Social {
    name: string; 
    icon: string; 
    url: string; 
}

export class Dataset {
    id: number; 
    description: string;
}
