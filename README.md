# Projeto> SolarisPower

# 🎯 Objetivo do Projeto

O **SolarisPower** tem como missão principal democratizar e simplificar o acesso à energia solar, conectando fornecedores e fabricantes de equipamentos fotovoltaicos diretamente a instaladores, empresas e clientes finais. 

Nossa plataforma atua como um *marketplace* especializado, eliminando barreiras logísticas e burocráticas do setor. O objetivo é criar um ecossistema digital completo onde:
* **Empresas parceiras** (distribuidoras e fabricantes) escalam suas vendas e alcançam novos mercados com facilidade.
* **Clientes e integradores** encontram uma ampla variedade de produtos certificados (painéis solares, inversores, baterias, estruturas e acessórios) com preços competitivos, transparência e segurança nas transações.
* **O mercado de energia limpa** ganha agilidade, impulsionando a transição energética e a sustentabilidade no Brasil.

# 🛠️ Tecnologias e Ferramentas Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura moderna, separando o Front-end e o Back-end, além de ferramentas de inteligência artificial e integrações externas:

## Front-end
React — Biblioteca JavaScript para a construção da interface do usuário do marketplace.

Visual Studio Code (VS Code) — Ambiente de desenvolvimento integrado (IDE).

## Back-end
Java 21 (utilizando o JDK 21 - Java Development Kit) — Linguagem de programação principal do back-end. (Nota: O JDK é o kit de desenvolvimento correto para programar em Java!)

Spring Boot — Framework principal para estruturação e criação da API REST.

Lombok — Biblioteca Java utilizada para reduzir o código boilerplate (geração automática de getters, setters, construtores, etc.).

## Banco de Dados & Integrações
SQL / MySQL — Banco de dados relacional para persistência de dados de usuários, produtos e pedidos.

API do Mercado Pago — Integração para realizar pagamentos.

EmailJS — Serviço de envio de e-mails integrado diretamente ao módulo de suporte da plataforma.

API OpenAI (ChatGPT) — Inteligência artificial integrada para alimentar o chatbot de atendimento ao cliente.

## Infraestrutura & Deploy (Nuvem)
* **Microsoft Azure** — Hospedagem, gerenciamento de servidores e deploy da aplicação.

# Extensões do VS Code
Spring Boot Extension Pack

Extension Pack for Java

MySQL (vscode-mysql ou similar)



# ⚙️ Requisitos Funcionais (RF)
* **Cadastro e Autenticação:** Perfis distintos para Empresas (vendedores de equipamentos fotovoltaicos) e Clientes (compradores).
* **Gestão de Produtos:** Empresas cadastradas podem gerenciar seu catálogo de produtos solares (painéis, inversores, baterias, etc.).
* **Carrinho e Checkout:** Sistema de compras integrado com simulação de pedidos.
* **Suporte Automatizado:** Chatbot inteligente integrado via API do ChatGPT para tirar dúvidas dos usuários em tempo real.
* **Canal de Atendimento (Suporte):** Envio de mensagens de suporte por e-mail utilizando o EmailJS.
* **Integração com Marketplace Externo:** Conexão com ferramentas do ecossistema do Mercado Livre.

# 💻 Requisitos Técnicos / Pré-requisitos para Execução
Para rodar este projeto localmente, certifique-se de ter instalado em sua máquina:
* **JDK 21** configurado no *Path* do sistema.
* **Node.js** e **npm** (para executar o front-end em React).
* Servidor **MySQL** rodando localmente ou em nuvem.
* Chaves de API configuradas para:
  * API OpenAI (ChatGPT)
  * EmailJS
  * Credenciais da API do Mercado Pago
