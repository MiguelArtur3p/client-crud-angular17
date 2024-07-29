import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { permissoessGuard } from '../guards/permissoes.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';

const routes: Routes = [
    { path: '', component: CidadeListComponent },
    { path: 'cidade/adicionar', component: CidadeFormComponent, canActivate: [permissoessGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cidade/detalhes/:id', component: CidadeFormComponent, canActivate: [permissoessGuard] },
    { path: 'cidade/editar/:id', component: CidadeFormComponent, canActivate: [permissoessGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cidade/remover/:id', component: CidadeFormComponent, canActivate: [permissoessGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CidadeRoutingModule { }
