import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    ShoppingBag,
    ShieldCheck,
    Truck,
    Tag,
    ArrowRight,
    Zap,
    CreditCard,
    CheckCircle2,
    Loader2,
} from 'lucide-react';

import { useCart } from '../../components/Context/CartContext';
import './carrinho.css';

function Carrinho() {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const [cupomInput, setCupomInput] = useState('');
    const [descontoAplicado, setDescontoAplicado] = useState(0);
    const [cupomStatus, setCupomStatus] = useState(null);
    const [cepInput, setCepInput] = useState('');
    const [freteCalculado, setFreteCalculado] = useState(null);
    const [carregandoPagamento, setCarregandoPagamento] = useState(false);

    // Alterar Quantidade
    const handleUpdateQuantity = (id, delta) => {
        const item = cartItems.find((i) => i.id === id);
        if (item) {
            const novaQtd = item.quantidade + delta;
            if (novaQtd > 0) {
                updateQuantity(id, novaQtd);
            }
        }
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (cupomInput.trim().toUpperCase() === 'SOLAR10') {
            setDescontoAplicado(0.1);
            setCupomStatus('sucesso');
        } else {
            setCupomStatus('erro');
        }
    };

    const handleCalculateFreight = (e) => {
        e.preventDefault();
        if (cepInput.trim().length >= 8) {
            setFreteCalculado(20.0);
        }
    };

    // Cálculos de Totais
    const subtotal = (cartItems || []).reduce(
        (acc, item) => acc + (Number(item.preco) || 0) * item.quantidade,
        0
    );
    const valorDesconto = subtotal * descontoAplicado;
    const valorFrete = freteCalculado !== null ? freteCalculado : 0;
    const totalGeral = subtotal - valorDesconto + valorFrete;
    const totalItensContador = (cartItems || []).reduce(
        (acc, item) => acc + item.quantidade,
        0
    );


    // FUNÇÃO DE CHECKOUT MERCADO PAGO
    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) return;

        // 1. VERIFICAÇÃO DE AUTENTICAÇÃO / LOGIN
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        const empresaSalva = localStorage.getItem('empresaLogada');

        // Se nenhum usuário ou empresa estiver salvo, redireciona para /login com aviso
        if (!usuarioSalvo && !empresaSalva) {
            navigate('/login', {
                state: {
                    mensagem: 'Para finalizar a sua compra, faça login em uma conta de Cliente ou Empresa.'
                }
            });
            return;
        }

        setCarregandoPagamento(true);

        try {
            // Mapeia os itens do carrinho para garantir compatibilidade com o CartItemDTO do Spring Boot
            const itemsFormatados = cartItems.map((item) => ({
                id: item.id,
                nome: item.nome || item.title || "Produto Solar",
                quantidade: Number(item.quantidade) || 1,
                preco: Number(item.preco || item.price) || 0,
            }));

            const response = await fetch("http://localhost:8080/api/pagamento/criar-preferencia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: itemsFormatados,
                    frete: valorFrete,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro do Servidor:", errorText);
                alert(`Erro ao iniciar pagamento: ${errorText}`);
                return;
            }

            const data = await response.json();

            if (data.initPoint) {
                window.location.href = data.initPoint;
            } else {
                console.error("initPoint não retornado pela API");
            }
        } catch (error) {
            console.error("Erro na comunicação com o backend:", error);
            alert("Não foi possível conectar ao servidor de pagamento.");
        } finally {
            setCarregandoPagamento(false);
        }
    };




    return (
        <div className="cart-page-container">
            <div className="cart-wrapper">
                <header className="cart-header">
                    <button
                        className="btn-back-catalog"
                        onClick={() => navigate('/produtos')}
                    >
                        <ArrowLeft size={18} />
                        <span>Continuar Comprando</span>
                    </button>

                    <div className="cart-title-group">
                        <div className="cart-title-badge">
                            <ShoppingBag size={18} />
                            <h1>Meu Carrinho</h1>
                        </div>
                        <span className="items-count-tag">
                            {totalItensContador}{' '}
                            {totalItensContador === 1 ? 'item' : 'itens'}
                        </span>
                    </div>
                </header>

                {cartItems && cartItems.length > 0 ? (
                    <div className="cart-content-grid">
                        <main className="cart-items-section">
                            <div className="cart-table-header hide-mobile">
                                <span>Produto</span>
                                <span>Quantidade</span>
                                <span>Preço Unitário</span>
                                <span>Total</span>
                            </div>

                            <div className="cart-items-list">
                                {cartItems.map((item) => {
                                    const itemPreco = Number(item.preco) || 0;
                                    const itemTotal = itemPreco * item.quantidade;
                                    const imagemProduto =
                                        item.imagemUrl ||
                                        item.imagemBase64 ||
                                        'https://via.placeholder.com/150';

                                    return (
                                        <div key={item.id} className="cart-item-card">
                                            <div className="item-main-info">
                                                <div className="item-image-wrapper">
                                                    <img src={imagemProduto} alt={item.nome} />
                                                </div>
                                                <div className="item-details">
                                                    <span className="item-category-tag">
                                                        {item.categoria || 'Equipamento'}
                                                    </span>
                                                    <h3 className="item-title">{item.nome}</h3>
                                                    <span className="item-stock-status">
                                                        <Zap size={12} strokeWidth={3} /> Pronta entrega
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="item-quantity-column">
                                                <span className="mobile-label">Qtd:</span>
                                                <div className="quantity-control-box">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, -1)}
                                                        className="btn-qty-action"
                                                        disabled={item.quantidade <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="qty-value">{item.quantidade}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateQuantity(item.id, 1)}
                                                        className="btn-qty-action"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="item-price-unit-column hide-mobile">
                                                <span className="unit-price">
                                                    R${' '}
                                                    {itemPreco.toLocaleString('pt-BR', {
                                                        minimumFractionDigits: 2,
                                                    })}
                                                </span>
                                            </div>

                                            <div className="item-total-column">
                                                <div className="item-price-total">
                                                    <span className="mobile-label">Total:</span>
                                                    <span className="total-amount">
                                                        R${' '}
                                                        {itemTotal.toLocaleString('pt-BR', {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="btn-delete-item"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    title="Remover produto"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="cart-options-grid">
                                <div className="cart-option-card">
                                    <div className="option-title">
                                        <Truck size={18} />
                                        <h4>Simular Frete e Prazos</h4>
                                    </div>
                                    <form
                                        onSubmit={handleCalculateFreight}
                                        className="option-form-row"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Digite seu CEP"
                                            maxLength={9}
                                            value={cepInput}
                                            onChange={(e) => setCepInput(e.target.value)}
                                            className="cart-input"
                                        />
                                        <button type="submit" className="btn-option-apply">
                                            Calcular
                                        </button>
                                    </form>
                                    {freteCalculado !== null && (
                                        <div className="freight-result">
                                            <span>Entrega Padrão Solar (3 a 5 dias úteis)</span>
                                            <strong>
                                                R$ {freteCalculado.toFixed(2).replace('.', ',')}
                                            </strong>
                                        </div>
                                    )}
                                </div>

                                <div className="cart-option-card">
                                    <div className="option-title">
                                        <Tag size={18} />
                                        <h4>Cupom de Desconto</h4>
                                    </div>
                                    <form
                                        onSubmit={handleApplyCoupon}
                                        className="option-form-row"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Ex: SOLAR10"
                                            value={cupomInput}
                                            onChange={(e) => setCupomInput(e.target.value)}
                                            className="cart-input uppercase"
                                        />
                                        <button type="submit" className="btn-option-apply">
                                            Aplicar
                                        </button>
                                    </form>
                                    {cupomStatus === 'sucesso' && (
                                        <span className="coupon-feedback success">
                                            <CheckCircle2 size={14} /> Cupom de 10% aplicado com
                                            sucesso!
                                        </span>
                                    )}
                                    {cupomStatus === 'erro' && (
                                        <span className="coupon-feedback error">
                                            Cupom inválido ou expirado. Tente "SOLAR10".
                                        </span>
                                    )}
                                </div>
                            </div>
                        </main>

                        <aside className="cart-summary-aside">
                            <div className="summary-card">
                                <h3 className="summary-title">Resumo do Pedido</h3>

                                <div className="summary-rows-group">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <strong>
                                            R${' '}
                                            {subtotal.toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                            })}
                                        </strong>
                                    </div>

                                    {descontoAplicado > 0 && (
                                        <div className="summary-row discount">
                                            <span>Desconto (10%)</span>
                                            <strong>
                                                - R${' '}
                                                {valorDesconto.toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </strong>
                                        </div>
                                    )}

                                    <div className="summary-row">
                                        <span>Frete</span>
                                        {freteCalculado === null ? (
                                            <span className="pending-text">A calcular</span>
                                        ) : (
                                            <strong>
                                                R${' '}
                                                {valorFrete.toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </strong>
                                        )}
                                    </div>

                                    <div className="summary-divider"></div>

                                    <div className="summary-row total-highlight">
                                        <span>Valor Total</span>
                                        <div className="total-price-box">
                                            <span className="total-currency">R$</span>
                                            <span className="total-amount-main">
                                                {totalGeral.toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="pix-discount-notice">
                                        <Zap size={14} /> Economize até 5% pagando no{' '}
                                        <strong>Pix</strong>
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn-checkout-primary"
                                    onClick={handleCheckout}
                                    disabled={carregandoPagamento}
                                >
                                    {carregandoPagamento ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Finalizar Compra</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                <div className="security-badges-container">
                                    <div className="security-item">
                                        <ShieldCheck size={18} />
                                        <span>Compra 100% Segura e Criptografada</span>
                                    </div>
                                    <div className="security-item">
                                        <CreditCard size={18} />
                                        <span>Parcele em até 12x no Cartão</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="empty-cart-card">
                        <div className="empty-cart-icon-wrapper">
                            <ShoppingBag size={56} />
                        </div>
                        <h2>Seu carrinho está vazio</h2>
                        <p>
                            Parece que você ainda não adicionou nenhum equipamento solar ao
                            seu carrinho.
                        </p>
                        <button
                            className="btn-return-shop"
                            onClick={() => navigate('/produtos')}
                        >
                            <ArrowLeft size={18} />
                            <span>Explorar Produtos</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Carrinho;