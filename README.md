# ☀️ Solaris Power 

<div align="center">

> Plataforma *marketplace* B2B e B2C especializada em conectar fornecedores de equipamentos fotovoltaicos a clientes e instaladores de energia solar.

[![Status do Projeto](https://img.shields.io/badge/Status-Em_Produção-brightgreen?style=flat-square)]()
[![Deploy](https://img.shields.io/badge/Deploy-Microsoft_Azure-blue?style=flat-square&logo=microsoft-azure)]()
[![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)]()
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.4-green?style=flat-square&logo=springboot)]()
[![React](https://img.shields.io/badge/React-Vite-blue?style=flat-square&logo=react)]()

</div>

---

## 📂 Repositórios do Projeto

O projeto está dividido em duas partes (Arquitetura Monorepo/Microsserviços separados):
* **🖥️ Back-end (Spring Boot):** [Acessar Repositório do Back-end](https://github.com/alan2442/SolarisPower/tree/main)
* **💻 Front-end (React):** [Acessar Repositório do Front-end](https://github.com/alan2442/SolarisPower-FrontEnd)

---

## 🎯 Objetivo do Projeto

O **Solaris Power** tem como missão principal democratizar e simplificar o acesso à energia solar no Brasil, conectando distribuidores e fabricantes de equipamentos fotovoltaicos diretamente a instaladores, empresas e clientes finais. 

Nossa plataforma atua como um *marketplace* especializado, eliminando barreiras logísticas e burocráticas do setor. O objetivo é criar um ecossistema digital completo onde:
* **Empresas parceiras** escalam suas vendas e alcançam novos mercados com facilidade.
* **Clientes e integradores** encontram uma ampla variedade de produtos certificados (painéis solares, inversores, baterias, estruturas) com transparência e segurança.
* **O mercado de energia limpa** ganha agilidade, impulsionando a transição energética e a sustentabilidade.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### **Front-end**
* **React** (com Vite)
* **Axios** (requisições HTTP)
* **EmailJS** (envio de e-mails para o suporte)
* **Lucide-React** (ícones da interface)
* **Visual Studio Code (VS Code)**

### **Back-end**
* **Java 21 (JDK 21)**
* **Spring Boot 3.4.4**
* **Spring Data JPA / Hibernate** (configurado via código na classe `DataConfiguration`)
* **Spring AI** (integração com OpenAI para o chatbot)
* **Lombok** (redução de código *boilerplate*)
* **Mercado Pago SDK** (integração de pagamentos)
* **Spring Mail** (envio de e-mails)

### **Banco de Dados & Integrações**
* **MySQL** (Banco de dados relacional)
* **API OpenAI (ChatGPT)** (chatbot de atendimento inteligente)
* **EmailJS** (serviço de mensagens via suporte)

### **Infraestrutura & Deploy (Nuvem)**
* **Microsoft Azure** — Hospedagem, gerenciamento e deploy da aplicação em produção.

### **Extensões recomendadas para o VS Code**
* Spring Boot Extension Pack
* Extension Pack for Java
* MySQL

---

## 📋 Requisitos do Sistema

### ⚙️ Requisitos Funcionais
* **Cadastro e Autenticação:** Perfis distintos para empresas vendedoras e clientes compradores.
* **Gestão de Catálogo:** Empresas podem gerenciar seus produtos fotovoltaicos.
* **Carrinho e Checkout:** Sistema de compras integrado com pagamentos via Mercado Pago.
* **Atendimento Automatizado:** Chatbot inteligente integrado via Spring AI (OpenAI) para tirar dúvidas em tempo real.
* **Suporte via E-mail:** Canal de atendimento integrado com EmailJS e Spring Mail.

### 💻 Pré-requisitos para Execução Local
Certifique-se de ter instalado em sua máquina:
* **JDK 21** configurado no *Path*.
* **Node.js** e **npm**.
* **MySQL** rodando localmente.

---

## 🚀 Como Rodar o Projeto Localmente

### 🗄️ 1. Configurando e Rodando o Back-end

1.1 - Acesse o repositório e baixe o código do back-end: [SolarisPower (Back-end)](https://github.com/alan2442/SolarisPower/tree/main)

1.2 - Abra o seu gerenciador MySQL e crie o banco de dados da aplicação:
   ``` CREATE DATABASE solarispower; ```

1.3 - As credenciais de acesso ao banco estão centralizadas na classe de configuração do projeto:
src/main/java/com/example/solarispower/DataConfiguration.java
(Caso seu usuário ou senha do MySQL sejam diferentes, atualize os valores diretamente nesta classe).

1.4 - Verifique o arquivo de propriedades em src/main/resources/application.properties:

```
Properties
spring.application.name=solarispower
server.port=8080

# Configuração da OpenAI no Spring AI
spring.ai.openai.api-key=SUA_CHAVE_OPENAI_AQUI
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.7

# Configuração do Mercado Pago
mercadopago.access_token=TEST-7751286980864329-052313-3bb1b2989a05299322a6714e008a7789-651291232

# Configuração do chatbot via variáveis de ambiente
openai.api-key=${OPENAI_API_KEY}
openai.model=gpt-6-luna
```


1.5 - Para rodar a aplicação, execute a classe principal do Spring Boot:
src/main/java/com/example/solarispower/SolarispowerApplication.java
(O Hibernate criará as tabelas e relações automaticamente no banco solarispower).

💻 2. Configurando e Rodando o Front-end
2.1 - Acesse o repositório do front-end: SolarisPower-FrontEnd e baixe/clone o projeto.

2.2 - Abra um terminal na pasta do front-end.

2.3 - Instale as dependências necessárias:
Bash
npm install axios @emailjs/browser lucide-react


2.4 - Inicie o servidor de desenvolvimento:
Bash
npm run dev

2.5 - Acesse o link exibido no terminal (geralmente http://localhost:5173) para interagir com o marketplace.
