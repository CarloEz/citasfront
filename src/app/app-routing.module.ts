import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { LiderComponent } from './components/lider/lider.component';
import { ParticipanteComponent } from './components/participante/participante.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ReporteLiderComponent } from './components/reporte-lider/reporte-lider.component';
import { ReporteTutorComponent } from './components/reporte-tutor/reporte-tutor.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adm', component: RegisterAdminComponent },
  {
    path: 'panel',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: LiderComponent },
      { path: 'tutor', component: TutorComponent },
      { path: 'reporte', component: ReporteTutorComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'participante', component: ParticipanteComponent },
      { path: 'reportes', component: ReporteLiderComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
