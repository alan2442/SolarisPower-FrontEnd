import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Sun, 
  Briefcase, 
  FileBadge,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import './cadastroEmpresa.css';

function CadastroEmpresa({ erroCadastro: erroProp }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nmEmpresa: '',
        cnpjEmpresa: '',
        emailEmpresa: '',
        segmentoEmpresa: '',
        senhaEmpresa: '',
        confSenhaEmpresa: ''
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false);
    const [erroValidacao, setErroValidacao] = useState('');
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    // Máscara dinâmica para CNPJ (00.000.000/0001-00)
    const aplicarMascaraCNPJ = (val) => {
        return val
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let valorFormatado = value;

        if (name === 'cnpjEmpresa') {
            valorFormatado = aplicarMascaraCNPJ(value);
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

        if (formData.senhaEmpresa !== formData.confSenhaEmpresa) {
            setErroValidacao('As senhas não coincidem!');
            return;
        }

        setCarregando(true);

        const payload = {
            ...formData,
            cnpjEmpresa: formData.cnpjEmpresa.replace(/\D/g, '') // Envia apenas números
        };

        try {
            const response = await fetch('http://localhost:8080/api/empresas/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            let data = {};
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            }

            if (!response.ok) {
                setErroValidacao(data.mensagem || 'Ocorreu um erro ao cadastrar a empresa.');
            } else {
                setSucessoMensagem('Empresa cadastrada com sucesso! Redirecionando para o login...');
                
                setTimeout(() => {
                    navigate('/loginEmpresa');
                }, 2000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErroValidacao('Falha ao conectar com o servidor. Verifique se o Spring Boot está online.');
        } finally {
            setCarregando(false);
        }
    };

    const mensagemErroExibicao = erroValidacao || erroProp;

    return (
        <main className="pagina-cadastro-empresa">
            <div className="cartao-cadastro-wrapper">

                {/* Painel Institucional Corporativo */}
                <div className="painel-institucional-empresa">
                    <div className="conteudo-institucional">
                        <div className="marca-badge">
                            <Sun className="icone-sol" size={22} />
                            <span>SolarisPower Partner</span>
                        </div>
                        <h2>Expanda seus negócios com energia solar.</h2>
                        <p>
                            Cadastre sua empresa parceira para ofertar soluções, gerenciar projetos de instalação e conectar-se a milhares de clientes na nossa rede.
                        </p>

                        <div className="beneficios-lista">
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Gestão simplificada de propostas
                            </div>
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Visibilidade para novos clientes
                            </div>
                            <div className="item-beneficio">
                                <span className="check-icon">✓</span> Dashboard completo de acompanhamento
                            </div>
                        </div>
                    </div>

                    <div className="rodape-institucional">
                        <span>B2B & Soluções Fotovoltaicas</span>
                    </div>
                </div>

                {/* Formulário de Cadastro de Empresa */}
                <div className="painel-formulario">
                    <div className="cabecalho-form">
                        <span className="tag-modulo-empresa">ÁREA CORPORATIVA</span>
                        <h2>CADASTRO DE EMPRESA</h2>
                        <p>Preencha os dados da sua empresa para criar a conta de parceiro</p>
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

                        {/* Nome da Empresa */}
                        <div className="grupo-input">
                            <label htmlFor="nm_empresa">Nome da Empresa</label>
                            <div className="input-com-icone">
                                <Building2 className="icone-campo" size={18} />
                                <input
                                    type="text"
                                    name="nmEmpresa"
                                    id="nm_empresa"
                                    placeholder="Razão Social ou Nome Fantasia"
                                    maxLength={30}
                                    value={formData.nmEmpresa}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Grid Duplo: CNPJ e Segmento */}
                        <div className="grid-duplo">
                            <div className="grupo-input">
                                <label htmlFor="cnpj_empresa">CNPJ</label>
                                <div className="input-com-icone">
                                    <FileBadge className="icone-campo" size={18} />
                                    <input
                                        type="text"
                                        name="cnpjEmpresa"
                                        id="cnpj_empresa"
                                        placeholder="00.000.000/0000-00"
                                        maxLength={18}
                                        value={formData.cnpjEmpresa}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grupo-input">
                                <label htmlFor="segmento_empresa">Segmento</label>
                                <div className="input-com-icone">
                                    <Briefcase className="icone-campo" size={18} />
                                    <input
                                        type="text"
                                        name="segmentoEmpresa"
                                        id="segmento_empresa"
                                        placeholder="Ex: Instaladora, Distribuidora"
                                        maxLength={30}
                                        value={formData.segmentoEmpresa}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* E-mail da Empresa */}
                        <div className="grupo-input">
                            <label htmlFor="email_empresa">E-mail Corporativo</label>
                            <div className="input-com-icone">
                                <Mail className="icone-campo" size={18} />
                                <input
                                    type="email"
                                    name="emailEmpresa"
                                    id="email_empresa"
                                    placeholder="contato@empresa.com.br"
                                    maxLength={50}
                                    value={formData.emailEmpresa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Grid Duplo: Senha e Confirmação */}
                        <div className="grid-duplo">
                            <div className="grupo-input">
                                <label htmlFor="senha_empresa">Senha</label>
                                <div className="input-com-icone">
                                    <Lock className="icone-campo" size={18} />
                                    <input
                                        type={mostrarSenha ? 'text' : 'password'}
                                        name="senhaEmpresa"
                                        id="senha_empresa"
                                        placeholder="Sua senha"
                                        maxLength={20}
                                        value={formData.senhaEmpresa}
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
                                <label htmlFor="conf_senha_empresa">Confirmar Senha</label>
                                <div className="input-com-icone">
                                    <Lock className="icone-campo" size={18} />
                                    <input
                                        type={mostrarConfSenha ? 'text' : 'password'}
                                        name="confSenhaEmpresa"
                                        id="conf_senha_empresa"
                                        placeholder="Repita a senha"
                                        maxLength={20}
                                        value={formData.confSenhaEmpresa}
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

                        {/* Botão Cadastrar Empresa */}
                        <button type="submit" className="btn-cadastrar-empresa" disabled={carregando}>
                            {carregando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>PROCESSANDO...</span>
                                </>
                            ) : (
                                <>
                                    <span>CADASTRAR EMPRESA</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Links Auxiliares */}
                        <div className="links-navegacao">
                            <p className="texto-login">
                                Sua empresa já possui conta?{' '}
                                <Link to="/loginEmpresa" className="link-destaque">
                                    Entrar!
                                </Link>
                            </p>

                            <div className="divisor-links">
                                <span>Área do Cliente</span>
                            </div>

                            <div className="acoes-empresa">
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

export default CadastroEmpresa;