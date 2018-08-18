// import native modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import models
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public createProject(project: Project): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/api/projects/create', project);
  }

  public downloadProject(projectName: string): Observable<Blob> {
    return this.http.get(
      `http://localhost:3000/api/projects/download?projectName=${projectName}`,
      { responseType: 'blob' }
    ).pipe(
      map(res => res)
    );
  }
}
