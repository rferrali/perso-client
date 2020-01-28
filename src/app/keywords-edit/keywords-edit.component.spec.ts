import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsEditComponent } from './keywords-edit.component';

describe('KeywordsEditComponent', () => {
  let component: KeywordsEditComponent;
  let fixture: ComponentFixture<KeywordsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
