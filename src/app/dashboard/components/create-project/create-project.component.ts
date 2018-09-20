import { Component, OnInit } from '@angular/core';
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
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

  createProjectForm: FormGroup;

  private project: Project;

  outlineChecked = false;

  projectIsCreated = false;

  private currentProjectId: number;

  private borderWidth = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    public colorsService: ColorsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      projectName: [null, Validators.required]
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
          this.currentProjectId = res.data.id;
          this.projectIsCreated = true;
        },
        err => this.projectIsCreated = false
      );
  }

  onDownload() {
    this.projectsService.downloadProject(this.currentProjectId)
      .subscribe((blob) => {
          saveAs(blob, `${this.project.projectName}.zip`);
      });
  }

  onColorChange($event): void {
    this.colorsService.colorChange($event);
  }

  onRadiusChange($event) {
    document.documentElement.style.setProperty('--btn-border-radius', `${$event.target.value}px`);
  }

  onOutlineCheck($event): void {
    if (!$event.checked) {
      this.borderWidth = '';
      this.setBorder();
      return;
    }
    this.borderWidth = '1';
    this.setBorder();
  }

  setBorder(): void {
    document.documentElement.style.setProperty('--btn-border-width', `${this.borderWidth}px`);
  }
}
