import { environment } from 'src/environments/environment';

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
    get url() {
        return this.content.substring(0,4) == 'http' ? this.content : `${environment.serverUrl}/${this.content}`;
    }
    constructor(object?: any) {
        if(object) {
            this.type = object.type;
            this.icon = object.icon;
            this.label = object.label;
            this.content = object.content;
        }
    }
}

export class Listable {
    id: number;
    order: number; 
    hasButtons: boolean;
    hasPeople: boolean;
    hasKeywords: boolean;
    hasType: boolean;
    api: string;
    buttons?: Button[];
    people?: Person[];
    keywords?: Keyword[];
    type?: string;
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
    type = 'No category'; 
    api = 'paper';
    hasKeywords = true; 
    hasPeople = true; 
    hasButtons = true; 
    hasType = true; 
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
            this.buttons = object.buttons.map(b => new Button(b)); 
            this.keywords = object.keywords
                .map(k => new Keyword(k))
                .sort(function(a, b){
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
    hasType = false; 
    api = 'software';
    keywords = [] as Keyword[];
    buttons = [] as Button[];

    constructor(object?: any) {
        super(object);
        if(object) {
            this.id = object.id; 
            this.name = object.name; 
            this.slug = object.slug; 
            this.details = object.details; 
            this.buttons = object.buttons.map(b => new Button(b));
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

export class Keyword extends Listable {
    keyword: string; 
    description: string; 
    icon: string; 
    order: number; 
    slug: string;
    api = 'keyword';
    hasButtons = false;
    hasKeywords = false;
    hasPeople = false;
    hasType = false;
    constructor(object?: any) {
        super(object); 
        if(object) {
            this.keyword = object.keyword;
            this.description = object.description;
            this.icon = object.icon;
            this.order = object.order;
            this.slug = object.slug;
        }
    }
}

export class Course extends Listable {
    name: string; 
    term: string; 
    level: string; 
    details: string; 
    role: string; 
    api = 'course';
    hasKeywords = false; 
    hasPeople = true; 
    hasButtons = true;
    hasType = false; 
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
            this.buttons = object.buttons.map(b => new Button(b));
            this.people = object.people; 
        }
    }
}

export class Dataset extends Listable {
    description: string;
    hasButtons = false; 
    hasKeywords = false; 
    hasPeople = false;
    hasType = false; 
    api = 'dataset';

    constructor(object?: any) {
        super(object); 
        if(object) {
            this.description = object.description;
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
    socials: Social[];
    get cv_url() {
        if(!this.cv) return null;
        return this.cv.substring(0,4) == 'http' ? this.cv : `${environment.serverUrl}/${this.cv}`;
    }
    constructor(object?: any) {
        if(object) {
            this.first_name = object.first_name;
            this.last_name = object.last_name;
            this.position = object.position;
            this.about = object.about;
            this.cv = object.cv;
            this.address = object.address;
            this.map_url = object.map_url;
            this.socials = object.socials;
        }
    }
}

export class Social {
    name: string; 
    icon: string; 
    url: string; 
}

