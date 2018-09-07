import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Project } from '../models/project.model';
import { AppState } from '../redux/app.state';
import { GetProjects, DeleteProject } from './../redux/projects.action';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  public createProject(project: Project): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/projects', project, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public getProjects(): void {
    this.http.get<any>('http://localhost:3000/api/projects', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    .subscribe(
      response => {
        this.store.dispatch(new GetProjects(response.data));
      }
    );
  }

  public removeProject(id: number): void {
    this.http.delete<any>(`http://localhost:3000/api/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    .subscribe(
      response => this.store.dispatch(new DeleteProject(id))
    );
  }

  public downloadProject(projectName: string): Observable<Blob> {
    return this.http.get(
      `http://localhost:3000/api/projects/download?projectName=${projectName}`,
      {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      }
    ).pipe(
      map(res => res)
    );
  }
}
