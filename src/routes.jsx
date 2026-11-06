import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Provider do contexto global do carrinho de compras
import { CartProvider } from "./components/Context/CartContext";

// Componentes Globais de Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot/ChatBot";

// Componentes de Páginas
import Erro from "./pages/Erro";
import Index from "./pages/Index";
import SobreNos from "./pages/SobreNos";
import Duvidas from "./pages/Duvidas";
import Suporte from "./pages/Suporte";
import Produtos from "./pages/Produtos";
import Login from "./pages/Login";
import LoginEmpresa from "./pages/LoginEmpresa";
import Cadastro from "./pages/Cadastro";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import Sobre from "./pages/Sobre";
import Carrinho from "./pages/Carrinho";
import CalculadoraSolar from "./pages/CalculadoraSolar";
import Perfil from "./pages/Perfil";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import CadastroProduto from "./pages/CadastroProduto";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import TermosDeUso from "./pages/TermosDeUso";

// Páginas de Retorno do Checkout Mercado Pago
import Sucesso from './pages/Carrinho/Sucesso';

/**
 * Componente renderizado quando o pagamento é cancelado ou apresenta erro no checkout.
 */
function PagamentoErro() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2 style={{ color: '#e53e3e', marginBottom: '1rem' }}>❌ Pagamento Não Concluído</h2>
      <p style={{ marginBottom: '1.5rem', color: '#4a5568' }}>
        Ocorreu um problema ao processar seu pagamento ou a transação foi cancelada.
      </p>
      <Link 
        to="/carrinho" 
        style={{ 
          backgroundColor: '#3182ce', 
          color: '#fff', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '8px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Voltar ao Carrinho
      </Link>
    </div>
  );
}

/**
 * Componente renderizado quando o pagamento fica pendente de aprovação (ex: Boleto ou análise de crédito).
 */
function PagamentoPendente() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2 style={{ color: '#dd6b20', marginBottom: '1rem' }}>⏳ Pagamento em Processamento</h2>
      <p style={{ marginBottom: '1.5rem', color: '#4a5568' }}>
        Seu pagamento foi recebido e está sendo analisado. Assim que for aprovado, notificaremos você!
      </p>
      <Link 
        to="/produtos" 
        style={{ 
          backgroundColor: '#3182ce', 
          color: '#fff', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '8px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Continuar Navegando
      </Link>
    </div>
  );
}

/**
 * Componente responsável pelo roteamento principal da aplicação SolarisPower, configurando as rotas da aplicação dentro de um BrowserRouter e CartProvider.
 */
function RoutesApp() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-container">
          <Header />

          <main className="conteudo-principal">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobreNos" element={<SobreNos />} />
              <Route path="/duvidas" element={<Duvidas />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginEmpresa" element={<LoginEmpresa />} />
              <Route path="/cadastrarUsuario" element={<Cadastro />} />
              <Route path="/cadastrarEmpresa" element={<CadastroEmpresa />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/calculadoraSolar" element={<CalculadoraSolar />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/perfilEmpresa" element={<PerfilEmpresa />} />
              <Route path="/cadastrarProdutos" element={<CadastroProduto />} />
              <Route path="/politicaDePrivacidade" element={<PoliticaDePrivacidade />} />
              <Route path="/termosDeUso" element={<TermosDeUso />} />

              {/* Rotas de Retorno do Mercado Pago */}
              <Route path="/sucesso" element={<Sucesso />} />
              <Route path="/erro" element={<PagamentoErro />} />
              <Route path="/pendente" element={<PagamentoPendente />} />

              {/* Rota 404 - Página Não Encontrada */}
              <Route path="*" element={<Erro />} />
            </Routes> 
          </main>

          <Footer />
          <ChatBot />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default RoutesApp;