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
import { EmpresaGuard } from './guards/empresa.guard';
import { LiderGuard } from './guards/lider.guard';
import { TutorGuard } from './guards/tutor.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adm', component: RegisterAdminComponent },
  {
    path: 'cliente', component: ProfileComponent, canActivate: [AuthGuard, EmpresaGuard],
    children: [
      { path: 'solicitar', component: ClienteComponent, canActivate: [EmpresaGuard] }
    ]
  },
  {
    path: 'lider', component: ProfileComponent, canActivate: [AuthGuard, LiderGuard],
    children: [
      { path: 'reportes', component: ReporteLiderComponent, canActivate: [LiderGuard] },
      { path: 'cursos', component: LiderComponent, canActivate: [LiderGuard] }
    ]
  },
  {
    path: 'tutor', component: ProfileComponent, canActivate: [AuthGuard, TutorGuard],
    children: [
      { path: 'gestion', component: TutorComponent, canActivate: [TutorGuard] },
      { path: 'reporte', component: ReporteTutorComponent, canActivate: [TutorGuard] }
    ]
  },
  {
    path: 'participante', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: 'horario', component: ParticipanteComponent},
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
