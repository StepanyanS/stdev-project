import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from '../services/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectsComponent } from './components/projects/projects.component';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [ AuthGuard ], children: [
    { path: 'profile',  component: ProfileComponent },
    { path: 'create-project',  component: CreateProjectComponent },
    { path: 'projects',  component: ProjectsComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
