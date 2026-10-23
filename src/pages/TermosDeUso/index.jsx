

import "./TermosDeUso.css";


function TermosDeUso() {
    return (
        <div className="pagina-termos">
            {/* Hero Header */}
            <header className="termos-hero">
                <div className="termos-hero-conteudo">
                    <span className="badge-tag-termos">Termos & Diretrizes</span>
                    <h1>Termos e Condições de <span>Uso</span></h1>
                    <p className="termos-hero-data">
                        <strong>Solaris Power</strong> • Última atualização: 22 de outubro de 2026
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal + Sidebar */}
            <div className="termos-container">

                {/* Sidebar Sticky (Visível em Desktop) */}
                <aside className="termos-sidebar">
                    <h3>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        Navegação
                    </h3>
                    <nav>
                        <ul>
                            <li><a href="#termos-1">1. Definições</a></li>
                            <li><a href="#termos-2">2. Cadastro e Conta</a></li>
                            <li><a href="#termos-3">3. Compras e Entregas</a></li>
                            <li><a href="#termos-4">4. Trocas e Garantia</a></li>
                            <li><a href="#termos-5">5. Propriedade Intelectual</a></li>
                            <li><a href="#termos-6">6. Privacidade (LGPD)</a></li>
                            <li><a href="#termos-7">7. Modificações</a></li>
                            <li><a href="#termos-8">8. Contato e Suporte</a></li>
                        </ul>
                    </nav>
                </aside>

                {/* Conteúdo das Seções */}
                <main className="termos-conteudo">

                    {/* Intro Card */}
                    <div className="termos-card-intro">
                        <p>
                            Bem-vindo à <strong>Solaris Power</strong>! Estes Termos de Uso ("Termos") regem o acesso e a utilização da nossa plataforma de comércio eletrônico (aplicativo Android e site web), dedicada à oferta de produtos e serviços de energia limpa e sustentável.
                        </p>
                        <p style={{ marginTop: '0.8rem' }}>
                            Ao se cadastrar, acessar ou realizar compras na Solaris Power, você concorda expressamente com estes Termos. Caso não concorde com alguma das condições, recomendamos que não utilize a nossa plataforma.
                        </p>
                    </div>

                    {/* Seção 1 */}
                    <section id="termos-1" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                            </div>
                            <h2>1. Definições</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            Para facilitar a compreensão destes Termos, consideram-se:
                        </p>
                        <ul className="lista-estilizada">
                            <li><strong>Plataforma:</strong> Refere-se conjuntamente ao aplicativo mobile e ao site da Solaris Power.</li>
                            <li><strong>Usuário / Cliente:</strong> Qualquer pessoa física ou jurídica que realize cadastro e navegue ou efetue compras na plataforma.</li>
                            <li><strong>Produtos e Serviços:</strong> Equipamentos de energia solar, acessórios fotovoltaicos, serviços de consultoria ou instalação disponibilizados através do e-commerce.</li>
                        </ul>
                    </section>

                    {/* Seção 2 */}
                    <section id="termos-2" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                            </div>
                            <h2>2. Cadastro e Conta do Usuário</h2>
                        </div>
                        <ul className="lista-estilizada">
                            <li><strong>Elegibilidade:</strong> Para se cadastrar na Solaris Power, o usuário deve ser maior de 18 anos (ou emancipado) e possuir capacidade civil plena, fornecendo informações verdadeiras, completas e atualizadas.</li>
                            <li><strong>Segurança da Senha:</strong> O usuário é o único responsável por manter a confidencialidade de sua senha e dados de acesso. Qualquer atividade realizada através de sua conta será de sua total responsabilidade.</li>
                            <li><strong>Atualização de Dados:</strong> O usuário compromete-se a manter seus dados cadastrais sempre atualizados para garantir o correto faturamento e entrega dos produtos.</li>
                        </ul>
                    </section>

                    {/* Seção 3 */}
                    <section id="termos-3" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <h2>3. Compras, Pagamentos e Entregas</h2>
                        </div>
                        <ul className="lista-estilizada">
                            <li><strong>Disponibilidade de Estoque:</strong> As ofertas e a disponibilidade dos produtos estão sujeitas ao estoque. Em caso de indisponibilidade após a compra, a Solaris Power notificará o cliente e providenciará o estorno ou a troca por item equivalente.</li>
                            <li><strong>Preços e Formas de Pagamento:</strong> Os preços exibidos na plataforma estão em Reais (BRL) e podem sofrer alterações sem aviso prévio. As formas de pagamento aceitas serão informadas no momento do fechamento do pedido (como PIX, cartões de crédito e boleto bancário).</li>
                            <li><strong>Prazos de Entrega:</strong> Os prazos estimados para entrega variam de acordo com a região e a modalidade de frete escolhida. A contagem do prazo inicia-se após a confirmação do pagamento pela instituição financeira.</li>
                        </ul>
                    </section>

                    {/* Seção 4 */}
                    <section id="termos-4" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 4 23 10 17 10"></polyline>
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                </svg>
                            </div>
                            <h2>4. Política de Trocas, Devoluções e Garantia</h2>
                        </div>
                        <ul className="lista-estilizada">
                            <li><strong>Direito de Arrependimento:</strong> Conforme o Código de Defesa do Consumidor, o cliente poderá desistir da compra no prazo de até 7 (sete) dias corridos a contar do recebimento do produto, desde que o item esteja em sua embalagem original, sem indícios de uso e acompanhado da nota fiscal.</li>
                            <li><strong>Garantia dos Equipamentos:</strong> Os produtos comercializados (inversores, módulos solares, etc.) possuem garantia legal e contratual oferecida pelos fabricantes, cujos termos específicos acompanham os manuais dos itens.</li>
                        </ul>
                    </section>

                    {/* Seção 5 */}
                    <section id="termos-5" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                            </div>
                            <h2>5. Propriedade Intelectual</h2>
                        </div>
                        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                            Todo o conteúdo disponível na plataforma Solaris Power — incluindo textos, imagens, logotipos, códigos-fonte, design, interfaces e marcas — é de propriedade exclusiva da plataforma ou de seus idealizadores. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.
                        </p>
                    </section>

                    {/* Seção 6 */}
                    <section id="termos-6" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h2>6. Privacidade e Proteção de Dados (LGPD)</h2>
                        </div>
                        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                            A Solaris Power preza pela segurança e privacidade dos dados de seus usuários. Todas as informações coletadas durante o cadastro e a navegação são tratadas em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018), conforme detalhado em nossa Política de Privacidade.
                        </p>
                    </section>

                    {/* Seção 7 */}
                    <section id="termos-7" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </div>
                            <h2>7. Modificações dos Termos</h2>
                        </div>
                        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                            A Solaris Power reserva-se a alterar estes Termos de Uso a qualquer momento, visando a melhoria contínua da plataforma ou adaptação a novas exigências legais. As alterações entrarão em vigor imediatamente após a sua publicação na plataforma. O uso continuado após tais modificações implica na concordância com os novos termos.
                        </p>
                    </section>

                    {/* Seção 8 */}
                    <section id="termos-8" className="termos-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <h2>8. Contato e Suporte</h2>
                        </div>
                        <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: '1.6' }}>
                            Em caso de dúvidas, sugestões ou problemas relacionados a estes Termos de Uso, entre em contato conosco através do nosso e-mail de suporte ou pelo atendimento disponível no aplicativo.
                        </p>

                        {/* Banner de Contato */}
                        <div className="card-suporte">
                            <div className="card-suporte-info">
                                <h3>Atendimento ao Cliente</h3>
                                <p>Precisa de suporte ou tem dúvidas sobre os termos?</p>
                            </div>
                            <a href="mailto:contato@solarispower.com.br" className="btn-contato-email">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                contato@solarispower.com.br
                            </a>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default TermosDeUso;