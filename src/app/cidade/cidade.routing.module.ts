import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { permissionsGuard } from '../guards/permissions.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';

const routes: Routes = [
    { path: '', component: CidadeListComponent },
    { path: 'adicionar', component: CidadeFormComponent, data: { operacao: 'adicionar', rota: 'cidade' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'detalhes/:id', component: CidadeFormComponent, data: { operacao: 'detalhes', rota: 'cidade' }, canActivate: [permissionsGuard] },
    { path: 'editar/:id', component: CidadeFormComponent, data: { operacao: 'editar', rota: 'cidade' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'remover/:id', component: CidadeFormComponent, data: { operacao: 'remover', rota: 'cidade' }, canActivate: [permissionsGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CidadeRoutingModule { }
