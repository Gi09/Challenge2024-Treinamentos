import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TreinamentosComponent } from './components/treinamentos/treinamentos.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {path: 'home', component: HomeComponent},
    {path: 'treinamentos/:id', component: TreinamentosComponent},
    { path: 'treinamentos/:id/modulos/:moduloId', component: ModulosComponent },
    {path: 'modulos', component: ModulosComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: HomeComponent}
];
