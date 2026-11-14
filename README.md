# ☀️ Solaris Power — Marketplace de Energia Fotovoltaica

<div align="center">

> Plataforma *marketplace* B2B e B2C especializada em conectar fornecedores de equipamentos fotovoltaicos a clientes e instaladores de energia solar.

[![Status do Projeto](https://img.shields.io/badge/Status-Em_Produção-brightgreen?style=flat-square)]()
[![Deploy](https://img.shields.io/badge/Deploy-Microsoft_Azure-blue?style=flat-square&logo=microsoft-azure)]()
[![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)]()
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=flat-square&logo=springboot)]()
[![React](https://img.shields.io/badge/React-Vite-blue?style=flat-square&logo=react)]()

</div>

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
* **Spring Boot**
* **Spring Data JPA / Hibernate** (gerenciamento e criação automática de tabelas)
* **Lombok** (redução de código *boilerplate*)
* **Spring AI** (integração com IA)

### **Banco de Dados & Integrações**
* **MySQL** (Banco de dados relacional)
* **API do Mercado Livre / Mercado Pago** (pagamentos e transações)
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
* **Carrinho e Checkout:** Sistema de compras com integração de pagamentos.
* **Atendimento Automatizado:** Chatbot inteligente integrado via OpenAI para tirar dúvidas dos usuários em tempo real.
* **Suporte via E-mail:** Canal de atendimento integrado com EmailJS.

### 💻 Pré-requisitos para Execução Local
Certifique-se de ter instalado em sua máquina:
* **JDK 21** configurado no *Path*.
* **Node.js** e **npm**.
* **MySQL** rodando localmente.

---

## 🚀 Como Rodar o Projeto Localmente

### 🗄️ 1. Configurando o Back-end (Spring Boot)

1. Crie um banco de dados vazio no seu MySQL:
   ```sql
   CREATE DATABASE solarispower;
