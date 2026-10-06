import React from 'react';
import './sobreNos.css';


function SobreNos() {

    const valores = [
        {
            titulo: 'Sustentabilidade em Primeiro Lugar',
            descricao: 'Promovemos soluções limpas que preservam os recursos naturais e reduzem os impactos ambientais.'
        },
        {
            titulo: 'Inovação e Qualidade Técnica',
            descricao: 'Trabalhamos exclusivamente com tecnologia de ponta e equipamentos homologados de alta performance.'
        },
        {
            titulo: 'Transparência e Ética',
            descricao: 'Construímos relacionamentos de confiança com informações claras sobre economia e retorno do investimento.'
        },
        {
            titulo: 'Compromisso com o Cliente',
            descricao: 'Oferecemos suporte técnico contínuo e personalizado antes, durante e após a instalação do sistema.'
        }
    ];

    const diferenciais = [
        { numero: '100%', legenda: 'Equipamentos Homologados' },
        { numero: '25 anos', legenda: 'Garantia de Eficiência Painéis' },
        { numero: '24/7', legenda: 'Suporte e Monitoramento' }
    ];



    return (


        <div className="pagina-sobre">
            {/* Banner de Cabeçalho */}
            <section className="banner-sobre">
                <div className="conteiner-banner-sobre">
                    <h1>Energia Solar Inteligente para um <span className="destaque-texto">Futuro Sustentável</span></h1>
                    <p>Conheça a história e o compromisso da SolarisPower em transformar luz solar em economia e sustentabilidade.</p>
                </div>
            </section>

            {/* História / Quem Somos */}
            <section className="secao-quem-somos">
                <div className="conteiner-sobre">
                    <div className="texto-quem-somos">
                        <h2>Quem Somos</h2>
                        <p>
                            A <strong>SolarisPower</strong> nasceu com o propósito de democratizar o acesso à energia limpa e renovável. Somos uma empresa especializada na distribuição e fornecimento de produtos fotovoltaicos de altíssima eficiência.
                        </p>
                        <p>
                            Combinando conhecimento técnico avançado e parceria com os maiores fabricantes globais, entregamos soluções completas para residências, comércios e indústrias que buscam reduzir custos operacionais e adotar práticas sustentáveis.
                        </p>
                    </div>

                    {/* Números em Destaque */}
                    <div className="grade-diferenciais">
                        {diferenciais.map((item, index) => (
                            <div key={index} className="cartao-diferencial">
                                <span className="numero-diferencial">{item.numero}</span>
                                <span className="legenda-diferencial">{item.legenda}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção Missão, Visão e Valores */}
            <section className="secao-pilares">
                <div className="conteiner-sobre">
                    <div className="grade-missao-visao">

                        {/* Cartão Missão */}
                        <div className="cartao-pilar pilar-destaque">
                            <div className="icone-pilar">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                            <h3>Nossa Missão</h3>
                            <p>
                                Acelerar a transição energética fornecendo soluções e produtos fotovoltaicos de excelência, garantindo eficiência energética, redução de custos e impacto ambiental positivo para nossos clientes.
                            </p>
                        </div>

                        {/* Cartão Visão */}
                        <div className="cartao-pilar pilar-destaque">
                            <div className="icone-pilar">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                </svg>
                            </div>
                            <h3>Nossa Visão</h3>
                            <p>
                                Ser referência nacional na distribuição e suporte técnico de tecnologias solares, reconhecida pela confiabilidade dos produtos, inovação contínua e padrão elevado de atendimento.
                            </p>
                        </div>

                    </div>

                    {/* Nossos Valores */}
                    <div className="bloco-valores">
                        <h2 className="titulo-valores">Nossos Valores</h2>
                        <div className="grade-valores">
                            {valores.map((val, idx) => (
                                <div key={idx} className="cartao-valor">
                                    <div className="marcador-valor"></div>
                                    <h4>{val.titulo}</h4>
                                    <p>{val.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>


    );
}

export default SobreNos;