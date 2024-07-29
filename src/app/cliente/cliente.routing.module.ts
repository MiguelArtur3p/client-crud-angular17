import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { permissoessGuard } from '../guards/permissoes.guard';
import { canDeactivateForm } from '../guards/form-candeactivate';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
    { path: '', component: ClienteListComponent },
    { path: 'cliente/adicionar', component: ClienteFormComponent, canActivate: [permissoessGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cliente/detalhes/:id', component: ClienteFormComponent, canActivate: [permissoessGuard] },
    { path: 'cliente/editar/:id', component: ClienteFormComponent, canActivate: [permissoessGuard], canDeactivate: [canDeactivateForm] },
    { path: 'cliente/remover/:id', component: ClienteFormComponent, canActivate: [permissoessGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClienteRoutingModule { }
