# Cadastro e Login

API de cadastro e autenticação de usuários com **Node.js, Express, MySQL e bcrypt**, incluindo verificação de email através do **Nodemailer + Resend**.

## Tecnologias/Dependências

* Node.js
* Express
* MySQL
* mysql2
* bcrypt
* Nodemailer
* Resend
* dotenv

## Funcionalidades

* Cadastro de usuários
* Hash de senhas com bcrypt
* Verificação de email
* Token de verificação com expiração
* Login de usuários

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

RESEND_API_KEY=sua_api_key_resend
```

### Importante

O arquivo `.env` **não deve ser enviado para o GitHub**, pois contém credenciais e informações sensíveis.

Adicione o arquivo ao `.gitignore`:

```gitignore
.env
```

## Configuração do Resend

O projeto utiliza o **Resend** para o envio de emails de verificação.

É necessário criar uma conta no [Resend](https://resend.com), gerar uma API Key e utilizá-la na variável:

```env
RESEND_API_KEY=sua_api_key_resend
```

Após o cadastro de um usuário, o sistema envia um email contendo um link de verificação.

O usuário deve acessar esse link para confirmar o email.

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
Email enviado pelo Resend
   ↓
Usuário acessa o link
   ↓
Email verificado
   ↓
verificado = 1
   ↓
Login
   ↓
bcrypt.compare()
   ↓
Usuário logado com sucesso
```

## Estrutura do projeto

```text
src/
├── controller/
├── model/
├── route/
├── service/
└── database/
```

Cada camada possui uma responsabilidade específica:

* **controller:** regras de negócio e tratamento das requisições
* **model:** comunicação com o banco de dados
* **route:** definição das rotas da API
* **service:** serviços externos, como envio de emails
* **database:** configuração da conexão com o MySQL
