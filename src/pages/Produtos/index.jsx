import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  Sun, 
  Zap, 
  SlidersHorizontal,
  PackageCheck,
  X,
  AlertTriangle
} from 'lucide-react';

import { useCart } from '../../components/Context/CartContext'; // Ajuste o caminho se necessário
import './produtos.css';

function Produtos() {
  const navigate = useNavigate();

  // Consumindo contexto do carrinho
  const { cartItems, addToCart } = useCart();

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [quantidades, setQuantidades] = useState({});
  const [toast, setToast] = useState(null);

  // Busca os produtos cadastrados no Banco de Dados via Spring Boot
  useEffect(() => {
    axios.get('http://localhost:8080/api/produtos')
      .then((response) => {
        setProdutos(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
        setCarregando(false);
      });
  }, []);

  const categorias = [
    { id: 'todas', label: 'Todos os Produtos' },
    { id: 'painel', label: 'Painéis Solares' },
    { id: 'inversor', label: 'Inversores' },
    { id: 'bateria', label: 'Baterias Solares' },
    { id: 'controlador', label: 'Controladores' },
    { id: 'kitoffgrid', label: 'Kits Off-Grid' }
  ];

  // Helper para verificar quantas unidades deste produto JÁ ESTÃO no carrinho
  const getQuantidadeNoCarrinho = (produtoId) => {
    const itemNoCarrinho = cartItems.find((item) => item.id === produtoId);
    return itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  };

  // Controle de Quantidade Individual por Produto (Respeitando o Estoque Disponível)
  const handleQuantidadeChange = (produto, delta) => {
    const estoqueTotal = produto.quantidade || 0;
    const jaNoCarrinho = getQuantidadeNoCarrinho(produto.id);
    const limiteDisponivel = estoqueTotal - jaNoCarrinho;

    if (limiteDisponivel <= 0 && delta > 0) return;

    setQuantidades((prev) => {
      const atual = prev[produto.id] || 1;
      let novoValor = atual + delta;

      // Limite mínimo
      if (novoValor < 1) novoValor = 1;

      // Limite máximo baseado no estoque restante
      if (novoValor > limiteDisponivel) {
        novoValor = Math.max(1, limiteDisponivel);
      }

      return { ...prev, [produto.id]: novoValor };
    });
  };

  // Adicionar ao Carrinho usando o CartContext
  const adicionarAoCarrinho = (produto) => {
    const estoqueTotal = produto.quantidade || 0;
    const jaNoCarrinho = getQuantidadeNoCarrinho(produto.id);
    const limiteDisponivel = estoqueTotal - jaNoCarrinho;

    const qtdDesejada = quantidades[produto.id] || 1;

    if (limiteDisponivel <= 0) {
      setToast({
        mensagem: `Estoque máximo atingido no carrinho para "${produto.nome}".`,
        tipo: 'erro',
        id: Date.now()
      });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    if (qtdDesejada > limiteDisponivel) {
      setToast({
        mensagem: `Só há mais ${limiteDisponivel} unidade(s) disponível(is) em estoque.`,
        tipo: 'erro',
        id: Date.now()
      });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    // Padronização do objeto para o CartContext
    const produtoParaAdicionar = {
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      imagemUrl: produto.imagemBase64 || produto.imagemUrl,
      categoria: produto.categoria || 'Equipamento',
      estoqueMaximo: produto.quantidade // Salva o limite total no item se necessário
    };

    // Adiciona ao contexto global
    addToCart(produtoParaAdicionar, qtdDesejada);

    setToast({
      mensagem: `${qtdDesejada}x "${produto.nome}" adicionado(s) ao carrinho!`,
      tipo: 'sucesso',
      id: Date.now()
    });

    // Reseta a quantidade inserida no seletor do card para 1
    setQuantidades((prev) => ({ ...prev, [produto.id]: 1 }));

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Filtros
  const produtosFiltrados = produtos.filter((prod) => {
    const atendeBusca = (prod.nome || '').toLowerCase().includes(busca.toLowerCase()) ||
                        (prod.descricao || '').toLowerCase().includes(busca.toLowerCase());
    
    const categoriaProd = (prod.categoria || '').toLowerCase();
    const atendeCategoria = categoriaAtiva === 'todas' || categoriaProd === categoriaAtiva.toLowerCase();
    
    return atendeBusca && atendeCategoria;
  });

  // Calcula total de itens no carrinho
  const totalItensNoCarrinho = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="catalog-page-container">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`cart-toast ${toast.tipo === 'erro' ? 'toast-erro' : ''}`}>
          {toast.tipo === 'erro' ? <AlertTriangle size={18} /> : <Check size={18} />}
          <span>{toast.mensagem}</span>
        </div>
      )}

      <div className="catalog-wrapper">
        
        {/* Banner Hero / Cabeçalho */}
        <header className="catalog-header">
          <div className="header-badge">
            <Sun size={16} />
            <span>Energia Limpa & Sustentável</span>
          </div>
          <h1>Catálogo de Produtos</h1>
          <p>Encontre equipamentos solares de alta performance com garantia e entrega rápida.</p>

          {/* Carrinho Flutuante / Botão */}
          <div className="cart-quick-access">
            <button 
              className="btn-cart-floating" 
              title="Ver Carrinho"
              onClick={() => navigate('/carrinho')}
            >
              <ShoppingCart size={20} />
              <span className="cart-label hide-mobile">Meu Carrinho</span>
              {totalItensNoCarrinho > 0 && (
                <span className="cart-counter-badge">{totalItensNoCarrinho}</span>
              )}
            </button>
          </div>
        </header>

        {/* Filtros e Barra de Pesquisa */}
        <div className="filter-section-card">
          <div className="search-bar-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="O que você está procurando hoje?"
              className="search-input"
            />
            {busca && (
              <button className="btn-clear-search" onClick={() => setBusca('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="category-chips-scroll">
            <SlidersHorizontal size={16} className="filter-icon hide-mobile" />
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                className={`chip-button ${categoriaAtiva === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exibição durante carregamento */}
        {carregando ? (
          <div className="empty-catalog-state">
            <h3>Carregando produtos...</h3>
          </div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="products-grid">
            {produtosFiltrados.map((produto) => {
              const estoqueTotal = produto.quantidade || 0;
              const jaNoCarrinho = getQuantidadeNoCarrinho(produto.id);
              const disponivelParaAdicionar = estoqueTotal - jaNoCarrinho;
              const qtdAtual = quantidades[produto.id] || 1;
              const semEstoque = estoqueTotal <= 0;
              const esgotadoNoCarrinho = disponivelParaAdicionar <= 0;

              return (
                <div key={produto.id} className="product-card">
                  
                  {/* Container da Imagem com Tag de Estoque */}
                  <div className="card-image-wrapper">
                    <img 
                      src={produto.imagemBase64 || produto.imagemUrl || 'https://via.placeholder.com/400x300?text=Sem+Imagem'} 
                      alt={produto.nome} 
                    />
                    <span className={`stock-tag ${semEstoque ? 'out-of-stock' : ''}`}>
                      <PackageCheck size={12} /> 
                      {semEstoque 
                        ? 'Esgotado' 
                        : `${estoqueTotal} em estoque${jaNoCarrinho > 0 ? ` (${jaNoCarrinho} no carrinho)` : ''}`}
                    </span>
                  </div>

                  {/* Detalhes do Produto */}
                  <div className="card-content">
                    <h3 className="product-title">{produto.nome}</h3>
                    <p className="product-description">{produto.descricao}</p>

                    <div className="product-price-row">
                      <span className="price-currency">R$</span>
                      <span className="price-amount">
                        {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Controles de Compra */}
                    <div className="card-actions-wrapper">
                      
                      <div className="quantity-selector">
                        <button
                          type="button"
                          onClick={() => handleQuantidadeChange(produto, -1)}
                          className="btn-qty"
                          disabled={semEstoque || esgotadoNoCarrinho || qtdAtual <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{semEstoque || esgotadoNoCarrinho ? 0 : qtdAtual}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantidadeChange(produto, 1)}
                          className="btn-qty"
                          disabled={semEstoque || esgotadoNoCarrinho || qtdAtual >= disponivelParaAdicionar}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => adicionarAoCarrinho(produto)}
                        className="btn-add-cart"
                        disabled={semEstoque || esgotadoNoCarrinho}
                      >
                        <ShoppingCart size={16} />
                        <span>{semEstoque ? 'Indisponível' : esgotadoNoCarrinho ? 'Limite no Carrinho' : 'Adicionar'}</span>
                      </button>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <Zap size={48} className="empty-icon" />
            <h3>Nenhum produto encontrado</h3>
            <p>Tente alterar o termo da busca ou selecione outra categoria.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Produtos;