import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Check, AlertTriangle, X, ShoppingCart, Info, PackageCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../../components/Context/CartContext'; 
import './index.css';

// Importação das imagens do layout
import fotoBanner from '../../assets/images/fotoBanner.jpg';

// Ícones SVG
import solarIcon from '../../assets/images/IconesNAV/solar_power.svg';
import suporteIcon from '../../assets/images/IconesNAV/assignment.svg';
import planosIcon from '../../assets/images/IconesNAV/call_log.svg';

function Index() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [toast, setToast] = useState(null);
  
  // Estado para armazenar o produto selecionado para exibir no Modal de detalhes
  const [produtoModal, setProdutoModal] = useState(null);

  // Consumindo o contexto do carrinho
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/produtos')
      .then((response) => {
        setProdutosDestaque(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos em destaque:', error);
      });
  }, []);

  const getQuantidadeNoCarrinho = (produtoId) => {
    const itemNoCarrinho = cartItems.find((item) => item.id === produtoId);
    return itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  };

  const handleQuantidadeChange = (produto, delta) => {
    const estoqueTotal = produto.quantidade || 0;
    const jaNoCarrinho = getQuantidadeNoCarrinho(produto.id);
    const limiteDisponivel = estoqueTotal - jaNoCarrinho;

    if (limiteDisponivel <= 0 && delta > 0) return;

    setQuantidades((prev) => {
      const atual = prev[produto.id] || 1;
      let novoValor = atual + delta;

      if (novoValor < 1) novoValor = 1;
      if (novoValor > limiteDisponivel) {
        novoValor = Math.max(1, limiteDisponivel);
      }

      return { ...prev, [produto.id]: novoValor };
    });
  };

  const handleAdicionarAoCarrinho = (produto) => {
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

    const produtoParaAdicionar = {
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      imagemUrl: produto.imagemBase64 || produto.imagemUrl,
      categoria: produto.categoria || 'Equipamento',
      estoqueMaximo: produto.quantidade
    };

    addToCart(produtoParaAdicionar, qtdDesejada);

    setToast({
      mensagem: `${qtdDesejada}x "${produto.nome}" adicionado(s) ao carrinho!`,
      tipo: 'sucesso',
      id: Date.now()
    });

    setQuantidades((prev) => ({ ...prev, [produto.id]: 1 }));

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <div className="pagina-inicial">
      {toast && (
        <div className={`cart-toast ${toast.tipo === 'erro' ? 'toast-erro' : ''}`}>
          {toast.tipo === 'erro' ? <AlertTriangle size={18} /> : <Check size={18} />}
          <span>{toast.mensagem}</span>
        </div>
      )}

      {/* Banner Principal */}
      <section className="banner-principal">
        <div className="conteiner-banner">
          <div className="imagem-banner-wrapper">
            <img
              src={fotoBanner}
              alt="Instalação de Painéis Solares"
              className="imagem-banner"
            />
          </div>
          <div className="conteudo-banner">
            <h1>
              ENERGIA SOLAR<br />
              <span className="destaque-texto">INVESTIMENTO</span><br />
              INTELIGENTE
            </h1>
            <p>
              Transforme sua casa com energia solar. Reduza suas contas de energia
              e contribua para um planeta mais verde.
            </p>
            <div className="grupo-botoes-banner">
              <Link to="/produtos" className="botao-principal">
                Ver Produtos
              </Link>
              <Link to="/calculadoraSolar" className="botao-secundario">
                Calculadora Solar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação Rápida */}
      <section className="navegacao-rapida">
        <div className="conteiner-navegacao">
          <Link to="/produtos" className="item-navegacao">
            <img src={solarIcon} alt="Produtos" />
            <span>Produtos</span>
          </Link>
          <Link to="/duvidas" className="item-navegacao">
            <img src={suporteIcon} alt="Suporte" />
            <span>Dúvidas</span>
          </Link>
          <Link to="/suporte" className="item-navegacao">
            <img src={planosIcon} alt="Suporte" />
            <span>Suporte</span>
          </Link>
        </div>
      </section>

      {/* Seções em Destaque */}
      <section className="secoes-destaque">
        <div className="conteiner-destaque">
          <Link to="/sobre" className="cartao-destaque educacional">
            <div className="camada-sobreposta">
              <h3>Conheça a Energia Solar</h3>
              <span className="link-saber-mais">Saiba mais &rarr;</span>
            </div>
          </Link>
          <Link to="/duvidas" className="cartao-destaque noticias">
            <div className="camada-sobreposta">
              <h3>Notícias do Mundo Fotovoltaico</h3>
              <span className="link-saber-mais">Leia as novidades &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Vitrine de Produtos Destaque */}
      <section className="vitrine-produtos">
        <div className="conteiner-produtos">
          <div className="cabecalho-secao">
            <h2>Produtos em Destaque</h2>
            <p>Soluções completas e prontas para instalação na sua residência ou empresa.</p>
          </div>

          <div className="grade-produtos">
            {produtosDestaque.length > 0 ? (
              produtosDestaque.map((produto) => {
                const estoqueTotal = produto.quantidade || 0;
                const jaNoCarrinho = getQuantidadeNoCarrinho(produto.id);
                const disponivelParaAdicionar = estoqueTotal - jaNoCarrinho;
                const qtdAtual = quantidades[produto.id] || 1;
                const semEstoque = estoqueTotal <= 0;
                const esgotadoNoCarrinho = disponivelParaAdicionar <= 0;
                
                // Exibe o botão "Ver mais detalhes" se a descrição for maior que 45 caracteres
                const descricaoLonga = produto.descricao && produto.descricao.length > 45;

                return (
                  <div key={produto.id} className="cartao-produto">
                    <div className="imagem-produto-wrapper">
                      <img
                        src={
                          produto.imagemBase64 ||
                          produto.imagemUrl ||
                          'https://via.placeholder.com/400x300?text=Sem+Imagem'
                        }
                        alt={produto.nome}
                        className="imagem-produto"
                      />
                      <span className={`stock-tag ${semEstoque ? 'out-of-stock' : ''}`}>
                        <PackageCheck size={12} /> 
                        {semEstoque 
                          ? 'Esgotado' 
                          : `${estoqueTotal} em estoque${jaNoCarrinho > 0 ? ` (${jaNoCarrinho} no carrinho)` : ''}`}
                      </span>
                    </div>

                    <div className="corpo-cartao-produto">
                      <div className="info-topo-card">
                        <span className="categoria-tag">{produto.categoria || 'Equipamento'}</span>
                        <h3 className="titulo-produto">{produto.nome}</h3>
                      </div>
                      
                      {/* Descrição com quebra de linha natural garantida */}
                      <div className="description-wrapper">
                        <p className="descricao-produto">{produto.descricao}</p>
                        {descricaoLonga && (
                          <button 
                            type="button" 
                            className="btn-toggle-description"
                            onClick={() => setProdutoModal(produto)}
                          >
                            Ver mais detalhes
                          </button>
                        )}
                      </div>

                      <div className="card-footer-info">
                        <div className="preco-produto">
                          <span className="preco-simbolo">R$</span>
                          <span className="preco-valor">
                            {Number(produto.preco).toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        
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
                            onClick={() => handleAdicionarAoCarrinho(produto)}
                            className="btn-add-cart"
                            disabled={semEstoque || esgotadoNoCarrinho}
                          >
                            <ShoppingCart size={16} />
                            <span>{semEstoque ? 'Indisponível' : esgotadoNoCarrinho ? 'Limite' : 'Adicionar'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: 'center', color: '#2d3748', width: '100%' }}>
                Nenhum produto em destaque no momento.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* --- MODAL AMPLO PARA DETALHES COMPLETOS DO PRODUTO --- */}
      {produtoModal && (
        <div className="modal-overlay" onClick={() => setProdutoModal(null)}>
          <div className="modal-card-expanded" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setProdutoModal(null)}>
              <X size={20} />
            </button>

            <div className="modal-body-expanded">
              <div className="modal-image-container-expanded">
                <img 
                  src={produtoModal.imagemBase64 || produtoModal.imagemUrl || 'https://via.placeholder.com/400x300?text=Sem+Imagem'} 
                  alt={produtoModal.nome} 
                />
              </div>

              <div className="modal-info-container-expanded">
                <div className="modal-header-info">
                  <span className="modal-category-badge">{produtoModal.categoria || 'Equipamento Solar'}</span>
                  <h2>{produtoModal.nome}</h2>
                </div>

                <div className="modal-description-box-expanded">
                  <h4><Info size={16} /> Descrição Completa do Produto</h4>
                  <p>{produtoModal.descricao}</p>
                </div>

                <div className="modal-footer-expanded">
                  <div className="modal-price-box">
                    <span>Preço:</span>
                    <div className="product-price-row">
                      <span className="price-currency">R$</span>
                      <span className="price-amount">
                        {Number(produtoModal.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <button 
                    className="btn-add-cart"
                    style={{ flex: 'none', padding: '0.8rem 1.5rem' }}
                    onClick={() => {
                      handleAdicionarAoCarrinho(produtoModal);
                      setProdutoModal(null);
                    }}
                  >
                    <ShoppingCart size={18} />
                    <span>Adicionar ao Carrinho</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Index;