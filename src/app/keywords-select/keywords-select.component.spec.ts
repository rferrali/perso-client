import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsSelectComponent } from './keywords-select.component';

describe('KeywordsSelectComponent', () => {
  let component: KeywordsSelectComponent;
  let fixture: ComponentFixture<KeywordsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
