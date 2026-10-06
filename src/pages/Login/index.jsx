import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './login.css';


function Login({ mensagemCadastroUsuario, erro: erroProp }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailPessoa: '',
        senhaPessoa: ''
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
            const response = await fetch('http://localhost:8080/api/pessoas/login', {
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
                setErroLogin(data.mensagem || 'E-mail ou senha incorretos.');
            } else {
                // Armazena dados do usuário logado no localStorage
                localStorage.setItem('usuarioLogado', JSON.stringify(data));

                // Redireciona para a página de perfil
                navigate('/perfil');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErroLogin('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } finally {
            setCarregando(false);
        }
    };

    const mensagemErroExibicao = erroLogin || erroProp;


    const location = useLocation();
    // Captura a mensagem enviada pelo navigate, se houver
    const mensagemAlerta = location.state?.mensagem;


    return (

            

        <main className="pagina-login">

            

            <div className="cartao-login-wrapper">

                {/* Painel de Marca */}
                <div className="painel-institucional">
                    <div className="conteudo-institucional">
                        <div className="marca-badge">
                            <span className="icone-sol">☀️</span> SolarisPower
                        </div>
                        <h2>Energia limpa para transformar o seu futuro.</h2>
                        <p>
                            Acesse sua conta para gerenciar seus sistemas fotovoltaicos, consultar orçamentos e monitorar a sua economia em tempo real.
                        </p>
                    </div>
                    <div className="rodape-institucional">
                        <span>Tecnologia em Energia Solar</span>
                    </div>
                </div>

                {/* Formulário de Login */}
                <div className="painel-formulario">
                    {mensagemAlerta && (
                    <div className="alert-warning" style={{
                        padding: '12px 16px',
                        marginBottom: '20px',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        border: '1px solid #ffeeba',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {mensagemAlerta}
                    </div>
                )}
                    <div className="cabecalho-form">
                        <h2>ENTRAR COMO CLIENTE</h2>
                        <p>Digite seus dados de acesso abaixo</p>
                    </div>

                    {mensagemCadastroUsuario && (
                        <div className="alerta alerta-sucesso" role="alert">
                            <CheckCircle2 size={18} />
                            <span>{mensagemCadastroUsuario}</span>
                        </div>
                    )}

                    {mensagemErroExibicao && (
                        <div className="alerta alerta-erro" role="alert">
                            <AlertCircle size={18} />
                            <span>{mensagemErroExibicao}</span>
                        </div>
                    )}

                    <form id="loginForm" className="formulario-login" onSubmit={handleSubmit}>

                        {/* Campo: Email */}
                        <div className="grupo-input">
                            <label htmlFor="emailPessoa">E-mail</label>
                            <div className="input-com-icone">
                                <Mail className="icone-campo" size={20} />
                                <input
                                    type="email"
                                    name="emailPessoa"
                                    id="emailPessoa"
                                    placeholder="seuemail@exemplo.com"
                                    maxLength={50}
                                    value={formData.emailPessoa}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Campo: Senha */}
                        <div className="grupo-input">
                            <label htmlFor="senhaPessoa">Senha</label>
                            <div className="input-com-icone">
                                <Lock className="icone-campo" size={20} />
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    name="senhaPessoa"
                                    id="senhaPessoa"
                                    placeholder="Digite sua senha"
                                    maxLength={20}
                                    value={formData.senhaPessoa}
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

                        {/* Botão Entrar */}
                        <button type="submit" className="btn-entrar" disabled={carregando}>
                            {carregando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>ENTRANDO...</span>
                                </>
                            ) : (
                                <>
                                    <span>ENTRAR</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Links de Navegação */}
                        <div className="links-navegacao">
                            <p className="texto-cadastro">
                                Não possui uma conta? <Link to="/cadastrarUsuario" className="link-destaque">Criar conta!</Link>
                            </p>

                            <div className="divisor-links">
                                <span>Acesso Empresarial</span>
                            </div>

                            <div className="acoes-empresa">
                                <Link to="/cadastrarEmpresa" className="btn-link-secundario">
                                    Cadastrar Empresa
                                </Link>
                                <Link to="/loginEmpresa" className="btn-link-secundario">
                                    Login Empresa
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </main>


    );
}

export default Login;