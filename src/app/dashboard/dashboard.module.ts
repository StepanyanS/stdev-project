// import native modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import self modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

// import components
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CreateProjectComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ProjectsComponent
  ]
})
export class DashboardModule { }
