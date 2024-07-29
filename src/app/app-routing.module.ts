import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'cidade' },
    {
        path: 'cliente',
        loadChildren: () =>
            import('./cliente/cliente.module').then((m) => m.ClienteModule),
        canActivate: [authGuard],
    },
    {
        path: 'cidade',
        loadChildren: () =>
            import('./cidade/cidade.module').then((m) => m.CidadeModule),
        canActivate: [authGuard],
    },
    {
        path: '',
        loadChildren: () =>
            import('./usuario/usuario.module').then((m) => m.UsuarioModule),
    },
    { path: 'naoencontrada', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
