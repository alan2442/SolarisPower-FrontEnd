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

1. Acesse o repositório e baixe o código do back-end: [SolarisPower (Back-end)](https://github.com/alan2442/SolarisPower/tree/main)
2. Abra o seu gerenciador MySQL e crie o banco de dados da aplicação:
   ```sql
   CREATE DATABASE solarispower;
