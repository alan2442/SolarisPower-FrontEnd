import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    PlusCircle,
    Package,
    Tag,
    FileText,
    DollarSign,
    Layers,
    Search,
    Edit3,
    Trash2,
    Upload,
    X,
    CheckCircle2,
    AlertCircle,
    Building2,
    Loader2
} from 'lucide-react';

import './cadastroProduto.css';

function CadastroProduto() {
    const navigate = useNavigate();

    const [empresaLogada, setEmpresaLogada] = useState(null);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [busca, setBusca] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [produtos, setProdutos] = useState([]);

    const [formData, setFormData] = useState({
        idProdutoEdicao: '',
        nome: '',
        categoria: 'painel',
        descricao: '',
        preco: '',
        quantidade: '',
        imagem: null
    });

    const categoriasMap = {
        painel: 'Painel Solar',
        kitoffgrid: 'Kit Off-Grid',
        kitongrid: 'Kit On-Grid',
        inversor: 'Inversor',
        bateria: 'Bateria Solar',
        controlador: 'Controlador de Carga',
        acessorios: 'Acessórios'
    };

    // Verifica autenticação e carrega os produtos da empresa logada
    useEffect(() => {
        const empresaStorage = localStorage.getItem('empresaLogada');

        if (!empresaStorage) {
            navigate('/loginEmpresa');
            return;
        }

        try {
            const empresaParsed = JSON.parse(empresaStorage);
            setEmpresaLogada(empresaParsed);
            carregarProdutos(empresaParsed.cdEmpresa);
        } catch (error) {
            console.error('Erro ao ler empresa do storage:', error);
            navigate('/loginEmpresa');
        }
    }, [navigate]);

    // Função para buscar produtos do backend
    const carregarProdutos = async (cdEmpresa) => {
        setCarregando(true);
        try {
            const response = await fetch(`http://localhost:8080/api/produtos/empresa/${cdEmpresa}`);
            if (response.ok) {
                const data = await response.json();
                setProdutos(data);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            exibirMensagem('erro', 'Falha ao carregar lista de produtos.');
        } finally {
            setCarregando(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler para Upload de Arquivo
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, imagem: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const exibirMensagem = (tipo, texto) => {
        setMensagem({ tipo, texto });
        setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
    };

    // Submissão do Formulário (Cadastrar / Atualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!empresaLogada) {
            exibirMensagem('erro', 'Sessão expirada. Faça login novamente.');
            return;
        }

        setSalvando(true);

        const dtoData = {
            nome: formData.nome,
            descricao: formData.descricao,
            quantidade: parseInt(formData.quantidade, 10),
            preco: parseFloat(formData.preco),
            categoria: formData.categoria,
            cdEmpresa: empresaLogada.cdEmpresa
        };

        const multiPartForm = new FormData();
        multiPartForm.append('dados', new Blob([JSON.stringify(dtoData)], { type: 'application/json' }));

        if (formData.imagem) {
            multiPartForm.append('imagem', formData.imagem);
        }

        const url = isEditing
            ? `http://localhost:8080/api/produtos/${formData.idProdutoEdicao}`
            : 'http://localhost:8080/api/produtos';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: multiPartForm
            });

            const responseData = await response.json();

            if (!response.ok) {
                exibirMensagem('erro', responseData.mensagem || 'Ocorreu um erro ao salvar o produto.');
            } else {
                exibirMensagem('sucesso', isEditing ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
                limparFormulario();
                carregarProdutos(empresaLogada.cdEmpresa);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            exibirMensagem('erro', 'Não foi possível conectar ao servidor.');
        } finally {
            setSalvando(false);
        }
    };

    // Carregar produto para Edição
    const carregarProdutoParaEdicao = (produto) => {
        setIsEditing(true);
        setFormData({
            idProdutoEdicao: produto.id,
            nome: produto.nome,
            categoria: produto.categoria || 'painel',
            descricao: produto.descricao || '',
            preco: produto.preco,
            quantidade: produto.quantidade,
            imagem: null
        });
        setImagePreview(produto.imagemBase64 || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Excluir Produto
    const excluirProduto = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    exibirMensagem('sucesso', 'Produto removido com sucesso!');
                    carregarProdutos(empresaLogada.cdEmpresa);
                } else {
                    const data = await response.json();
                    exibirMensagem('erro', data.mensagem || 'Falha ao excluir o produto.');
                }
            } catch (error) {
                console.error('Erro ao excluir:', error);
                exibirMensagem('erro', 'Erro ao se comunicar com o servidor.');
            }
        }
    };

    // Limpar formulário
    const limparFormulario = () => {
        setIsEditing(false);
        setImagePreview(null);
        setFormData({
            idProdutoEdicao: '',
            nome: '',
            categoria: 'painel',
            descricao: '',
            preco: '',
            quantidade: '',
            imagem: null
        });
    };

    // Filtragem da busca
    const produtosFiltrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (p.categoria && categoriasMap[p.categoria]?.toLowerCase().includes(busca.toLowerCase()))
    );

    return (
        <div className="product-page-container">
            <div className="product-wrapper">

                {/* Top Bar Header */}
                <div className="product-top-bar">
                    <div className="header-info">
                        <div className="header-avatar-badge">
                            <Package size={24} />
                        </div>
                        <div className="header-text">
                            <h1>Gestão de Produtos</h1>
                            <p>Cadastre, atualize e controle seu catálogo de estoque</p>
                        </div>
                    </div>

                    <Link to="/perfilEmpresa" className="btn-back-profile">
                        <Building2 size={16} />
                        <span>Perfil da Empresa</span>
                    </Link>
                </div>

                {/* Mensagens de Retorno */}
                {mensagem.texto && (
                    <div className={`status-alert ${mensagem.tipo === 'erro' ? 'error' : 'success'}`}>
                        {mensagem.tipo === 'erro' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        <span>{mensagem.texto}</span>
                    </div>
                )}

                {/* Formulário de Cadastro / Edição */}
                <div className="form-card">
                    <div className="card-title-group">
                        <div className={`card-icon ${isEditing ? 'amber' : ''}`}>
                            {isEditing ? <Edit3 size={20} /> : <PlusCircle size={20} />}
                        </div>
                        <h2>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="product-form">
                        <input type="hidden" value={formData.idProdutoEdicao} />

                        <div className="form-grid">

                            {/* Nome e Categoria */}
                            <div className="form-group col-span-2">
                                <label className="form-label">Nome do Produto</label>
                                <div className="input-container">
                                    <Package className="field-icon" />
                                    <input
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Ex: Painel Solar Fotovoltaico 550W"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Categoria</label>
                                <div className="input-container">
                                    <Tag className="field-icon" />
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className="form-input select-input"
                                    >
                                        <option value="painel">PAINEL SOLAR</option>
                                        <option value="kitoffgrid">KIT OFF GRID</option>
                                        <option value="kitongrid">KIT ON GRID</option>
                                        <option value="inversor">INVERSOR</option>
                                        <option value="bateria">BATERIA SOLAR</option>
                                        <option value="controlador">CONTROLADOR DE CARGA</option>
                                        <option value="acessorios">ACESSÓRIOS</option>
                                    </select>
                                </div>
                            </div>

                            {/* Preço e Estoque */}
                            <div className="form-group">
                                <label className="form-label">Preço (R$)</label>
                                <div className="input-container">
                                    <DollarSign className="field-icon" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="preco"
                                        value={formData.preco}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Quantidade em Estoque</label>
                                <div className="input-container">
                                    <Layers className="field-icon" />
                                    <input
                                        type="number"
                                        name="quantidade"
                                        value={formData.quantidade}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="form-group col-span-full">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label className="form-label">Descrição</label>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {formData.descricao ? formData.descricao.length : 0}/500 caracteres
                                    </span>
                                </div>
                                <div className="input-container textarea-container">
                                    <FileText className="field-icon textarea-icon" />
                                    <textarea
                                        name="descricao"
                                        value={formData.descricao || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        maxLength={500}
                                        className="form-input textarea-input"
                                        placeholder="Especifique características técnicas, garantia, etc. (Máximo 500 caracteres)"
                                    />
                                </div>
                            </div>

                            {/* Upload de Imagem */}
                            <div className="form-group col-span-full">
                                <label className="form-label">Imagem do Produto</label>
                                <div className="image-upload-wrapper">
                                    <label htmlFor="imagem-input" className="upload-dropzone">
                                        <Upload size={24} className="upload-icon" />
                                        <div className="upload-text">
                                            <span className="bold-text">Clique para enviar</span> ou arraste a imagem
                                            <p className="sub-text">PNG, JPG ou WEBP (Max: 5MB)</p>
                                        </div>
                                        <input
                                            id="imagem-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden-file-input"
                                        />
                                    </label>

                                    {imagePreview && (
                                        <div className="image-preview-card">
                                            <img src={imagePreview} alt="Preview" />
                                            <button
                                                type="button"
                                                className="btn-remove-preview"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setFormData((prev) => ({ ...prev, imagem: null }));
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Ações do Formulário */}
                        <div className="form-actions-bar">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={limparFormulario}
                                    className="btn-secondary"
                                >
                                    Cancelar Edição
                                </button>
                            )}
                            <button type="submit" className="btn-primary" disabled={salvando}>
                                {salvando ? (
                                    <>
                                        <Loader2 className="icone-spin" size={18} />
                                        <span>Salvando...</span>
                                    </>
                                ) : (
                                    <>
                                        {isEditing ? <Edit3 size={18} /> : <PlusCircle size={18} />}
                                        <span>{isEditing ? 'Atualizar Produto' : 'Salvar Produto'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista de Produtos Cadastrados */}
                <div className="list-card">
                    <div className="list-header">
                        <div>
                            <h2>Produtos Cadastrados</h2>
                            <p className="list-subtitle">Total: {produtosFiltrados.length} item(ns)</p>
                        </div>

                        {/* Barra de Busca */}
                        <div className="search-wrapper">
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder="Buscar por nome ou categoria..."
                                className="search-input"
                            />
                            {busca && (
                                <button className="clear-search" onClick={() => setBusca('')}>
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabela Responsiva */}
                    {carregando ? (
                        <div className="empty-state">
                            <Loader2 className="icone-spin" size={32} />
                            <p>Carregando catálogo de produtos...</p>
                        </div>
                    ) : produtosFiltrados.length > 0 ? (
                        <div className="table-responsive">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Estoque</th>
                                        <th className="text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtosFiltrados.map((prod) => (
                                        <tr key={prod.id}>
                                            <td>
                                                <div className="table-thumb">
                                                    <img
                                                        src={prod.imagemBase64 || 'https://via.placeholder.com/150'}
                                                        alt={prod.nome}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product-title-cell">
                                                    <span className="prod-name">{prod.nome}</span>
                                                    <span className="prod-desc">{prod.descricao || 'Sem descrição'}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`category-badge ${prod.categoria}`}>
                                                    {categoriasMap[prod.categoria] || prod.categoria}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="prod-price">
                                                    R$ {Number(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`stock-badge ${prod.quantidade < 5 ? 'low-stock' : ''}`}>
                                                    {prod.quantidade} un.
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <div className="actions-cell">
                                                    <button
                                                        onClick={() => carregarProdutoParaEdicao(prod)}
                                                        className="btn-action edit"
                                                        title="Editar Produto"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => excluirProduto(prod.id)}
                                                        className="btn-action delete"
                                                        title="Excluir Produto"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <Package size={48} className="empty-icon" />
                            <h3>Nenhum produto encontrado</h3>
                            <p>Sua empresa ainda não cadastrou produtos com esses critérios.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default CadastroProduto;