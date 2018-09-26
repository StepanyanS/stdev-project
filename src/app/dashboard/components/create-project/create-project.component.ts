import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { saveAs } from 'file-saver/FileSaver';

import { AppState } from './../../redux/app.state';
import { AddProject } from './../../redux/projects.action';

import { ProjectsService } from '../../services/projects.service';
import { ColorsService } from './../../services/colors.service';

import { Project } from '../../models/project.model';
import { IResult } from '../../../shared/models/result';
import { Message } from '../../../shared/models/message.model';
import { MessageBase } from '../../../shared/message.base';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent extends MessageBase implements OnInit {

  message: Message;

  createProjectForm: FormGroup;

  private project: Project;

  outlineChecked = false;

  canAddColor = false;
  projectIsCreated = false;
  projectIsCreating = false;

  private currentProjectId: number;

  private borderWidth = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    public colorsService: ColorsService,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      projectName: [null, Validators.required]
    });
    this.newMessage('', 'success');
  }

  onAddColor(colorName: HTMLInputElement, color: HTMLInputElement): void {
    this.canAddColor = false;
    this.colorsService.addColor(colorName, color);
  }

  onCreateProject(): void {
    this.projectIsCreating = true;
    const formData = this.createProjectForm.value;
    this.project = new Project(formData.projectName, this.colorsService.colors);
    this.projectsService.createProject(this.project)
      .subscribe(
        (res: IResult) => {
          this.store.dispatch(new AddProject(res.data));
          this.currentProjectId = res.data.id;
          this.projectIsCreated = true;
          this.projectIsCreating = false;
          this.showMessage({
            text: res.message,
            type: 'success'
          });
        },
        err => {
          this.projectIsCreated = false;
          this.projectIsCreating = false;
          this.showMessage({
            text: err.error.message,
            type: 'danger'
          });
        }
      );
  }

  onDownload() {
    this.projectsService.downloadProject(this.currentProjectId)
      .subscribe((blob) => {
          saveAs(blob, `${this.project.projectName}.zip`);
      });
  }

  public onColorChange($event): void {
    if ($event.target.value.length === 6) {
      this.canAddColor = true;
      this.colorsService.appllyColor($event.target.value);
    } else {
      this.canAddColor = false;
      this.colorsService.appllyColor('000000');
    }
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
