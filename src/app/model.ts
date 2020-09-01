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

export class Listable {
    id: number;
    order: number; 
    hasButtons: boolean;
    hasPeople: boolean;
    hasKeywords: boolean;
    buttons?: Button[];
    people?: Person[];
    keywords?: Keyword[];
    constructor(object?: any) {
        if(object) {
            this.id = object.id; 
            this.order = object.order;
        }
    }
}

export class Paper extends Listable {
    title: string;
    abstract: string;
    citation: string;
    year: number; 
    status: string;
    order: number;
    type: number; 
    hasKeywords = true; 
    hasPeople = true; 
    hasButtons = true; 
    buttons = [] as Button[];
    people = [] as Person[];
    keywords = [] as Keyword[];

    constructor(object?: any) {
        super(object); 
        if(object) {
            this.title = object.title; 
            this.abstract = object.abstract; 
            this.citation = object.citation; 
            this.year = object.year; 
            this.status = object.status; 
            this.type = object.type; 
            this.people = object.people; 
            this.buttons = object.buttons; 
            this.keywords = object.keywords.sort(function(a, b){
                var x = a.keyword.toLowerCase();
                var y = b.keyword.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              });
        }
    }
}

export class Software extends Listable {
    name: string; 
    slug: string; 
    details: string; 
    hasKeywords = false; 
    hasPeople = false; 
    hasButtons = true;
    keywords = [] as Keyword[];

    constructor(object?: any) {
        super(object);
        if(object) {
            this.id = object.id; 
            this.name = object.name; 
            this.slug = object.slug; 
            this.details = object.details; 
            this.buttons = object.buttons;
        } 
    }
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

export class Course extends Listable {
    name: string; 
    term: string; 
    level: string; 
    details: string; 
    role: string; 
    hasKeywords = false; 
    hasPeople = true; 
    hasButtons = true;
    buttons = [] as Button[];
    people = [] as Person[];

    constructor(object?: any) {
        super(object);
        if(object) {
            this.name = object.name;
            this.term = object.term;
            this.level = object.level;
            this.details = object.details;
            this.role = object.role;
            this.buttons = object.buttons;
            this.people = object.people; 
        }
    }
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
