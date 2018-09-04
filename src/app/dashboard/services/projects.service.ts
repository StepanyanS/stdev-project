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

  public createProject(project: Project): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/projects', project, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public getProjects(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/projects', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public removeProject(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
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
