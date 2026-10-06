import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    CreditCard,
    Lock,
    Calendar,
    Mail,
    MapPin,
    Navigation,
    Hash,
    FileText,
    Search,
    Save,
    LogOut,
    CheckCircle2,
    ShieldCheck,
    Compass,
    AlertCircle,
    Loader2
} from 'lucide-react';

import './perfil.css';

function Perfil() {
    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [loadingCep, setLoadingCep] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [formData, setFormData] = useState({
        cdPessoa: '',
        nmPessoa: '',
        cpfPessoa: '',
        senhaPessoa: '',
        dtNascimento: '',
        emailPessoa: '',
        cepPessoa: '',
        ruaPessoa: '',
        numeroRuaPessoa: '',
        complementoPessoa: ''
    });

    // Carrega os dados do usuário autenticado a partir do localStorage
    useEffect(() => {
        const usuarioStorage = localStorage.getItem('usuarioLogado');

        if (!usuarioStorage) {
            // Se não houver usuário logado no storage, redireciona para a página de login
            navigate('/login');
            return;
        }

        try {
            const usuario = JSON.parse(usuarioStorage);
            setFormData({
                cdPessoa: usuario.cdPessoa || '',
                nmPessoa: usuario.nmPessoa || '',
                cpfPessoa: usuario.cpfPessoa || '',
                senhaPessoa: '', // Senha mantida em branco por segurança
                dtNascimento: usuario.dtNascimento || '',
                emailPessoa: usuario.emailPessoa || '',
                cepPessoa: usuario.cepPessoa || '',
                ruaPessoa: usuario.ruaPessoa || '',
                numeroRuaPessoa: usuario.numeroRuaPessoa || '',
                complementoPessoa: usuario.complementoPessoa || ''
            });
        } catch (e) {
            console.error('Erro ao ler dados do localStorage:', e);
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            setFormData((prev) => ({ ...prev, cpfPessoa: value }));
        }
    };

    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/(\d{2})(\d)/, '$1/$2');
            value = value.replace(/(\d{2})(\d)/, '$1/$2');
            setFormData((prev) => ({ ...prev, dtNascimento: value }));
        }
    };

    const handleCepChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            if (value.length > 5) {
                value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
            }
            setFormData((prev) => ({ ...prev, cepPessoa: value }));
        }
    };

    const buscarCep = async () => {
        const cleanCep = formData.cepPessoa.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
            alert('Por favor, digite um CEP válido.');
            return;
        }

        setLoadingCep(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setFormData((prev) => ({
                    ...prev,
                    ruaPessoa: data.logradouro || '',
                    complementoPessoa: data.complemento || prev.complementoPessoa
                }));
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        } finally {
            setLoadingCep(false);
        }
    };

    // Ação para Deslogar
    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        navigate('/login');
    };

    // Ação para Salvar / Atualizar os dados no Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');
        setSalvando(true);

        const payload = {
            ...formData,
            cpfPessoa: formData.cpfPessoa.replace(/\D/g, ''),
            cepPessoa: formData.cepPessoa.replace(/\D/g, '')
        };

        try {
            const response = await fetch(`http://localhost:8080/api/pessoas/${formData.cdPessoa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.mensagem || 'Não foi possível atualizar o perfil.');
            } else {
                // Atualiza o objeto no localStorage para refletir as alterações no front
                localStorage.setItem('usuarioLogado', JSON.stringify(data));
                setMensagem('Perfil atualizado com sucesso!');
                setTimeout(() => setMensagem(''), 4000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErro('Falha ao conectar ao servidor. Tente novamente mais tarde.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="profile-page-container">
            <div className="profile-wrapper">

                {/* Banner Superior Header */}
                <div className="profile-top-bar">
                    <div className="header-info">
                        <div className="header-avatar-badge">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="header-text">
                            <h1>Perfil da Conta</h1>
                            <p>Gerencie seus dados e preferências de localização</p>
                        </div>
                    </div>

                    <button type="button" onClick={handleLogout} className="btn-logout">
                        <LogOut size={16} />
                        <span>Sair</span>
                    </button>
                </div>

                {/* Mensagens de Alerta */}
                {mensagem && (
                    <div className="status-alert">
                        <CheckCircle2 size={18} />
                        <span>{mensagem}</span>
                    </div>
                )}

                {erro && (
                    <div className="status-alert error">
                        <AlertCircle size={18} />
                        <span>{erro}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
                    {/* Grid Principal com Duas Colunas */}
                    <div className="profile-main-grid">

                        {/* CARD 1: DADOS PESSOAIS */}
                        <div className="form-card">
                            <div className="card-title-group">
                                <div className="card-icon">
                                    <User size={20} />
                                </div>
                                <h2>Dados Pessoais</h2>
                            </div>

                            <div className="field-grid">
                                <div className="form-group">
                                    <label className="form-label">Nome Completo</label>
                                    <div className="input-container">
                                        <User className="field-icon" />
                                        <input
                                            type="text"
                                            name="nmPessoa"
                                            value={formData.nmPessoa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Informe seu nome completo"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="form-group">
                                        <label className="form-label">CPF</label>
                                        <div className="input-container">
                                            <CreditCard className="field-icon" />
                                            <input
                                                type="text"
                                                name="cpfPessoa"
                                                value={formData.cpfPessoa}
                                                onChange={handleCpfChange}
                                                className="form-input"
                                                placeholder="000.000.000-00"
                                                maxLength={14}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Nascimento</label>
                                        <div className="input-container">
                                            <Calendar className="field-icon" />
                                            <input
                                                type="text"
                                                name="dtNascimento"
                                                value={formData.dtNascimento}
                                                onChange={handleDateChange}
                                                className="form-input"
                                                placeholder="DD/MM/AAAA"
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">E-mail</label>
                                    <div className="input-container">
                                        <Mail className="field-icon" />
                                        <input
                                            type="email"
                                            name="emailPessoa"
                                            value={formData.emailPessoa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="seu.email@exemplo.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Nova Senha (deixe em branco se não quiser alterar)</label>
                                    <div className="input-container">
                                        <Lock className="field-icon" />
                                        <input
                                            type="password"
                                            name="senhaPessoa"
                                            value={formData.senhaPessoa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: ENDEREÇO E LOCALIZAÇÃO */}
                        <div className="form-card">
                            <div className="card-title-group">
                                <div className="card-icon amber">
                                    <Compass size={20} />
                                </div>
                                <h2>Endereço de Entrega</h2>
                            </div>

                            <div className="field-grid">
                                <div className="form-group">
                                    <label className="form-label">CEP</label>
                                    <div className="input-container">
                                        <Navigation className="field-icon" />
                                        <input
                                            type="text"
                                            name="cepPessoa"
                                            value={formData.cepPessoa}
                                            onChange={handleCepChange}
                                            className="form-input"
                                            placeholder="00000-000"
                                            maxLength={9}
                                        />
                                        <button
                                            type="button"
                                            onClick={buscarCep}
                                            className="btn-search-cep"
                                            disabled={loadingCep}
                                        >
                                            <Search size={13} />
                                            <span>{loadingCep ? '...' : 'Buscar'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Rua / Logradouro</label>
                                    <div className="input-container">
                                        <MapPin className="field-icon" />
                                        <input
                                            type="text"
                                            name="ruaPessoa"
                                            value={formData.ruaPessoa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Nome da sua rua"
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="form-group">
                                        <label className="form-label">Número</label>
                                        <div className="input-container">
                                            <Hash className="field-icon" />
                                            <input
                                                type="text"
                                                name="numeroRuaPessoa"
                                                value={formData.numeroRuaPessoa}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Ex: 123"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Complemento</label>
                                        <div className="input-container">
                                            <FileText className="field-icon" />
                                            <input
                                                type="text"
                                                name="complementoPessoa"
                                                value={formData.complementoPessoa}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Apto, Bloco..."
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Footer Bar / Botão de Ação */}
                    <div className="form-footer-bar">
                        <span className="footer-hint">Verifique as informações antes de salvar.</span>
                        <button type="submit" className="btn-save-submit" disabled={salvando}>
                            {salvando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>Salvando...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Salvar Alterações</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default Perfil;