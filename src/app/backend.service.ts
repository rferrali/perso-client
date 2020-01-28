import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person, Paper, File, User, Me, Course, Keyword, Software, Dataset } from './model'
import { HttpEventType } from '@angular/common/http'; 
import { map } from  'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private peopleUrl = 'https://server.rferrali.net/person';  
  private papersUrl = 'https://server.rferrali.net/paper';  
  private filesUrl = 'https://server.rferrali.net/file';  
  private coursesUrl = 'https://server.rferrali.net/course';  
  private loginUrl = 'https://server.rferrali.net/login';  
  private meUrl = 'https://server.rferrali.net/me';  
  private registerUrl = 'https://server.rferrali.net/register';  
  private keywordsUrl = 'https://server.rferrali.net/keyword';  
  private softwaresUrl = 'https://server.rferrali.net/software';  
  private datasetsUrl = 'https://server.rferrali.net/dataset';  

  constructor(
    private http: HttpClient
  ) { }

  ////////////////////////////////////
  //////////// USER //////////////////
  ////////////////////////////////////

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, {email: email, password: password}, httpOptions); 
  }

  getMe(): Observable<Me> {
    return this.http.get<Me>(this.meUrl); 
  }

  updateMe (me: Me): Observable<any> {
    return this.http.put(this.meUrl, me, httpOptions);
  } 

  register(me: any): Observable<Me> {
    return this.http.post<Me>(this.registerUrl, me, httpOptions);
  }

  ////////////////////////////////////
  //////////// PEOPLE ////////////////
  ////////////////////////////////////

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl); 
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  updatePerson (person: Person): Observable<any> {
    const url = `${this.peopleUrl}/${person.id}`;
    return this.http.put(url, person, httpOptions);
  }

  addPerson (person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person, httpOptions);
  }

  deletePerson (person: Person): Observable<Person> {
    const id = person.id;
    const url = `${this.peopleUrl}/${id}`;
    return this.http.delete<Person>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// COURSES ////////////////
  ////////////////////////////////////

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl); 
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  updateCourse (course: Course): Observable<any> {
    const url = `${this.coursesUrl}/${course.id}`;
    return this.http.put(url, course, httpOptions);
  }

  updateCourses (courses: Course[]): Observable<any> {
    return this.http.put(this.coursesUrl, courses, httpOptions);
  }

  addCourse (course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, httpOptions);
  }

  deleteCourse (course: Course): Observable<Course> {
    const id = course.id;
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete<Course>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// SOFTWARES //////////////
  ////////////////////////////////////

  getSoftwares(): Observable<Software[]> {
    return this.http.get<Software[]>(this.softwaresUrl); 
  }

  getSoftware(id: number): Observable<Software> {
    const url = `${this.softwaresUrl}/${id}`;
    return this.http.get<Software>(url);
  }

  updateSoftware (software: Software): Observable<any> {
    const url = `${this.softwaresUrl}/${software.id}`;
    return this.http.put(url, software, httpOptions);
  }

  updateSoftwares (softwares: Software[]): Observable<any> {
    return this.http.put(this.softwaresUrl, softwares, httpOptions);
  }

  addSoftware (software: Software): Observable<Software> {
    return this.http.post<Software>(this.softwaresUrl, software, httpOptions);
  }

  deleteSoftware (software: Software): Observable<Software> {
    const id = software.id;
    const url = `${this.softwaresUrl}/${id}`;
    return this.http.delete<Software>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// KEYWORDS //////////////
  ////////////////////////////////////

  getKeywords(): Observable<Keyword[]> {
    return this.http.get<Keyword[]>(this.keywordsUrl); 
  }

  getKeyword(id: number): Observable<Keyword> {
    const url = `${this.keywordsUrl}/${id}`;
    return this.http.get<Keyword>(url);
  }

  updateKeyword (keyword: Keyword): Observable<any> {
    const url = `${this.keywordsUrl}/${keyword.id}`;
    return this.http.put(url, keyword, httpOptions);
  }

  updateKeywords (keywords: Keyword[]): Observable<any> {
    return this.http.put(this.keywordsUrl, keywords, httpOptions);
  }

  addKeyword (keyword: Keyword): Observable<Keyword> {
    return this.http.post<Keyword>(this.keywordsUrl, keyword, httpOptions);
  }

  deleteKeyword (keyword: Keyword): Observable<Keyword> {
    const id = keyword.id;
    const url = `${this.keywordsUrl}/${id}`;
    return this.http.delete<Keyword>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// PAPERS ////////////////
  ////////////////////////////////////

  getPapers(): Observable<Paper[]> {
    return this.http.get<Paper[]>(this.papersUrl);
  }

  updatePaper (paper: Paper): Observable<any> {
    return this.http.put(`${this.papersUrl}/${paper.id}`, paper, httpOptions);
  }

  updatePapers (papers: Paper[]): Observable<any> {
    return this.http.put(this.papersUrl, papers, httpOptions);
  }

  addPaper (paper: Paper): Observable<Paper> {
    return this.http.post<Paper>(this.papersUrl, paper, httpOptions);
  }

  deletePaper (paper: Paper): Observable<Paper> {
    const id = paper.id;
    const url = `${this.papersUrl}/${id}`;
    return this.http.delete<Paper>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// FILES  ////////////////
  ////////////////////////////////////

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.filesUrl);
  }

  addFile (file: FormData): Observable<any> {
    let tmpFile = file.get('file') as any;
    return this.http.post<File>(this.filesUrl, file, { reportProgress: true, observe: 'events' }).
    pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          return { type: 'progress', progress: { name: tmpFile.name, size: event.total, progress: event.loaded } };

        case HttpEventType.Response:
          let file = event.body as File; 
          return { type: 'file', file: file } ; 
        
          default:
              // throw 'tcha mere';
              return { type: 'unhandled' };  
              // return `Unhandled event: ${event.type}`;
              // return Error('tcha mere'); 
    
      }
    }));
  }

  deleteFile (file: File): Observable<File> {
    const name = file.name;
    const url = `${this.filesUrl}/${name}`;
    return this.http.delete<File>(url, httpOptions);
  }

  ////////////////////////////////////
  //////////// DATASETS ////////////////
  ////////////////////////////////////

  getDatasets(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(this.datasetsUrl); 
  }

  getDataset(id: number): Observable<Dataset> {
    const url = `${this.datasetsUrl}/${id}`;
    return this.http.get<Dataset>(url);
  }

  updateDataset (dataset: Dataset): Observable<any> {
    const url = `${this.datasetsUrl}/${dataset.id}`;
    return this.http.put(url, dataset, httpOptions);
  }

  addDataset (dataset: Dataset): Observable<Dataset> {
    return this.http.post<Dataset>(this.datasetsUrl, dataset, httpOptions);
  }

  deleteDataset (dataset: Dataset): Observable<Dataset> {
    const id = dataset.id;
    const url = `${this.datasetsUrl}/${id}`;
    return this.http.delete<Dataset>(url, httpOptions);
  }


}
