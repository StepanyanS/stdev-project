import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { saveAs } from 'file-saver/FileSaver';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { Project, Projects } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { AppState } from '../../redux/app.state';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
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
export class ProjectsComponent implements OnInit, OnDestroy {

  public projects: Project[];
  private projectsState$: Observable<Projects>;
  private projectsSubscriber: Subscription;
  private reversed = false;

  constructor(
    private projectsService: ProjectsService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.projectsState$ = this.store.select('projectsPage');
    this.projectsSubscriber = this.projectsState$.subscribe(
      data => {
        this.projects = data.projects;
      }
    );
  }

  ngOnDestroy() {
    this.projectsSubscriber.unsubscribe();
    if (this.reversed) {
      this.reversed = false;
      this.projects.reverse();
    }
  }

  onDownload(id: number, name: string): void {
    this.projectsService.downloadProject(id)
      .subscribe((blob) => {
        saveAs(blob, `${name}.zip`);
      });
  }

  onRemoveProject(id: number): void {
    this.projectsService.removeProject(id);
  }

  onSort(): void {
    this.reversed = !this.reversed;
    this.projects.reverse();
  }

}
