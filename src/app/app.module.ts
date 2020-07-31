import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { BvalcssDirective } from './bvalcss.directive';
import { CoauthorsComponent } from './coauthors/coauthors.component';
import { CoauthorEditComponent } from './coauthor-edit/coauthor-edit.component';
import { FilesComponent } from './files/files.component';
import { FileSizeModule } from 'ngx-filesize';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { HeaderComponent } from './header/header.component';
import { ResearchComponent } from './research/research.component';
import { PaperComponent } from './paper/paper.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { PeopleEditComponent } from './people-edit/people-edit.component';
import { TeachingComponent } from './teaching/teaching.component';
import { CourseComponent } from './course/course.component';
import { KeywordsEditComponent } from './keywords-edit/keywords-edit.component';
import { SoftwareDataComponent } from './software-data/software-data.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { SoftwareComponent } from './software/software.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { KeywordsComponent } from './keywords/keywords.component';
import { KeywordComponent } from './keyword/keyword.component'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { KeywordsSelectComponent } from './keywords-select/keywords-select.component';
import { ContactComponent } from './contact/contact.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { DatasetComponent } from './dataset/dataset.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AnalyticsDirective } from './analytics.directive';
import { ButtonPickerComponent } from './button-picker/button-picker.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    AdminComponent,
    NavbarComponent,
    BvalcssDirective,
    CoauthorsComponent,
    CoauthorEditComponent,
    FilesComponent,
    TimeAgoPipe,
    FrontComponent,
    LoginComponent,
    HeaderComponent,
    ResearchComponent,
    PaperComponent,
    ButtonsComponent,
    PeopleEditComponent,
    TeachingComponent,
    CourseComponent,
    KeywordsEditComponent,
    SoftwareDataComponent,
    SoftwaresComponent,
    SoftwareComponent,
    KeywordsComponent,
    KeywordComponent,
    PageNotFoundComponent,
    KeywordsSelectComponent,
    ContactComponent,
    DatasetsComponent,
    DatasetComponent,
    OnboardingComponent,
    AnalyticsDirective,
    ButtonPickerComponent,
    IconPickerComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, ReactiveFormsModule, HttpClientModule, PopoverModule.forRoot(),
    AppRoutingModule,
     CollapseModule.forRoot(), BrowserAnimationsModule, AlertModule.forRoot(), ButtonsModule.forRoot(), SortableModule.forRoot(), ModalModule.forRoot(), 
     TextareaAutosizeModule, FileSizeModule, ProgressbarModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  entryComponents: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
