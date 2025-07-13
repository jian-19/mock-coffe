# ☕ Mock Coffee

Uma API simples desenvolvida como prova de conceito (POC) para o app [Koffi Unoesc](https://github.com/jian-19/koffi-unoesc).  
O objetivo do projeto é fornecer endpoints mockados para simular o comportamento da API final da aplicação.

---

## 🚀 Como começar

Siga os passos abaixo para clonar, configurar e executar o projeto localmente.

### 1. Clone o repositório

```
git clone https://github.com/jian-19/mock-coffe.git
cd mock-coffee
```

### 2. Abra o projeto no Visual Studio Code

Você pode abrir a pasta diretamente no VSCode.

### 3. Instale as dependências

Execute o comando abaixo no terminal:

```
npm install
```

### 4. Suba o banco de dados com Docker

> É necessário ter o **Docker** instalado em sua máquina.  
> Baixe em: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

Com o Docker instalado, execute o comando:

```
docker-compose up -d
```

Este comando irá utilizar o arquivo `docker-compose.yml` para iniciar o banco de dados PostgreSQL com as configurações definidas.

### 5. Execute os testes unitários

Após subir o banco de dados, rode os testes com:

```
npm test
```

### 6. Inicie o servidor localmente

```
npm run dev
```

Acesse o projeto em:  
📍 [http://localhost:3000](http://localhost:3000)

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Vitest](https://vitest.dev/) – Testes unitários
- [Swagger](https://swagger.io/) – Documentação da API

---

## 📚 Documentação da API

A documentação interativa da API está disponível via Swagger.  
Após iniciar o servidor, acesse:

```
http://localhost:3000/doc
```

---

## 🧪 Testes

Os testes unitários são executados com **Vitest**.

Para rodar os testes:

```
npm test
```

Você verá no terminal o resultado dos testes de forma clara e objetiva.

---

## 📁 Estrutura do Projeto

```
mock-coffee/
├── pages/
│   └── api/
│       └── mock/
│           ├── snacks.js
│           ├── cold_drinks.js
│           └── ...
├── docker-compose.yml
├── .env
├── package.json
├── README.md
└── ...
```

---

## 🛠️ Funcionalidades mockadas

- **Lanches** – `/api/mock/snacks`
- **Bebidas Geladas** – `/api/mock/cold_drinks`
- **Bebidas Quentes** – `/api/mock/hot_drinks`

Todas essas rotas retornam dados simulados para testes da aplicação front-end.

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de **Análise e Desenvolvimento de Sistemas** da UNOESC.  
Distribuído livremente para aprendizado e testes.

---