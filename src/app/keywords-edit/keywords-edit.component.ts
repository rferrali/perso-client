import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from '../model'; 
import { FormArray, FormBuilder } from '@angular/forms';
import { StoreService } from '../store.service'

@Component({
  selector: 'app-keywords-edit',
  templateUrl: './keywords-edit.component.html',
  styleUrls: ['./keywords-edit.component.scss']
})
export class KeywordsEditComponent implements OnInit {

  @Input() editMode: boolean; 
  @Input() allKeywords: Keyword[]; 
  @Input() keywords: Keyword[]; 
  @Input() keywordsForm: FormArray; 
  @Input() kFilter: Keyword; 

  constructor(
    private fb: FormBuilder, 
    private store: StoreService
  ) { }

  test(keyword: Keyword): boolean {
    if(!this.kFilter) {
      return false; 
    } else {
      return this.kFilter.keyword == keyword.keyword; 
    }
  }
  

  ngOnInit() {}

}
