import {Component, OnInit} from '@angular/core';
import {Project} from '../Project';
import {Task} from '../Task';
import {ProjectsService} from '../projects.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  project: Project = {name: '', descriptions: '', id: -1};
  tasks: Task[] = [];

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    const name = this.projectsService.getCurrentProjectName();
    this.projectsService.getCurrentProject(name).subscribe(res => this.project = res);
    this.projectsService.getTasks().subscribe(res => this.tasks = res);
  }

}
