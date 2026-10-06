import React, { useState } from 'react';
import {
    MapPin,
    Wallet,
    Zap,
    Mail,
    ArrowRight,
    RotateCcw
} from 'lucide-react';

import { CONCESSIONARIAS, MAPA_UF_CONCESSIONARIA } from './constants';

import './calculadoraSolar.css';


function CalculadoraSolar() {

    const [cep, setCep] = useState('');
    const [gasto, setGasto] = useState('');
    const [concessionaria, setConcessionaria] = useState('');
    const [email, setEmail] = useState('');

    const [exibirResultado, setExibirResultado] = useState(false);
    const [resultados, setResultados] = useState({
        gastoAtual: 'R$ 0,00',
        economiaMensal: 'R$ 0,00',
        economiaAnual: 'R$ 0,00',
    });

    const formatarMoeda = (valor) => {
        return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };

    const handleCepChange = async (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 5) {
            value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
        }

        setCep(value);

        const cleanCep = value.replace(/\D/g, '');
        if (cleanCep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();
                if (!data.erro && MAPA_UF_CONCESSIONARIA[data.uf]) {
                    setConcessionaria(MAPA_UF_CONCESSIONARIA[data.uf]);
                }
            } catch (err) {
                console.error('Erro ao buscar CEP:', err);
            }
        }
    };

    const handleGastoChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (!value) {
            setGasto('');
            return;
        }
        const numericValue = (parseFloat(value) / 100).toFixed(2);
        const formatted = numericValue
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        setGasto(`R$ ${formatted}`);
    };

    const handleSimular = (e) => {
        e.preventDefault();

        if (!cep || cep.length < 9) {
            alert('Por favor, informe um CEP válido.');
            return;
        }
        if (!gasto || gasto === 'R$ 0,00') {
            alert('Por favor, informe o seu gasto mensal com energia.');
            return;
        }
        if (!concessionaria) {
            alert('Por favor, selecione sua concessionária.');
            return;
        }
        if (!email || !email.includes('@')) {
            alert('Por favor, informe um e-mail válido.');
            return;
        }

        const valorNumerico = parseFloat(
            gasto.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
        );

        const economiaMensalCalc = valorNumerico * 0.70;
        const economiaAnualCalc = economiaMensalCalc * 12;

        setResultados({
            gastoAtual: gasto,
            economiaMensal: formatarMoeda(economiaMensalCalc),
            economiaAnual: formatarMoeda(economiaAnualCalc),
        });

        setExibirResultado(true);
    };

    const handleReset = () => {
        setExibirResultado(false);
        setEmail('');
    };


    return (


        <div className="solar-calc-container">
            {/* Luzes de Fundo */}
            <div className="bg-glow-amber" />
            <div className="bg-glow-orange" />

            {/* Conteúdo Principal Isolado */}
            <div className="calc-card">
                {!exibirResultado ? (
                    <form onSubmit={handleSimular} className="solar-form">
                        <div className="form-header">
                            <h1 className="gradient-title-amber">Simulador Solar</h1>
                            <p className="subtitle">Descubra em segundos quanto você pode economizar na sua conta de luz</p>
                        </div>

                        <div className="form-grid">
                            {/* CEP */}
                            <div className="form-group">
                                <label className="form-label">Seu CEP</label>
                                <div className="input-wrapper">
                                    <MapPin className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="00000-000"
                                        maxLength={9}
                                        value={cep}
                                        onChange={handleCepChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Gasto Mensal */}
                            <div className="form-group">
                                <label className="form-label">Gasto Mensal (R$)</label>
                                <div className="input-wrapper">
                                    <Wallet className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="R$ 0,00"
                                        value={gasto}
                                        onChange={handleGastoChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Concessionária */}
                            <div className="form-group col-span-2">
                                <label className="form-label">Concessionária</label>
                                <div className="input-wrapper">
                                    <Zap className="input-icon" />
                                    <select
                                        value={concessionaria}
                                        onChange={(e) => setConcessionaria(e.target.value)}
                                        className="form-input form-select"
                                    >
                                        <option value="">Selecione sua distribuidora</option>
                                        {CONCESSIONARIAS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="form-group col-span-2">
                                <label className="form-label">Seu Melhor E-mail</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="nome@exemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Botão de Calcular */}
                            <button type="submit" className="btn-primary col-span-2">
                                <span>Calcular Economia</span>
                                <ArrowRight size={18} />
                            </button>

                            <p className="terms-text col-span-2">
                                Ao simular, você aceita nossos Termos e Condições de Uso.
                            </p>
                        </div>
                    </form>
                ) : (
                    <div className="result-container">
                        <div className="form-header">
                            <h1 className="gradient-title-green">Resultado da Simulação</h1>
                            <p className="subtitle">Estimativa de economia com base na sua tarifa atual</p>
                        </div>

                        <div className="result-grid">
                            <div className="result-box">
                                <span className="result-box-title">Gasto Atual</span>
                                <strong className="result-box-value">{resultados.gastoAtual}</strong>
                            </div>

                            <div className="result-box">
                                <span className="result-box-title">Economia Mensal</span>
                                <strong className="result-box-value emerald">{resultados.economiaMensal}</strong>
                            </div>
                        </div>

                        <div className="highlight-banner">
                            <span className="highlight-title">Economia Estimada em 1 Ano</span>
                            <h2 className="highlight-value">{resultados.economiaAnual}</h2>
                        </div>

                        <button type="button" onClick={handleReset} className="btn-secondary">
                            <RotateCcw size={16} />
                            <span>Fazer Nova Simulação</span>
                        </button>
                    </div>
                )}
            </div>
        </div>


    );
}

export default CalculadoraSolar;