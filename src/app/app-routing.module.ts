import { NgModule }             from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { FrontComponent } from './front/front.component'; 
import { LoginComponent } from './login/login.component'; 
import { AuthGuard } from './auth.guard'; 
import { ResearchComponent } from './research/research.component';
import { TeachingComponent } from './teaching/teaching.component';
import { SoftwareDataComponent } from './software-data/software-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { KeywordResolverService } from './keyword-resolver.service'; 

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'research', component: ResearchComponent }, 
  { 
    path: 'research/:keyword', 
    component: ResearchComponent, 
    resolve: {
      keyword: KeywordResolverService
    }
   }, 
  { path: 'teaching', component: TeachingComponent }, 
  { path: 'data', component: SoftwareDataComponent }, 
  { path: '', component: FrontComponent, pathMatch: 'full'}, 
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  exports: [ RouterModule ], 
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}


