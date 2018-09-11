import { Action } from '@ngrx/store';
import { Project } from '../models/project.model';

export namespace PROJECT_ACTION {
  export const ADD_PROJECT = 'ADD_PROJECT';
  export const GET_PROJECTS = 'GET_PROJECTS';
  export const DELETE_PROJECT = 'DELETE_PROJECT';
}

export class AddProject implements Action {
  readonly type =  PROJECT_ACTION.ADD_PROJECT;

  constructor(public payload: Project) {}
}

export class GetProjects implements Action {
  readonly type =  PROJECT_ACTION.GET_PROJECTS;

  constructor(public payload: Project[]) {}
}

export class DeleteProject implements Action {
  readonly type =  PROJECT_ACTION.DELETE_PROJECT;

  constructor(public payload: number) {}
}

export type ProjectsActions = AddProject | GetProjects | DeleteProject;
