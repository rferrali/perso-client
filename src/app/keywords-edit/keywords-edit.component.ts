import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Keyword } from '../model'; 
import { FormArray, FormGroup } from '@angular/forms';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-keywords-edit',
  templateUrl: './keywords-edit.component.html',
  styleUrls: ['./keywords-edit.component.scss']
})
export class KeywordsEditComponent implements OnInit, OnChanges {

  @Input() editable: boolean; 
  allKeywords: Keyword[]; 
  @Input() keywords: FormGroup; 
  keywordsArray: Keyword[]; 
  kFilter: string; 

  get keywordsFormArray() {
    return this.keywords.get('keywords') as FormArray;
  }

  constructor(
    private store: StoreService, 
    private router: ActivatedRoute
  ) { 
    this.router.url.subscribe(url => {
      this.kFilter = url.length == 2 ? url[1].path : undefined; 
    });
   }

  test(keyword: Keyword): boolean {
    if(!this.kFilter) {
      return false; 
    } else {
      return this.kFilter == keyword.slug; 
    }
  }

  ngOnInit () {
    this.initialize(); 
  } 
  
  ngOnChanges() {
    this.initialize();
  }

  initialize() {
    this.store.keywords.subscribe(keywords => {
      this.allKeywords = [...keywords]
        .sort(function(a, b){
          var x = a.keyword.toLowerCase();
          var y = b.keyword.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        }); 
      this.keywordsArray = this.allKeywords
        .filter((value, i) => this.keywordsFormArray.value[i]);
    });
    this.keywordsArray;
  }

}
