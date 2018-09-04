import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter',
          [
            style({opacity: 0, transform: 'translateY(-15px)'}),
            stagger('50ms',
              animate('500ms ease-out',
                style({opacity: 1, transform: 'translateY(0px)'})))
          ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects()
      .subscribe(
        res => {
          this.projects = res.data;
        },
        err => {
          console.log(err.error);
        }
      );
  }

  onRemoveProject(id: number) {
    this.projectsService.removeProject(id)
      .subscribe(
        res => {
          document.getElementById(id.toString()).hidden = true;
        },
        err => {
          console.log(err.error);
        }
      );
  }

}
