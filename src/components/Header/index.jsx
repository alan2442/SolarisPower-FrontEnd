import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, Building2 } from 'lucide-react';

import { useCart } from '../../components/Context/CartContext'; // 1. Import do hook do carrinho (ajuste o caminho se necessário)

import logoImg from '../../assets/images/logo2.jpeg';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Consome o estado global do carrinho
  const { cartItems } = useCart();

  // 3. Calcula a quantidade total de itens no carrinho
  const totalItensCarrinho = cartItems.reduce(
    (acc, item) => acc + (item.quantidade || 1), 0
  );

  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaMobileAberta, setBuscaMobileAberta] = useState(false);

  const [usuario, setUsuario] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  // Carrega as informações do usuário/empresa logado do localStorage
  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuarioLogado');
    const empresaStorage = localStorage.getItem('empresaLogada');

    if (empresaStorage) {
      try {
        setEmpresa(JSON.parse(empresaStorage));
        setUsuario(null);
      } catch (e) {
        setEmpresa(null);
      }
    } else if (usuarioStorage) {
      try {
        setUsuario(JSON.parse(usuarioStorage));
        setEmpresa(null);
      } catch (e) {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
      setEmpresa(null);
    }
  }, [location]); // Reexecuta ao mudar de rota para manter o header atualizado após login/logout

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  // Lógica de Redirecionamento Dinâmico
  const handlePerfilClick = () => {
    fecharMenu();
    if (empresa) {
      navigate('/perfilEmpresa');
    } else if (usuario) {
      navigate('/perfil');
    } else {
      navigate('/login');
    }
  };

  // Texto dinâmico de saudação e rótulo do botão
  const getSaudacaoText = () => {
    if (empresa) return `Olá, ${empresa.nmEmpresa || 'Parceiro'}`;
    if (usuario) return `Olá, ${usuario.nmPessoa || 'Cliente'}`;
    return 'Olá, Seja Bem-Vindo!';
  };

  const getBotaoText = () => {
    if (empresa || usuario) return 'Meu Perfil';
    return 'Entrar / Cadastrar';
  };

  return (
    <header className="solaris-header">
      {/* Topbar Promocional Superior */}
      <div className="solaris-topbar">
        <div className="topbar-container">
          <span>⚡ Energia Solar de Alta Performance | Envio para todo o Brasil</span>
          <div className="topbar-links">
            <Link to="/suporte">Atendimento</Link>
            <Link to="/duvidas">FAQ</Link>
          </div>
        </div>
      </div>

      {/* Cabeçalho Principal */}
      <div className="solaris-header-main">
        <div className="header-container">

          {/* COLUNA 1: Hambúrguer Mobile + Logo */}
          <div className="header-col-esquerda">
            <button 
              className="btn-hamburguer"
              onClick={toggleMenu}
              aria-label="Abrir Menu"
            >
              {menuAberto ? <X size={26} /> : <Menu size={26} />}
            </button>

            <Link to="/" className="solaris-logo" onClick={fecharMenu}>
              <img src={logoImg} alt="SolarisPower Logo" />
            </Link>
          </div>

          {/* COLUNA 2: Navegação & Busca Desktop */}
          <div className="header-col-centro">
            <nav className="nav-desktop">
              <ul>
                <li><Link to="/produtos">Produtos</Link></li>
                <li><Link to="/sobreNos">Quem Somos</Link></li>
                <li><Link to="/duvidas">Dúvidas</Link></li>
                <li><Link to="/suporte">Suporte</Link></li>
              </ul>
            </nav>

            <div className="campo-busca-desktop">
              <input type="text" placeholder="O que você precisa hoje?" />
              <button type="button" aria-label="Buscar">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* COLUNA 3: Perfil & Carrinho Apenas Ícone */}
          <div className="header-col-direita">
            <button 
              className="btn-lupa-mobile" 
              onClick={() => setBuscaMobileAberta(!buscaMobileAberta)}
              aria-label="Abrir Pesquisa"
            >
              <Search size={22} />
            </button>

            <div className="usuario-bloco">
              <div className="usuario-avatar">
                {empresa ? <Building2 size={18} /> : <User size={18} />}
              </div>
              <div className="usuario-textos">
                <span className="saudacao">{getSaudacaoText()}</span>
                <button 
                  type="button" 
                  className="btn-perfil" 
                  onClick={handlePerfilClick}
                >
                  {getBotaoText()}
                </button>
              </div>
            </div>

            {/* Carrinho Redondo com Contador Dinâmico */}
            <Link to="/carrinho" className="btn-carrinho" aria-label="Carrinho">
              <div className="carrinho-wrapper">
                <ShoppingBag size={20} />
                <span className="badge-contador">{totalItensCarrinho}</span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Busca Mobile Expansível */}
      {buscaMobileAberta && (
        <div className="busca-mobile-drop">
          <div className="busca-mobile-container">
            <input type="text" placeholder="Buscar produtos..." />
            <button type="button">Buscar</button>
          </div>
        </div>
      )}

      {/* Overlay Escuro */}
      {menuAberto && <div className="menu-overlay" onClick={fecharMenu}></div>}

      {/* Gaveta Lateral (Menu Mobile) */}
      <aside className={`gaveta-mobile ${menuAberto ? 'aberta' : ''}`}>
        <div className="gaveta-cabecalho">
          <div className="usuario-bloco-mobile">
            <div className="usuario-avatar">
              {empresa ? <Building2 size={20} /> : <User size={20} />}
            </div>
            <div>
              <span className="saudacao">{getSaudacaoText()}</span>
              <button 
                type="button" 
                className="btn-perfil" 
                onClick={handlePerfilClick}
              >
                {getBotaoText()}
              </button>
            </div>
          </div>
          <button className="btn-fechar-gaveta" onClick={fecharMenu}>
            <X size={24} />
          </button>
        </div>

        <nav className="nav-mobile">
          <ul>
            <li><Link to="/produtos" onClick={fecharMenu}>Produtos</Link></li>
            <li><Link to="/sobreNos" onClick={fecharMenu}>Quem Somos</Link></li>
            <li><Link to="/duvidas" onClick={fecharMenu}>Dúvidas</Link></li>
            <li><Link to="/suporte" onClick={fecharMenu}>Suporte</Link></li>
          </ul>
        </nav>
      </aside>
    </header>
  );
}

export default Header;