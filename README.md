<br />



## :eyes: Sobre

Chat usando node, aws, docker e mongodb - criado no bitbucket em 2022, mas resolvi passar para o github

## :rocket: Tecnologias

Principais tecnologias utilizadas

- [Javascript]
- [Socket.io]
- [Mongo]
- [Express]
- [Docker]

## :computer: Executar o projeto

### Requirimentos

- [Node.js](https://nodejs.org/en/) (recomendada uma versão >= 16)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Sistema hospedado em: http://34.207.128.135:3000/

### Instalando e rodando o projeto

_Clonado o projeto, siga os próximos passos_

```bash
$ # Instale as dependências com yarn ou npm
$ npm install
```

---

**_Nesse servidor, temos que configurar as variáveis de ambiente_**

```bash
$ # Configure o .env para o ambiente de produção
$ # Faça uma cópia do arquivo '.env.example' com o nome '.env'
$ cp .env.example .env
```

_Configure então as váriaveis de ambiente necessárias nos arquivos .env, essas são as minhas variaveis para teste, podendo ser outras:_

DATABASE_URL=
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""
DEFAULT_REGION=""
DEFAULT_FILES_ACL=""

_Para executar o projeto em modo de desenvolvimento_

```bash
$ # Execute o projeto
$ npm run dev

$ # Está pronto! O Projeto deve estar executando em modo de desenvolvimento!
```

_Para executar o projeto em modo de produção_

```bash
$ npm start

$ # Está pronto! O Projeto deve estar executando em modo de produção!
```
