import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TasksPreviewListComponent} from './tasks-preview-list/tasks-preview-list.component';
import {ProjectCardComponent} from './project-card/project-card.component';
import { ProjectPageComponent } from './project-page/project-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    TasksPreviewListComponent,
    ProjectCardComponent,
    ProjectPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [
    ServerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
