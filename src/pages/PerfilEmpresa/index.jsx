import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Building2,
    Briefcase,
    Lock,
    Mail,
    MapPin,
    Navigation,
    Hash,
    FileText,
    Search,
    Save,
    LogOut,
    CheckCircle2,
    Building,
    Package,
    FileSpreadsheet,
    AlertCircle,
    Loader2
} from 'lucide-react';

import './perfilEmpresa.css';

function PerfilEmpresa() {
    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [loadingCep, setLoadingCep] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [formData, setFormData] = useState({
        cdEmpresa: '',
        nmEmpresa: '',
        cnpjEmpresa: '',
        senhaEmpresa: '',
        segmentoEmpresa: '',
        emailEmpresa: '',
        cepEmpresa: '',
        ruaEmpresa: '',
        numeroRuaEmpresa: '',
        complementoEmpresa: ''
    });

    // Função para formatar CNPJ
    const formatarCNPJ = (val) => {
        if (!val) return '';
        let clean = val.toString().replace(/\D/g, '');
        if (clean.length <= 14) {
            clean = clean.replace(/^(\d{2})(\d)/, '$1.$2');
            clean = clean.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            clean = clean.replace(/\.(\d{3})(\d)/, '.$1/$2');
            clean = clean.replace(/(\d{4})(\d)/, '$1-$2');
        }
        return clean;
    };

    // Função para formatar CEP
    const formatarCEP = (val) => {
        if (!val) return '';
        let clean = val.toString().replace(/\D/g, '');
        if (clean.length > 5) {
            clean = `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
        }
        return clean;
    };

    // Carrega dados da empresa autenticada do localStorage
    useEffect(() => {
        const empresaStorage = localStorage.getItem('empresaLogada');

        if (!empresaStorage) {
            navigate('/loginEmpresa');
            return;
        }

        try {
            const empresa = JSON.parse(empresaStorage);
            setFormData({
                cdEmpresa: empresa.cdEmpresa || '',
                nmEmpresa: empresa.nmEmpresa || '',
                cnpjEmpresa: formatarCNPJ(empresa.cnpjEmpresa),
                senhaEmpresa: '', // Deixa em branco por segurança
                segmentoEmpresa: empresa.segmentoEmpresa || '',
                emailEmpresa: empresa.emailEmpresa || '',
                cepEmpresa: formatarCEP(empresa.cepEmpresa),
                ruaEmpresa: empresa.ruaEmpresa || '',
                numeroRuaEmpresa: empresa.numeroRuaEmpresa || '',
                complementoEmpresa: empresa.complementoEmpresa || ''
            });
        } catch (e) {
            console.error('Erro ao ler empresa do localStorage:', e);
            navigate('/loginEmpresa');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 14) {
            setFormData((prev) => ({ ...prev, cnpjEmpresa: formatarCNPJ(value) }));
        }
    };

    const handleCepChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            setFormData((prev) => ({ ...prev, cepEmpresa: formatarCEP(value) }));
        }
    };

    const buscarCep = async () => {
        const cleanCep = formData.cepEmpresa.replace(/\D/g, '');
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
                    ruaEmpresa: data.logradouro || '',
                    complementoEmpresa: data.complemento || prev.complementoEmpresa
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

    // Ação de Logout
    const handleLogout = () => {
        localStorage.removeItem('empresaLogada');
        navigate('/loginEmpresa');
    };

    // Ação de Atualização dos Dados (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');
        setSalvando(true);

        const payload = {
            ...formData,
            cnpjEmpresa: formData.cnpjEmpresa.replace(/\D/g, ''),
            cepEmpresa: formData.cepEmpresa.replace(/\D/g, ''),
            numeroRuaEmpresa: parseInt(formData.numeroRuaEmpresa, 10) || 0
        };

        try {
            const response = await fetch(`http://localhost:8080/api/empresas/${formData.cdEmpresa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.mensagem || 'Erro ao atualizar dados da empresa.');
            } else {
                // Atualiza os dados no localStorage para refletir as mudanças no frontend
                localStorage.setItem('empresaLogada', JSON.stringify(data));
                setMensagem('Dados da empresa atualizados com sucesso!');
                setTimeout(() => setMensagem(''), 4000);
            }
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            setErro('Falha de conexão com o servidor. Tente novamente mais tarde.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="company-page-container">
            <div className="company-wrapper">

                {/* Banner Superior Header */}
                <div className="company-top-bar">
                    <div className="header-info">
                        <div className="header-avatar-badge">
                            <Building2 size={24} />
                        </div>
                        <div className="header-text">
                            <h1>Painel da Empresa</h1>
                            <p>Gerencie as informações corporativas e localização comercial</p>
                        </div>
                    </div>

                    <div className="header-actions">
                        <Link to="/cadastrarProdutos" className="btn-products">
                            <Package size={16} />
                            <span>Meus Produtos</span>
                        </Link>

                        <button type="button" onClick={handleLogout} className="btn-logout">
                            <LogOut size={16} />
                            <span className="hide-mobile">Sair</span>
                        </button>
                    </div>
                </div>

                {/* Alerta de Sucesso */}
                {mensagem && (
                    <div className="status-alert">
                        <CheckCircle2 size={18} />
                        <span>{mensagem}</span>
                    </div>
                )}

                {/* Alerta de Erro */}
                {erro && (
                    <div className="status-alert error">
                        <AlertCircle size={18} />
                        <span>{erro}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
                    <input type="hidden" name="cdEmpresa" value={formData.cdEmpresa} />

                    {/* Grid Principal com Duas Colunas */}
                    <div className="company-main-grid">

                        {/* CARD 1: DADOS DA EMPRESA */}
                        <div className="form-card">
                            <div className="card-title-group">
                                <div className="card-icon">
                                    <Building size={20} />
                                </div>
                                <h2>Dados Corporativos</h2>
                            </div>

                            <div className="field-grid">
                                <div className="form-group">
                                    <label className="form-label">Nome da Empresa / Razão Social</label>
                                    <div className="input-container">
                                        <Building2 className="field-icon" />
                                        <input
                                            type="text"
                                            name="nmEmpresa"
                                            value={formData.nmEmpresa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Ex: Tech Solutions LTDA"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="form-group">
                                        <label className="form-label">CNPJ</label>
                                        <div className="input-container">
                                            <FileSpreadsheet className="field-icon" />
                                            <input
                                                type="text"
                                                name="cnpjEmpresa"
                                                value={formData.cnpjEmpresa}
                                                onChange={handleCnpjChange}
                                                className="form-input"
                                                placeholder="00.000.000/0001-00"
                                                maxLength={18}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Segmento</label>
                                        <div className="input-container">
                                            <Briefcase className="field-icon" />
                                            <input
                                                type="text"
                                                name="segmentoEmpresa"
                                                value={formData.segmentoEmpresa}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Ex: Tecnologia, Varejo..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">E-mail Corporativo</label>
                                    <div className="input-container">
                                        <Mail className="field-icon" />
                                        <input
                                            type="email"
                                            name="emailEmpresa"
                                            value={formData.emailEmpresa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="contato@suaempresa.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Nova Senha (deixe em branco para não alterar)</label>
                                    <div className="input-container">
                                        <Lock className="field-icon" />
                                        <input
                                            type="password"
                                            name="senhaEmpresa"
                                            value={formData.senhaEmpresa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: ENDEREÇO DA EMPRESA */}
                        <div className="form-card">
                            <div className="card-title-group">
                                <div className="card-icon amber">
                                    <MapPin size={20} />
                                </div>
                                <h2>Sede Comercial</h2>
                            </div>

                            <div className="field-grid">
                                <div className="form-group">
                                    <label className="form-label">CEP Comercial</label>
                                    <div className="input-container">
                                        <Navigation className="field-icon" />
                                        <input
                                            type="text"
                                            name="cepEmpresa"
                                            value={formData.cepEmpresa}
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
                                            name="ruaEmpresa"
                                            value={formData.ruaEmpresa}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Avenida Principal, Rua..."
                                        />
                                    </div>
                                </div>

                                <div className="field-row">
                                    <div className="form-group">
                                        <label className="form-label">Número</label>
                                        <div className="input-container">
                                            <Hash className="field-icon" />
                                            <input
                                                type="number"
                                                name="numeroRuaEmpresa"
                                                value={formData.numeroRuaEmpresa}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="1000"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Complemento</label>
                                        <div className="input-container">
                                            <FileText className="field-icon" />
                                            <input
                                                type="text"
                                                name="complementoEmpresa"
                                                value={formData.complementoEmpresa}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Sala 402, Bloco B"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Footer Bar / Botão de Ação */}
                    <div className="form-footer-bar">
                        <span className="footer-hint">Todas as alterações de dados comerciais serão aplicadas na hora.</span>
                        <button type="submit" className="btn-save-submit" disabled={salvando}>
                            {salvando ? (
                                <>
                                    <Loader2 className="icone-spin" size={18} />
                                    <span>Salvando...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Salvar Dados da Empresa</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default PerfilEmpresa;