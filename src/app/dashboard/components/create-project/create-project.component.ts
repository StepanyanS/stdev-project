// import native modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';

// import services
import { ProjectsService } from '../../services/projects.service';
import { ColorsService } from './../../services/colors.service';

// import models
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  createProjectForm: FormGroup;

  project: Project;

  projectIsCreated = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    public colorsService: ColorsService
  ) {
    this.createProjectForm = this.formBuilder.group({
      projectName: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  onAddColor(colorName: HTMLInputElement, color: HTMLInputElement): void {
    this.colorsService.addColor(colorName, color);
  }

  onCreateProject(): void {
    console.log(this.projectIsCreated);
    const formData = this.createProjectForm.value;
    this.project = new Project(formData.projectName, this.colorsService.colors);
    this.projectsService.createProject(this.project)
      .subscribe((isCreated) => {
        this.projectIsCreated = isCreated;
        console.log(this.projectIsCreated);
        console.log(`Project ${formData.projectName} created`);
      });
  }

  onDownload() {
    this.projectsService.downloadProject(this.project.name)
      .subscribe((blob) => {
          saveAs(blob, `${this.project.name}.zip`);
      });
  }

  onColorChange($event): void {
    this.colorsService.colorChange($event);
  }

  onOpacityChange($event, color: HTMLInputElement): void {
    this.colorsService.opacityChange($event, color);
  }
}
