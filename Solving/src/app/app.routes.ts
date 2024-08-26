import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TreinamentosComponent } from './components/treinamentos/treinamentos.component';
import { ModulosComponent } from './components/modulos/modulos.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'treinamentos/:id', component: TreinamentosComponent},
    { path: 'treinamentos/:id/modulos/:moduloId', component: ModulosComponent },
    {path: 'modulos', component: ModulosComponent},
    {path: '**', component: HomeComponent}
];
