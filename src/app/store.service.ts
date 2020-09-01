import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http'; 
import { Person, Paper, File, Message, Keyword, Course, Software, Dataset, Me } from './model'; 
import { MessageService } from './message.service';
import { BackendService } from './backend.service'; 
import { AuthenticationService } from './authentication.service';  


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _people: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);    
  public readonly people: Observable<Person[]> = this._people.asObservable();
  private _papers: BehaviorSubject<Paper[]> = new BehaviorSubject<Paper[]>([]);  
  public readonly papers: Observable<Paper[]> = this._papers.asObservable();
  private _courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);  
  public readonly courses: Observable<Course[]> = this._courses.asObservable();
  private _files: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);    
  public readonly files: Observable<File[]> = this._files.asObservable();
  private _keywords: BehaviorSubject<Keyword[]> = new BehaviorSubject<Keyword[]>([]);    
  public readonly keywords: Observable<Keyword[]> = this._keywords.asObservable();
  private _softwares: BehaviorSubject<Software[]> = new BehaviorSubject<Software[]>([]);    
  public readonly softwares: Observable<Software[]> = this._softwares.asObservable();
  private _datasets: BehaviorSubject<Dataset[]> = new BehaviorSubject<Dataset[]>([]);    
  public readonly datasets: Observable<Dataset[]> = this._datasets.asObservable();
  private _me: BehaviorSubject<Me> = new BehaviorSubject<Me>(new Me);    
  public readonly me: Observable<Me> = this._me.asObservable();


  constructor(
    private messageService: MessageService, 
    private backend: BackendService, 
    private auth: AuthenticationService
    ) { 
    this.loadInitialData(); 
  }

  

  loadInitialData() {
    this.backend.getPeople()
      .subscribe(
          people => {
              this._people.next(people);
          },
          () => console.log("Error retrieving People")
      );
    this.backend.getPapers()
    .subscribe(
        papers => {
            this._papers.next(papers);
        },
        () => console.log("Error retrieving Papers")
    );
    this.backend.getFiles()
    .subscribe(
        files => {
            this._files.next(files);
        },
        () => console.log("Error retrieving Files")
    );
    this.backend.getCourses()
    .subscribe(
        courses => {
            this._courses.next(courses);
        },
        () => console.log("Error retrieving Courses")
    );
    this.backend.getKeywords()
    .subscribe(
        keywords => {
            this._keywords.next(keywords);
        },
        () => console.log("Error retrieving Keywords")
    );
    this.backend.getSoftwares()
    .subscribe(
        softwares => {
            this._softwares.next(softwares);
        },
        () => console.log("Error retrieving Softwares")
    );
    this.backend.getDatasets()
    .subscribe(
        datasets => {
            this._datasets.next(datasets);
        },
        () => console.log("Error retrieving Datasets")
    );
    this.backend.getMe().subscribe(
        me => {
            this._me.next(me);
        }
    ); 
  }

  /** Log a PeopleService message with the MessageService */
  private log(message: string, type?: string) {
    if(!type) type = 'info'; 
    this.messageService.add({message: message, type: type} as Message);
  }


  ///////////////////////////////////////
  ////////////// ME /////////////////////
  ///////////////////////////////////////

  register(me: any) {
    this.backend.register(me).subscribe(x => {
      this._me.next(x); 
      this.auth.login(me.email, me.password); 
    })
  }

  updateMe(me: Me): void {
    this.backend.updateMe(me).subscribe(() => {
      this._me.next(me); 
    }); 
  }



  ///////////////////////////////////////
  ///////////// PEOPLE //////////////////
  ///////////////////////////////////////

  updatePerson (person: Person): void {
    this.backend.updatePerson(person).
    subscribe(() => {
      let newPeople: Person[] = this._people.getValue();
      let id: number = newPeople.findIndex(h => h.id == person.id); 
      newPeople[id] = person; 
      this._people.next(newPeople); 
    })
  }

  addPerson (person: Person): void {
    this.backend.addPerson(person).
    subscribe(np => {
      let newPeople: Person[] = this._people.getValue();
      newPeople.push(np); 
      this._people.next(newPeople); 
    })
  }

  deletePerson (person: Person): void {
    this.backend.deletePerson(person).
    subscribe(
      () => {
        let newPeople: Person[] = this._people.getValue();
        newPeople = newPeople.filter(h => h !== person);
        let newPapers: Paper[] = this._papers.getValue(); 
        newPapers = newPapers.map(paper => {
          paper.people = paper.people.filter(h => h.id != person.id); 
          return paper; 
        }); 
        this._people.next(newPeople);
        this._papers.next(newPapers);
      }
    )
  }

  ///////////////////////////////////////
  ///////////// PAPERS //////////////////
  ///////////////////////////////////////

  updatePapers (papers: Paper[]): void {
    this.backend.updatePapers(papers).
    subscribe(() => {
      this._papers.next(papers); 
    })
  }

  updatePaper (paper: Paper): void {
    console.log(paper);
    this.backend.updatePaper(paper).
      subscribe(() => {
        let newPapers: Paper[] = this._papers.getValue();
        let id: number = newPapers.findIndex(h => h.id == paper.id); 
        newPapers[id] = paper; 
        this._papers.next(newPapers); 
      });
  }

  addPaper (paper: Paper): void {
    this.backend.addPaper(paper).
    subscribe(np => {
      let newPapers: Paper[] = this._papers.getValue();
      newPapers.push(np); 
      this._papers.next(newPapers); 
    })
  }

  deletePaper (paper: Paper): void {
    this.backend.deletePaper(paper).
    subscribe(
      () => {
        let newPapers: Paper[] = this._papers.getValue();
        newPapers = newPapers.filter(h => h !== paper);
        this._papers.next(newPapers);
      }
    )
  }

  ///////////////////////////////////////
  ///////////// COURSES //////////////////
  ///////////////////////////////////////

  updateCourses (courses: Course[]): void {
    this.backend.updateCourses(courses).
    subscribe(() => {
      this._courses.next(courses); 
    })
  }

  updateCourse (course: Course): void {
    this.backend.updateCourse(course).
    subscribe(() => {
      let newCourses: Course[] = this._courses.getValue();
      let id: number = newCourses.findIndex(h => h.id == course.id); 
      newCourses[id] = course; 
      this._courses.next(newCourses); 
    })
  }

  addCourse (course: Course): void {
    this.backend.addCourse(course).
    subscribe(np => {
      let newCourses: Course[] = this._courses.getValue();
      newCourses.push(np); 
      this._courses.next(newCourses); 
    })
  }

  deleteCourse (course: Course): void {
    this.backend.deleteCourse(course).
    subscribe(
      () => {
        let newCourses: Course[] = this._courses.getValue();
        newCourses = newCourses.filter(h => h !== course);
        this._courses.next(newCourses);
      }
    )
  }

  ///////////////////////////////////////
  ///////////// SOFTWARES //////////////////
  ///////////////////////////////////////

  updateSoftwares (softwares: Software[]): void {
    this.backend.updateSoftwares(softwares).
    subscribe(() => {
      this._softwares.next(softwares); 
    })
  }

  updateSoftware (software: Software): void {
    this.backend.updateSoftware(software).
    subscribe(() => {
      let newSoftwares: Software[] = this._softwares.getValue();
      let id: number = newSoftwares.findIndex(h => h.id == software.id); 
      newSoftwares[id] = software; 
      this._softwares.next(newSoftwares); 
    })
  }

  addSoftware (software: Software): void {
    this.backend.addSoftware(software).
    subscribe(np => {
      let newSoftwares: Software[] = this._softwares.getValue();
      newSoftwares.push(np); 
      this._softwares.next(newSoftwares); 
    })
  }

  deleteSoftware (software: Software): void {
    this.backend.deleteSoftware(software).
    subscribe(
      () => {
        let newSoftwares: Software[] = this._softwares.getValue();
        newSoftwares = newSoftwares.filter(h => h !== software);
        this._softwares.next(newSoftwares);
      }
    )
  }

  ///////////////////////////////////////
  ///////////// DATASETS ////////////////
  ///////////////////////////////////////

  updateDataset (dataset: Dataset): void {
    this.backend.updateDataset(dataset).
    subscribe(() => {
      let newDatasets: Dataset[] = this._datasets.getValue();
      let id: number = newDatasets.findIndex(h => h.id == dataset.id); 
      newDatasets[id] = dataset; 
      this._datasets.next(newDatasets); 
    })
  }

  addDataset (dataset: Dataset): void {
    this.backend.addDataset(dataset).
    subscribe(np => {
      let newDatasets: Dataset[] = this._datasets.getValue();
      newDatasets.push(np); 
      this._datasets.next(newDatasets); 
    })
  }

  deleteDataset (dataset: Dataset): void {
    this.backend.deleteDataset(dataset).
    subscribe(
      () => {
        let newDatasets: Dataset[] = this._datasets.getValue();
        newDatasets = newDatasets.filter(h => h !== dataset);
        this._datasets.next(newDatasets);
      }
    )
  }

  ///////////////////////////////////////
  ///////////// KEYWORDS //////////////////
  ///////////////////////////////////////

  updateKeywords (keywords: Keyword[]): void {
    this.backend.updateKeywords(keywords).
    subscribe(() => {
      this._keywords.next(keywords); 
    })
  }

  updateKeyword (keyword: Keyword): void {
    this.backend.updateKeyword(keyword).
    subscribe(() => {
      let newKeywords: Keyword[] = this._keywords.getValue();
      let id: number = newKeywords.findIndex(h => h.id == keyword.id); 
      newKeywords[id] = keyword; 
      this._keywords.next(newKeywords); 
    })
  }

  addKeyword (keyword: Keyword): void {
    this.backend.addKeyword(keyword).
    subscribe(np => {
      let newKeywords: Keyword[] = this._keywords.getValue();
      newKeywords.push(np); 
      this._keywords.next(newKeywords); 
    })
  }

  deleteKeyword (keyword: Keyword): void {
    this.backend.deleteKeyword(keyword).
    subscribe(
      () => {
        let newKeywords: Keyword[] = this._keywords.getValue();
        newKeywords = newKeywords.filter(h => h !== keyword);
        this._keywords.next(newKeywords);
      }
    )
  }

  isKeyword (slug: string) {
    return this.backend.getKeywords().pipe(
      map(keywords => keywords.find(x => {return x.slug == slug}))
    )
  }

  ///////////////////////////////////////
  ///////////// FILES ///////////////////
  ///////////////////////////////////////

  addFile (file: FormData): any {
    let ff = file.get('file') as any;
    this.backend.addFile(file).
    subscribe(event => {

      switch(event.type) {
        case 'file': 
          let newFiles: File[] = this._files.getValue();
          let file = event.file as File; 
          newFiles = newFiles.filter(x => x.name != file.name); 
          newFiles.unshift(file); 
          this._files.next(newFiles); 
          this.messageService.addFileMessage(
            {name: ff.name, size: ff.size, progress: 100, type: 'complete'}
          );
          this.messageService.removeFileMessage(ff.name); 
          break; 
        case 'progress':
            const progress = Math.round(100 * event.progress.progress / event.progress.size); 
            this.messageService.addFileMessage(
              {name: ff.name, size: event.progress.size, progress: progress, type: 'progress'}
            );
          break;
      }
    }, 
    err => {
      var mini: string; 
      switch(err.status) {
        case 413: 
          mini = 'This file is too large.'; 
          break; 
        case 400: 
          mini = 'This file may be corrupt.'; 
          break; 
        default: 
          mini = 'Weird problem. You should look under the hood.'; 
          break; 
      }
      let message = 'Oops! ' + mini; 
      this.messageService.addFileMessage(
        {name: ff.name, size: ff.size, progress: 100, type:'error', message: message}
      );
    });
  }

  deleteFile (file: File): void {
    this.backend.deleteFile(file).
    subscribe(
      () => {
        let newFiles: File[] = this._files.getValue();
        newFiles = newFiles.filter(h => h !== file);
        this._files.next(newFiles);
      }
    )
  }
  
}
