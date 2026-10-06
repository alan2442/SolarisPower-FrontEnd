import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Check, AlertTriangle } from 'lucide-react'; // Ícones para a notificação Toast
import { useCart } from '../../components/Context/CartContext'; // Ajuste o caminho do seu CartContext se necessário
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
  const [toast, setToast] = useState(null); // Estado da mensagem Toast

  // Consumindo a função de adicionar do Contexto do Carrinho
  const { addToCart } = useCart();

  useEffect(() => {
    // Busca os produtos e pega apenas os 3 primeiros para o destaque
    axios
      .get('http://localhost:8080/api/produtos')
      .then((response) => {
        setProdutosDestaque(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos em destaque:', error);
      });
  }, []);

  const tratarMudancaQuantidade = (id, valor) => {
    const qtd = Math.max(0, parseInt(valor, 10) || 0);
    setQuantidades((prev) => ({ ...prev, [id]: qtd }));
  };

  const handleAdicionarAoCarrinho = (produto) => {
    const qtd = quantidades[produto.id] || 0;

    if (qtd <= 0) {
      setToast({
        mensagem: 'Por favor, selecione ao menos 1 unidade.',
        tipo: 'erro',
        id: Date.now()
      });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    // Estrutura padronizada do objeto
    const produtoParaAdicionar = {
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      imagemUrl: produto.imagemBase64 || produto.imagemUrl,
      categoria: produto.categoria || 'Equipamento',
    };

    // Adiciona ao contexto com a quantidade informada
    addToCart(produtoParaAdicionar, qtd);

    // Toast de Sucesso
    setToast({
      mensagem: `${qtd}x "${produto.nome}" adicionado(s) ao carrinho!`,
      tipo: 'sucesso',
      id: Date.now()
    });

    // Reseta a quantidade inserida no campo do produto
    setQuantidades((prev) => ({ ...prev, [produto.id]: '' }));

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <div className="pagina-inicial">
      {/* Toast Notification */}
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
          <Link to="/suporte" className="item-navegacao">
            <img src={suporteIcon} alt="Suporte" />
            <span>Suporte</span>
          </Link>
          <Link to="/planos" className="item-navegacao">
            <img src={planosIcon} alt="Planos" />
            <span>Planos</span>
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
              produtosDestaque.map((produto) => (
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
                  </div>
                  <div className="corpo-cartao-produto">
                    <h3 className="titulo-produto">{produto.nome}</h3>
                    <p className="descricao-produto">{produto.descricao}</p>
                    <div className="preco-produto">
                      R${' '}
                      {Number(produto.preco).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="acoes-compra">
                      <input
                        type="number"
                        min="1"
                        placeholder="Qtd"
                        className="campo-quantidade"
                        value={quantidades[produto.id] || ''}
                        onChange={(e) =>
                          tratarMudancaQuantidade(produto.id, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleAdicionarAoCarrinho(produto)}
                        className="botao-carrinho"
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#fff', width: '100%' }}>
                Nenhum produto em destaque no momento.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;