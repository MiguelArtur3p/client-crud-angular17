import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { permissionsGuard } from '../guards/permissions.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';

const routes: Routes = [
    { path: '', component: CidadeListComponent },
    { path: 'cidade/adicionar', component: CidadeFormComponent, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cidade/detalhes/:id', component: CidadeFormComponent, canActivate: [permissionsGuard] },
    { path: 'cidade/editar/:id', component: CidadeFormComponent, canActivate: [permissionsGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cidade/remover/:id', component: CidadeFormComponent, canActivate: [permissionsGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CidadeRoutingModule { }
