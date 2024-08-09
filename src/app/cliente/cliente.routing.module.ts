import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { permissionsGuard } from '../guards/permissions.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { clienteResolver } from './services/cliente.resolver';

const routes: Routes = [
    { path: '', component: ClienteListComponent },
    { path: 'adicionar', component: ClienteFormComponent, data: { operacao: 'adicionar', rota: 'cliente' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'detalhes/:id', component: ClienteFormComponent, resolve: { cliente: clienteResolver }, data: { operacao: 'detalhes', rota: 'cliente' }, canActivate: [permissionsGuard] },
    { path: 'editar/:id', component: ClienteFormComponent, resolve: { cliente: clienteResolver }, data: { operacao: 'editar', rota: 'cliente' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'remover/:id', component: ClienteFormComponent, resolve: { cliente: clienteResolver }, data: { operacao: 'remover', rota: 'cliente' }, canActivate: [permissionsGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClienteRoutingModule { }
