import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { permissionsGuard } from '../guards/permissions.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
    { path: '', component: ClienteListComponent },
    { path: 'cliente/adicionar', component: ClienteFormComponent, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cliente/detalhes/:id', component: ClienteFormComponent, canActivate: [permissionsGuard] },
    { path: 'cliente/editar/:id', component: ClienteFormComponent, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cliente/remover/:id', component: ClienteFormComponent, canActivate: [permissionsGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClienteRoutingModule { }
