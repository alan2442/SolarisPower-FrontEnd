import React, { useState } from 'react';
import './suporte.css';


function Suporte() {


    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    });

    const [statusEnvio, setStatusEnvio] = useState(null); // 'sucesso' | 'enviando' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusEnvio('enviando');

        try {
            const response = await fetch('http://localhost:8080/api/suporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatusEnvio('sucesso');
                setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
            } else {
                setStatusEnvio('erro');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            setStatusEnvio('erro');
        } finally {
            // Reseta a mensagem de status após 5 segundos
            setTimeout(() => setStatusEnvio(null), 5000);
        }
    };



    return (


        <div className="pagina-suporte">
            {/* Banner Principal */}
            <section className="banner-suporte">
                <div className="conteiner-banner-suporte">
                    <h1>Central de <span className="destaque-texto">Atendimento & Suporte</span></h1>
                    <p>Estamos prontos para atuar na solução de suas dúvidas, projetos ou suporte pós-instalação SolarisPower.</p>
                </div>
            </section>

            {/* Seção de Conteúdo */}
            <section className="conteudo-suporte">
                <div className="conteiner-suporte">

                    {/* Lado Esquerdo: Canais Diretos de Contato */}
                    <div className="coluna-contato-direto">
                        <div className="cartao-info-contato">
                            <h2>Fale Conosco</h2>
                            <p className="descricao-canais">
                                Escolha o canal de sua preferência para um atendimento rápido e direto com nossos especialistas.
                            </p>

                            <div className="lista-canais">
                                {/* Atendimento via WhatsApp / Telefone */}
                                <a
                                    href="https://wa.me/5511980806332?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20SolarisPower%20e%20gostaria%20de%20atendimento."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="item-canal whatsapp"
                                >
                                    <div className="icone-canal">
                                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                    </div>
                                    <div className="texto-canal">
                                        <span className="rotulo-canal">Atendimento via WhatsApp</span>
                                        <strong className="valor-canal">(11) 98080-6332</strong>
                                        <span className="subtexto-canal">Clique para iniciar uma conversa imediata</span>
                                    </div>
                                </a>

                                {/* Atendimento via E-mail */}
                                <a
                                    href="mailto:solarispower@hotmail.com?subject=Suporte%20SolarisPower"
                                    className="item-canal email"
                                >
                                    <div className="icone-canal">
                                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </div>
                                    <div className="texto-canal">
                                        <span className="rotulo-canal">E-mail de Suporte</span>
                                        <strong className="valor-canal">solarispower@hotmail.com</strong>
                                        <span className="subtexto-canal">Resposta garantida em até 24h úteis</span>
                                    </div>
                                </a>
                            </div>

                            {/* Quadro de Horários */}
                            <div className="bloco-horarios">
                                <h4>Horário de Funcionamento</h4>
                                <p><strong>Segunda a Sexta:</strong> 08:00 às 18:00</p>
                                <p><strong>Sábados:</strong> 09:00 às 13:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Formulário Moderno */}
                    <div className="coluna-formulario">
                        <div className="cartao-formulario">
                            <h2>Envie uma Mensagem</h2>
                            <p>Preencha os campos abaixo com os detalhes da sua dúvida ou solicitação técnica.</p>

                            {statusEnvio === 'sucesso' && (
                                <div className="mensagem-alerta sucesso">
                                    ✓ Mensagem enviada com sucesso! Nossa equipe retornará em breve.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="formulario-suporte">
                                <div className="campo-duplo">
                                    <div className="grupo-input">
                                        <label htmlFor="nome">Seu Nome *</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            placeholder="Ex: Roberto Silva"
                                            required
                                            value={formData.nome}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grupo-input">
                                        <label htmlFor="telefone">Telefone / WhatsApp</label>
                                        <input
                                            type="tel"
                                            id="telefone"
                                            name="telefone"
                                            placeholder="(11) 99999-9999"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grupo-input">
                                    <label htmlFor="email">E-mail de Contato *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="seu.email@exemplo.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grupo-input">
                                    <label htmlFor="assunto">Assunto da Mensagem *</label>
                                    <input
                                        type="text"
                                        id="assunto"
                                        name="assunto"
                                        placeholder="Ex: Dúvida sobre Homologação ou Orçamento"
                                        required
                                        value={formData.assunto}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grupo-input">
                                    <label htmlFor="mensagem">Descrição do Problema / Dúvida *</label>
                                    <textarea
                                        id="mensagem"
                                        name="mensagem"
                                        rows="5"
                                        placeholder="Descreva detalhadamente como podemos te ajudar..."
                                        required
                                        value={formData.mensagem}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="botao-enviar-suporte"
                                    disabled={statusEnvio === 'enviando'}
                                >
                                    {statusEnvio === 'enviando' ? 'Enviando Mensagem...' : 'Enviar Solicitação'}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>


    );
}

export default Suporte;