import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../store.service'; 
import { File } from '../model'; 
import { MessageService } from '../message.service'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  deleteMode = false; 
  uploadMode = false; 
  files: File[]; 
  @ViewChild('fileView', {static: false}) fileView;  

  constructor(
    public store: StoreService, 
    public msg: MessageService
  ) { }

  ngOnInit() {
    this.store.files.subscribe(x => {this.files = x}); 
  }
  

  addFiles() {
    this.fileView.nativeElement.click(); 
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for (const file of Object.values(event.target.files)) {
        let tmp = file as any; 
        const formData = new FormData()
        formData.append('file', tmp, tmp.relativePath);
        this.store.addFile(formData); 
      }
    }
  }

  deleteFile(file: File) {
    this.store.deleteFile(file); 
  }

}
