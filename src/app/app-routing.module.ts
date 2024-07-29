import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { LoginFormComponent } from './usuario/login-form/login-form.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cliente',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
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
        ]
    },
    {
        path: '/login',
        component: LoginFormComponent
    }
    // { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
