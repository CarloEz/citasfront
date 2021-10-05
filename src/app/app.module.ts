import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LiderComponent } from './components/lider/lider.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ParticipanteComponent } from './components/participante/participante.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { InterceptorService } from './services/interceptor.service';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { FechaActualPipe } from './pipes/fechaActual.pipe';
import { HorarioComponent } from './components/horario/horario.component';
import { ReporteTutorComponent } from './components/reporte-tutor/reporte-tutor.component';
import { ReporteLiderComponent } from './components/reporte-lider/reporte-lider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiderComponent,
    TutorComponent,
    ClienteComponent,
    ParticipanteComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterAdminComponent,
    FechaActualPipe,
    HorarioComponent,
    ReporteTutorComponent,
    ReporteLiderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
