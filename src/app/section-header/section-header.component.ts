import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {

  private _disablePreview: boolean; 
  private _left: boolean;
  @Input() 
  get disablePreview() {
    return this._disablePreview; 
  };
  set disablePreview(value: any) {
    this._disablePreview = ! value === undefined
  }

  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() { }

}
