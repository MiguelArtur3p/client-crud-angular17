import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { LoginFormComponent } from './usuario/login-form/login-form.component';
import { anyPermission } from './guards/any-permission.guard';

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
                canMatch: [authGuard, anyPermission],
            },
            {
                path: 'cidade',
                loadChildren: () =>
                    import('./cidade/cidade.module').then((m) => m.CidadeModule),
                canMatch: [authGuard, anyPermission],
            },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
                canActivate: [authGuard]
            },
            {
                path: 'usuario',
                loadChildren: () =>
                    import('./usuario/usuario.module').then((m) => m.UsuarioModule),
            },
        ]
    },
    {
        path: 'login',
        component: LoginFormComponent
    }
    // { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
