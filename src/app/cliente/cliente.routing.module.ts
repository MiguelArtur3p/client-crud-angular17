import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { permissionsGuard } from '../guards/permissions.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
    { path: '', component: ClienteListComponent },
    { path: 'adicionar', component: ClienteFormComponent, data: { operacao: 'adicionar', rota: 'cidade' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'detalhes/:id', component: ClienteFormComponent, data: { operacao: 'detalhes', rota: 'cidade' }, canActivate: [permissionsGuard] },
    { path: 'editar/:id', component: ClienteFormComponent, data: { operacao: 'editar', rota: 'cidade' }, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'remover/:id', component: ClienteFormComponent, data: { operacao: 'remover', rota: 'cidade' }, canActivate: [permissionsGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClienteRoutingModule { }
