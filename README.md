## SPA de Gerenciamento de Clientes
Este repositório apresenta uma aplicação de página única (SPA) para gerenciamento de clientes, desenvolvida com Angular (2+) e TypeScript. A aplicação é projetada para realizar operações CRUD (criar, ler, atualizar e excluir) em clientes de forma eficiente e intuitiva.

## Funcionalidades

CRUD de Clientes: Adicione, edite, visualize e exclua clientes.
Estilo Moderno: Utiliza Bootstrap para uma interface responsiva e ngx-bootstrap para modais, toasts e outros componentes interativos.
Consumo de API: Integra com a API do json-server para operações de cadastro e gerenciamento de dados dos clientes.
Lazy Load: Implementação de lazy loading para melhorar a performance e otimizar o carregamento dos módulos.
Guarda de Rotas: Controle de acesso com guards para proteger rotas contra usuários não autorizados ou não autenticados.
Reactive Forms: Utiliza Reactive Forms para criar formulários dinâmicos e flexíveis com validações sincrônicas e assíncronas.
Base Form: Componentes de formulário reutilizáveis para simplificar a manutenção e a consistência.
Componentes e Serviços Reutilizáveis: Criação de componentes e serviços reutilizáveis para validações e outras funcionalidades comuns.
HttpClient: Requisições assíncronas para comunicação com a API.
Injeção de Dependência e Gerenciamento de Memória: Controle de vazamentos de memória usando unsubscribe e operadores take do RxJS.

## Tecnologias Utilizadas

Angular (2+): Framework para desenvolvimento de aplicações web.
TypeScript: Linguagem de programação para desenvolvimento de Angular.
Bootstrap: Framework de CSS para estilização e design responsivo.
ngx-bootstrap: Biblioteca para componentes adicionais como modais e toasts.
json-server: API fake para simular backend e gerenciamento de dados.
RxJS: Biblioteca para programação reativa e gerenciamento de eventos assíncronos.


Claro! Aqui está uma descrição detalhada para o seu repositório GitHub:

SPA de Gerenciamento de Clientes
Este repositório apresenta uma aplicação de página única (SPA) para gerenciamento de clientes, desenvolvida com Angular (2+) e TypeScript. A aplicação é projetada para realizar operações CRUD (criar, ler, atualizar e excluir) em clientes de forma eficiente e intuitiva.

Funcionalidades
CRUD de Clientes: Adicione, edite, visualize e exclua clientes.
Estilo Moderno: Utiliza Bootstrap para uma interface responsiva e ngx-bootstrap para modais, toasts e outros componentes interativos.
Consumo de API: Integra com a API do json-server para operações de cadastro e gerenciamento de dados dos clientes.
Lazy Load: Implementação de lazy loading para melhorar a performance e otimizar o carregamento dos módulos.
Guarda de Rotas: Controle de acesso com guards para proteger rotas contra usuários não autorizados ou não autenticados.
Reactive Forms: Utiliza Reactive Forms para criar formulários dinâmicos e flexíveis com validações sincrônicas e assíncronas.
Base Form: Componentes de formulário reutilizáveis para simplificar a manutenção e a consistência.
Componentes e Serviços Reutilizáveis: Criação de componentes e serviços reutilizáveis para validações e outras funcionalidades comuns.
HttpClient: Requisições assíncronas para comunicação com a API.
Injeção de Dependência e Gerenciamento de Memória: Controle de vazamentos de memória usando unsubscribe e operadores take do RxJS.
Tecnologias Utilizadas
Angular (2+): Framework para desenvolvimento de aplicações web.
TypeScript: Linguagem de programação para desenvolvimento de Angular.
Bootstrap: Framework de CSS para estilização e design responsivo.
ngx-bootstrap: Biblioteca para componentes adicionais como modais e toasts.
json-server: API fake para simular backend e gerenciamento de dados.
RxJS: Biblioteca para programação reativa e gerenciamento de eventos assíncronos.

## Como Rodar o Projeto
Clone o repositório:
git clone https://github.com/MiguelArtur3p/client-crud-angular17.git

Navegue até o diretório do projeto:
cd nome-do-repositorio

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
ng serve

Inicie o json-server:
json-server db.json --watch


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
