import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import './loginEmpresa.css';

function LoginEmpresa({ mensagemCadastroEmpresa, erro: erroProp }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailEmpresa: '',
        senhaEmpresa: ''
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erroLogin, setErroLogin] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleMostrarSenha = () => {
        setMostrarSenha((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroLogin('');
        setCarregando(true);

        try {
            const response = await fetch('http://localhost:8080/api/empresas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            let data = {};
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            }

            if (!response.ok) {
                setErroLogin(data.mensagem || 'E-mail ou senha corporativa incorretos.');
            } else {
                // Salva a empresa logada no localStorage
                localStorage.setItem('empresaLogada', JSON.stringify(data));

                // Redireciona para o Perfil da Empresa
                navigate('/perfilEmpresa');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErroLogin('Não foi possível conectar ao servidor. Verifique se o backend está online.');
        } finally {
            setCarregando(false);
        }
    };

    const mensagemErroExibicao = erroLogin || erroProp;

    return (
        <main className="pagina-login-empresa">
            <div className="cartao-login-wrapper">

                {/* Lado Esquerdo - Painel B2B / Corporativo */}
                <div className="painel-institucional-empresa">
                    <div className="conteudo-institucional">
                        <div className="badge-b2b">
                            <Building2 size={18} />
                            <span>Portal de Parceiros & Integradores</span>
                        </div>
                        <h2>Impulsione seu negócio fotovoltaico com a SolarisPower.</h2>
                        <p>
                            Acesse a plataforma exclusiva para empresas parceiras. Gerencie pedidos faturados, consulte tabela de preços com condições especiais B2B e acesse suporte técnico homologado.
                        </p>
                    </div>

                    {/* Destaques B2B */}
                    <div className="recursos-b2b">
                        <div className="item-recurso">
                            <span className="dot-recurso"></span>
                            <span>Distribuição e Equipamentos Homologados</span>
                        </div>
                        <div className="item-recurso">
                            <span className="dot-recurso"></span>
                            <span>Faturamento e Condições Especiais PJ</span>
                        </div>
                    </div>

                    <div className="rodape-institucional">
                        <span>SolarisPower • Plataforma Corporativa</span>
                    </div>
                </div>

                {/* Lado Direito - Formulário de Login da Empresa */}
                <div className="painel-formulario">
                    <div className="cabecalho-form">
                        <span className="tag-modulo">ÁREA EMPRESARIAL</span>
                        <h2>ENTRAR COMO EMPRESA</h2>
                        <p>Insira as credenciais corporativas para acessar sua conta</p>
                    </div>

                    {/* Mensagem de sucesso após cadastro da empresa */}
                    {mensagemCadastroEmpresa && (
                        <div className="alerta alerta-sucesso" role="alert">
                            <CheckCircle2 size={18} />
                            <span>{mensagemCadastroEmpresa}</span>
                        </div>
                    )}

                    {/* Mensagem de erro de login */}
                    {mensagemErroExibicao && (
                        <div className="alerta alerta-erro" role="alert">
                            <AlertCircle size={18} />
                            <span>{mensagemErroExibicao}</span>
                        </div>
                    )}

                    <form id="loginForm" className="formulario-login" onSubmit={handleSubmit}>

                        {/* Campo: Email da Empresa */}
                        <div className="grupo-input">
                            <label htmlFor="emailEmpresa">E-mail Corporativo</label>
                            <div className="input-com-icone">
                                <Mail className="icone-campo" size={20} />
                                <input
                                    type="email"
                                    name="emailEmpresa"
                                    id="emailEmpresa"
                                    placeholder="empresa@dominio.com.br"
                                    maxLength={50}
                                    value={formData.emailEmpresa}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Campo: Senha da Empresa */}
                        <div className="grupo-input">
                            <label htmlFor="senhaEmpresa">Senha de Acesso</label>
                            <div className="input-com-icone">
                                <Lock className="icone-campo" size={20} />
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    name="senhaEmpresa"
                                    id="senhaEmpresa"
                                    placeholder="Digite sua senha"
                                    maxLength={20}
                                    value={formData.senhaEmpresa}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn-toggle-senha"
                                    onClick={toggleMostrarSenha}
                                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                                >
                                    {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Botão Principal */}
                        <button type="submit" className="btn-entrar-b2b" disabled={carregando}>
                            {carregando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>ACESSANDO...</span>
                                </>
                            ) : (
                                <>
                                    <span>ACESSAR PORTAL PJ</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Links Adicionais de Navegação */}
                        <div className="links-navegacao">
                            <p className="texto-cadastro">
                                Não possui uma conta de Empresa?{' '}
                                <Link to="/cadastrarEmpresa" className="link-destaque-b2b">
                                    Criar conta!
                                </Link>
                            </p>

                            <div className="divisor-links">
                                <span>Acesso para Pessoa Física</span>
                            </div>

                            <div className="acoes-cliente">
                                <Link to="/cadastrarUsuario" className="btn-link-secundario">
                                    Cadastrar Cliente
                                </Link>
                                <Link to="/login" className="btn-link-secundario">
                                    Login Cliente
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </main>
    );
}

export default LoginEmpresa;