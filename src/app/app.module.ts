import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolsDetailComponent } from './schools-detail/schools-detail.component';
import { SchoolService } from './school.service';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { ClassService } from './class.service';
import { SchoolsEditComponent } from './schools-edit/schools-edit.component';
import { SchoolsShowComponent } from './schools-show/schools-show.component';
import { ClassEditComponent } from './class-edit/class-edit.component';

@NgModule({
  imports:      [ 
    BrowserModule, FormsModule, HttpClientModule,ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '',redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component: HomeComponent },
      {path: 'detail-school/:id', component: SchoolsShowComponent},
      {path: 'manager', component: ManagerComponent},
      {path: 'manager/edit-school/:id', component: SchoolsEditComponent},
      {path: 'manager/detail-school/:id', component: SchoolsDetailComponent},
      {path: 'manager/edit-school', component: SchoolsEditComponent},
      {path: 'manager/detail-school/:id/edit-class/:classid', component: ClassEditComponent},
      {path: 'manager/detail-school/:id/edit-class', component: ClassEditComponent},
    ])
  ],
  declarations: [ AppComponent, HelloComponent, SchoolsListComponent, SchoolsDetailComponent, HomeComponent, ManagerComponent, SchoolsEditComponent, SchoolsShowComponent, ClassEditComponent],
  bootstrap:    [ AppComponent ],
  providers: [SchoolService, ClassService]
})
export class AppModule { }
