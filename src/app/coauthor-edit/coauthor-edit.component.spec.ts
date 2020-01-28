import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoauthorEditComponent } from './coauthor-edit.component';

describe('CoauthorEditComponent', () => {
  let component: CoauthorEditComponent;
  let fixture: ComponentFixture<CoauthorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoauthorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoauthorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
