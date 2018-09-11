import { Project } from './../models/project.model';

export interface AppState {
  projectsPage: {
    projects: Project[]
  };
}
