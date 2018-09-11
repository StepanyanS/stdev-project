import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-dashbnoard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService.getProjects();
  }
}
