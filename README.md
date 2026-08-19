# Cadastro e Login

API de cadastro e autenticação de usuários com **Node.js, Express, MySQL, bcrypt e JWT**, incluindo verificação de e-mail através do **Nodemailer + Ethereal**.

## Tecnologias/Dependências

* Node.js
* Express
* MySQL
* mysql2
* bcrypt
* JSON Web Token (JWT)
* Nodemailer
* Ethereal Email
* dotenv

## Funcionalidades

* Cadastro de usuários
* Hash de senhas com bcrypt
* Verificação de e-mail
* Token de verificação com expiração
* Login de usuários
* Autenticação utilizando JWT

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js
* MySQL
* npm

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone URL_DO_REPOSITORIO
cd cadastro-login
```

Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

Crie o banco de dados MySQL e execute o script SQL disponível no projeto para criar as tabelas necessárias.

O banco utilizado pelo projeto deve possuir as tabelas:

* `empresa`
* `usuario`
* `verificacao_email`

## Configuração das variáveis de ambiente

O projeto utiliza variáveis de ambiente para armazenar informações sensíveis.

Crie um arquivo chamado `.env` na raiz do projeto:

```env
DB_USER=seu_usuario_mysql
DB_HOST=localhost
DB_DATABASE=cadastro_login
DB_PASSWORD=sua_senha_mysql
DB_PORT=3306

JWT_SECRET=sua_chave_secreta

ETHEREAL_USER=seu_usuario_ethereal
ETHEREAL_PASSWORD=sua_senha_ethereal
```

### Importante

O arquivo `.env` **não deve ser enviado para o GitHub**, pois contém credenciais e informações sensíveis.

Adicione o arquivo ao `.gitignore`:

```gitignore
.env
```

## Configuração do Ethereal

O projeto utiliza o **Ethereal Email** para testar o envio de e-mails durante o desenvolvimento.

É necessário criar uma conta de teste no Ethereal e utilizar as credenciais fornecidas pela plataforma nas variáveis:

```env
ETHEREAL_USER=seu_usuario_ethereal
ETHEREAL_PASSWORD=sua_senha_ethereal
```

O Ethereal permite visualizar os e-mails enviados pela aplicação sem precisar utilizar uma conta de e-mail real.

Após o cadastro de um usuário, o sistema envia um e-mail contendo um link de verificação.

O usuário deve acessar esse link para confirmar o e-mail.

## Executando o projeto

Inicie a aplicação com:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## Fluxo de autenticação

O processo de autenticação funciona da seguinte maneira:

```text
Cadastro
   ↓
Senha armazenada com bcrypt
   ↓
Usuário criado com verificado = 0
   ↓
Token de verificação gerado
   ↓
Token armazenado no banco
   ↓
E-mail enviado pelo Ethereal
   ↓
Usuário acessa o link
   ↓
E-mail verificado
   ↓
verificado = 1
   ↓
Login
   ↓
bcrypt.compare()
   ↓
JWT gerado
   ↓
Token utilizado nas rotas protegidas
```

## JWT

Após um login válido, a API gera um token JWT contendo informações necessárias para identificar o usuário e sua empresa.

Exemplo de payload:

```json
{
    "id_usuario": 1,
    "fk_empresa": 1
}
```

O token possui tempo de expiração e deve ser enviado nas requisições autenticadas através do header:

```http
Authorization: Bearer SEU_TOKEN
```

## Estrutura do projeto

```text
src/
├── controller/
├── model/
├── middleware/
├── route/
├── service/
└── database/
```

Cada camada possui uma responsabilidade específica:

* **controller:** regras de negócio e tratamento das requisições
* **model:** comunicação com o banco de dados
* **route:** definição das rotas da API
* **middleware:** autenticação e validação do JWT
* **service:** serviços externos, como envio de e-mails
* **database:** configuração da conexão com o MySQL

## Observação

Este projeto utiliza o **Ethereal apenas para fins de desenvolvimento e testes**. Para um ambiente de produção, recomenda-se utilizar um serviço de envio de e-mails apropriado.
