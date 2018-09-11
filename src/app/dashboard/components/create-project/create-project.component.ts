import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.state';
import { AddProject } from './../../redux/projects.action';

import { ProjectsService } from '../../services/projects.service';
import { ColorsService } from './../../services/colors.service';

import { Project } from '../../models/project.model';
import { IResult } from '../../../shared/models/result';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {

  createProjectForm: FormGroup;

  project: Project;

  projectIsCreated = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    public colorsService: ColorsService,
    private store: Store<AppState>
  ) {
    this.createProjectForm = this.formBuilder.group({
      'projectName': [null, Validators.required]
    });
  }

  onAddColor(colorName: HTMLInputElement, color: HTMLInputElement): void {
    this.colorsService.addColor(colorName, color);
  }

  onCreateProject(): void {
    const formData = this.createProjectForm.value;
    this.project = new Project(formData.projectName, this.colorsService.colors);
    this.projectsService.createProject(this.project)
      .subscribe(
        (res: IResult) => {
          this.store.dispatch(new AddProject(res.data));
          this.projectIsCreated = true;
        },
        err => this.projectIsCreated = false
      );
  }

  onDownload() {
    this.projectsService.downloadProject(this.project.projectName)
      .subscribe((blob) => {
          saveAs(blob, `${this.project.projectName}.zip`);
      });
  }

  onColorChange($event): void {
    this.colorsService.colorChange($event);
  }

  onOpacityChange($event, color: HTMLInputElement): void {
    this.colorsService.opacityChange($event, color);
  }

  onRadiusChange($event) {
    document.documentElement.style.setProperty('--btn-border-radius', `${$event.target.value}px`);
  }

  onBorderWidthChange($event) {
    document.documentElement.style.setProperty('--btn-border-width', `${$event.target.value}px`);
  }
}
