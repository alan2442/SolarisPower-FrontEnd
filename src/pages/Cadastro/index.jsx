import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Mail, 
  FileText, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Sun,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import './cadastro.css';


function Cadastro({ erroCadastro: erroProp }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nmPessoa: '',
        dtNascimento: '',
        emailPessoa: '',
        cpfPessoa: '',
        senhaPessoa: '',
        confSenha: ''
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false);
    const [erroValidacao, setErroValidacao] = useState('');
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    // Máscara dinâmica para Data de Nascimento (DD/MM/AAAA)
    const aplicarMascaraData = (val) => {
        return val
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')             .replace(/(\d{4})\d+?$/, '$1');
    };

    // Máscara dinâmica para CPF (000.000.000-00)
    const aplicarMascaraCPF = (val) => {
        return val
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')             .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let valorFormatado = value;

        if (name === 'dtNascimento') {
            valorFormatado = aplicarMascaraData(value);
        } else if (name === 'cpfPessoa') {
            valorFormatado = aplicarMascaraCPF(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: valorFormatado
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErroValidacao('');
        setSucessoMensagem('');

        // 1. Validação local de senha
        if (formData.senhaPessoa !== formData.confSenha) {
            setErroValidacao('As senhas não coincidem!');
            return;
        }

        setCarregando(true);

        // Prepara o payload limpando a máscara do CPF se necessário
        const payload = {
            ...formData,
            cpfPessoa: formData.cpfPessoa.replace(/\D/g, '') // Envia apenas números
        };

        try {
            const response = await fetch('http://localhost:8080/api/pessoas/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Tenta ler o JSON retornado pela API
            let data = {};
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (!response.ok) {
                // Exibe erro do Spring Boot ou mensagem genérica
                setErroValidacao(data.mensagem || `Erro no servidor (Status: ${response.status})`);
            } else {
                setSucessoMensagem('Cadastro realizado com sucesso! Redirecionando para o login...');
                
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErroValidacao('Falha ao conectar com o backend. Verifique se o Spring Boot está rodando na porta 8080 e se o CORS está configurado.');
        } finally {
            setCarregando(false);
        }
    };

    const mensagemErroExibicao = erroValidacao || erroProp;


    return (


        <main className="pagina-cadastro-usuario">
            <div className="cartao-cadastro-wrapper">

                {/* Painel Institucional */}
                <div className="painel-institucional-usuario">
                    <div className="conteudo-institucional">
                        <div className="marca-badge">
                            <Sun className="icone-sol" size={22} />
                            <span>SolarisPower</span>
                        </div>
                        <h2>Crie sua conta e faça parte da revolução solar.</h2>
                        <p>
                            Cadastre-se para acessar orçamentos personalizados, simular economia na sua fatura e acompanhar a instalação dos seus painéis solares.
                        </p>

                        <div className="beneficios-lista">
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Simulação gratuita de economia
                            </div>
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Acompanhamento em tempo real
                            </div>
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Atendimento e suporte dedicado
                            </div>
                        </div>
                    </div>

                    <div className="rodape-institucional">
                        <span>Sustentabilidade & Economia</span>
                    </div>
                </div>

                {/* Form de Cadastro */}
                <div className="painel-formulario">
                    <div className="cabecalho-form">
                        <span className="tag-modulo">NOVO CLIENTE</span>
                        <h2>CADASTRO DE CLIENTE</h2>
                        <p>Preencha os campos abaixo para criar sua conta</p>
                    </div>

                    {mensagemErroExibicao && (
                        <div className="alerta alerta-erro" role="alert">
                            <AlertCircle size={18} />
                            <span>{mensagemErroExibicao}</span>
                        </div>
                    )}

                    {sucessoMensagem && (
                        <div className="alerta alerta-sucesso" role="alert">
                            <CheckCircle2 size={18} />
                            <span>{sucessoMensagem}</span>
                        </div>
                    )}

                    <form id="cadastroForm" className="formulario-cadastro" onSubmit={handleSubmit}>
                        
                        {/* Nome Completo */}
                        <div className="grupo-input">
                            <label htmlFor="nm_pessoa">Nome Completo</label>
                            <div className="input-com-icone">
                                <User className="icone-campo" size={18} />
                                <input
                                    type="text"
                                    name="nmPessoa"
                                    id="nm_pessoa"
                                    placeholder="Seu nome completo"
                                    maxLength={50}
                                    value={formData.nmPessoa}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Grid de 2 Colunas: Data Nasc + CPF */}
                        <div className="grid-duplo">
                            <div className="grupo-input">
                                <label htmlFor="dt_nascimento">Data de Nascimento</label>
                                <div className="input-com-icone">
                                    <Calendar className="icone-campo" size={18} />
                                    <input
                                        type="text"
                                        name="dtNascimento"
                                        id="dt_nascimento"
                                        placeholder="DD/MM/AAAA"
                                        maxLength={10}
                                        value={formData.dtNascimento}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grupo-input">
                                <label htmlFor="cpf_pessoa">CPF</label>
                                <div className="input-com-icone">
                                    <FileText className="icone-campo" size={18} />
                                    <input
                                        type="text"
                                        name="cpfPessoa"
                                        id="cpf_pessoa"
                                        placeholder="000.000.000-00"
                                        maxLength={14}
                                        value={formData.cpfPessoa}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* E-mail */}
                        <div className="grupo-input">
                            <label htmlFor="email_pessoa">E-mail</label>
                            <div className="input-com-icone">
                                <Mail className="icone-campo" size={18} />
                                <input
                                    type="email"
                                    name="emailPessoa"
                                    id="email_pessoa"
                                    placeholder="seuemail@exemplo.com"
                                    maxLength={50}
                                    value={formData.emailPessoa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Senhas */}
                        <div className="grid-duplo">
                            <div className="grupo-input">
                                <label htmlFor="senha_pessoa">Senha</label>
                                <div className="input-com-icone">
                                    <Lock className="icone-campo" size={18} />
                                    <input
                                        type={mostrarSenha ? 'text' : 'password'}
                                        name="senhaPessoa"
                                        id="senha_pessoa"
                                        placeholder="Sua senha"
                                        maxLength={20}
                                        value={formData.senhaPessoa}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn-toggle-senha"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        aria-label="Alternar exibição da senha"
                                    >
                                        {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grupo-input">
                                <label htmlFor="confSenha">Confirmar Senha</label>
                                <div className="input-com-icone">
                                    <Lock className="icone-campo" size={18} />
                                    <input
                                        type={mostrarConfSenha ? 'text' : 'password'}
                                        name="confSenha"
                                        id="confSenha"
                                        placeholder="Repita a senha"
                                        maxLength={20}
                                        value={formData.confSenha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn-toggle-senha"
                                        onClick={() => setMostrarConfSenha(!mostrarConfSenha)}
                                        aria-label="Alternar exibição da senha"
                                    >
                                        {mostrarConfSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Envio */}
                        <button 
                            type="submit" 
                            className="btn-cadastrar-usuario" 
                            disabled={carregando}
                        >
                            {carregando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>PROCESSANDO...</span>
                                </>
                            ) : (
                                <>
                                    <span>FINALIZAR CADASTRO</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="links-navegacao">
                            <p className="texto-login">
                                Já possui uma conta?{' '}
                                <Link to="/login" className="link-destaque">
                                    Entrar!
                                </Link>
                            </p>

                            <div className="divisor-links">
                                <span>Área da Empresa</span>
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

export default Cadastro;