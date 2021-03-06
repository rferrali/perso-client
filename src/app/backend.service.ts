import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person, Paper, File, User, Me, Keyword, Dataset, Listable } from './model'
import { HttpEventType } from '@angular/common/http'; 
import { map, switchMap } from  'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private peopleUrl = `${environment.serverUrl}/person`;  
  private papersUrl = `${environment.serverUrl}/paper`;  
  private filesUrl = `${environment.serverUrl}/file`;  
  private coursesUrl = `${environment.serverUrl}/course`;  
  private loginUrl = `${environment.serverUrl}/login`;  
  private meUrl = `${environment.serverUrl}/me`;  
  private registerUrl = `${environment.serverUrl}/register`;  
  private keywordsUrl = `${environment.serverUrl}/keyword`;  
  private softwaresUrl = `${environment.serverUrl}/software`;  
  private datasetsUrl = `${environment.serverUrl}/dataset`;  
  private iconsUrl = `${environment.serverUrl}/icons`;  

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
    return this.http.get<any>(this.meUrl).pipe(
      switchMap(me => of(new Me(me)))
    ); 
  }

  updateMe (me: Me): Observable<Me> {
    return this.http.put(this.meUrl, me, httpOptions).pipe(
      switchMap(me => of(new Me(me)))
    );
  } 

  register(me: any): Observable<Me> {
    return this.http.post<Me>(this.registerUrl, me, httpOptions).pipe(
      switchMap(me => of(new Me(me)))
    );
  }

  ////////////////////////////////////
  //////////// PEOPLE ////////////////
  ////////////////////////////////////

  getPeople(): Observable<Person[]> {
    return this.http.get<any[]>(this.peopleUrl);
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

  /////////////////////////////////////
  /////////// GENERIC CRUD ////////////
  /////////////////////////////////////

  getListables<T extends Listable>(c: new (object?: any) => T): Observable<T[]> {
    const proto = new c();
    const url = `${environment.serverUrl}/${proto.api}`
    return this.http.get<any[]>(url).pipe(
      switchMap(objects => of(objects.map(object => new c(object))))
    );
  }

  getListable<T extends Listable>(c: new (object?: any) => T, id: number): Observable<T> {
    const proto = new c();
    const url = `${environment.serverUrl}/${proto.api}/${id}`
    return this.http.get<any>(url).pipe(
      switchMap(object => of(new c(object)))
    );
  }

  updateListable<T extends Listable>(c: new (object?: any) => T, object: T): Observable<T> {
    const url = `${environment.serverUrl}/${object.api}/${object.id}`;
    return this.http.put(url, object, httpOptions).pipe(
      switchMap(object => of(new c(object)))
    );
  }

  updateListables<T extends Listable> (objects: T[]): Observable<any> {
    const url = `${environment.serverUrl}/${objects[0].api}`;
    return this.http.put(url, objects, httpOptions);
  }

  addListable<T extends Listable> (c: new (object?: any) => T, object: T): Observable<T> {
    const url = `${environment.serverUrl}/${object.api}`;
    return this.http.post<any>(url, object, httpOptions).pipe(
      switchMap(object => of(new c(object)))
    );
  }

  deleteListable<T extends Listable> (c: new (object?: any) => T, object: T): Observable<T> {
    const url = `${environment.serverUrl}/${object.api}/${object.id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      switchMap(object => of(new c(object)))
    );
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
            return { type: 'unhandled' };  
    
      }
    }));
  }

  deleteFile (file: File): Observable<File> {
    const name = file.name;
    const url = `${this.filesUrl}/${name}`;
    return this.http.delete<File>(url, httpOptions);
  }


  ////////////////////////////////////
  //////////// ICONS ////////////////
  ////////////////////////////////////

  getIcons(): Observable<string[]> {
    return this.http.get<string[]>(this.iconsUrl);
  }

}
