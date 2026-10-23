import React from "react";
import "./PoliticaDePrivacidade.css";

function PoliticaDePrivacidade() {

    return (
        <div className="pagina-politica">
            {/* Hero Header */}
            <header className="politica-hero">
                <div className="politica-hero-conteudo">
                    <span className="badge-tag">Segurança & Transparência</span>
                    <h1>Política de <span>Privacidade</span></h1>
                    <p className="politica-hero-data">
                        <strong>Solaris Power</strong> • Última atualização: 22 de outubro de 2026
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal + Sidebar */}
            <div className="politica-container">

                {/* Sidebar Sticky (Visível em Desktop) */}
                <aside className="politica-sidebar">
                    <h3>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        Índice
                    </h3>
                    <nav>
                        <ul>
                            <li><a href="#secao-1">1. Informações Coletadas</a></li>
                            <li><a href="#secao-2">2. Finalidade do Tratamento</a></li>
                            <li><a href="#secao-3">3. Compartilhamento</a></li>
                            <li><a href="#secao-4">4. Armazenamento e Segurança</a></li>
                            <li><a href="#secao-5">5. Direitos do Titular (LGPD)</a></li>
                            <li><a href="#secao-6">6. Alterações</a></li>
                            <li><a href="#secao-7">7. Contato</a></li>
                        </ul>
                    </nav>
                </aside>

                {/* Artigos e Seções */}
                <main className="politica-conteudo">

                    {/* Card de Apresentação */}
                    <div className="politica-card-intro">
                        <p>
                            A <strong>Solaris Power</strong> valoriza a sua privacidade e se compromete com a transparência e a segurança dos seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos, compartilhamos e protegemos as suas informações ao utilizar a nossa plataforma de e-commerce (aplicativo Android e site web) dedicada a soluções de energia limpa.
                        </p>
                    </div>

                    {/* Seção 1 */}
                    <section id="secao-1" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h2>1. Informações que coletamos</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            Para viabilizar a criação da sua conta e a entrega dos nossos produtos e serviços, coletamos os seguintes dados:
                        </p>
                        <ul className="lista-estilizada">
                            <li><strong>Dados Cadastrais:</strong> Nome completo, CPF, e-mail, telefone de contato e endereço completo de entrega/faturamento.</li>
                            <li><strong>Dados de Autenticação:</strong> Senha de acesso.</li>
                            <li><strong>Dados de Pagamento:</strong> Informações do cartão de crédito, chave PIX ou dados bancários (processados de forma segura por intermediadores de pagamento parceiros).</li>
                            <li><strong>Dados de Navegação e Dispositivo:</strong> Endereço IP, tipo de dispositivo (mobile/web), sistema operacional, logs de acesso e preferências de navegação.</li>
                        </ul>
                    </section>

                    {/* Seção 2 */}
                    <section id="secao-2" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                            </div>
                            <h2>2. Finalidade do Tratamento dos Dados</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            Utilizamos os seus dados pessoais exclusivamente para finalidades legítimas e específicas, incluindo:
                        </p>
                        <ol className="lista-numerada">
                            <li>
                                <strong>Processamento e Intermediação de Pedidos:</strong> Transmitir os dados estritamente necessários para as empresas parceiras e vendedores cadastrados na plataforma, permitindo que realizem o processamento do pedido, a emissão da Nota Fiscal e o envio/entrega dos equipamentos solares e acessórios.
                            </li>
                            <li>
                                <strong>Atendimento ao Cliente:</strong> Responder a dúvidas, prestar suporte técnico e gerenciar solicitações de troca ou garantia.
                            </li>
                            <li>
                                <strong>Comunicação do Pedido:</strong> Enviar atualizações sobre o status do pedido, confirmação de pagamento e códigos de rastreamento.
                            </li>
                            <li>
                                <strong>Melhoria da Plataforma:</strong> Analisar o desempenho do aplicativo/site para aprimorar a experiência do usuário.
                            </li>
                            <li>
                                <strong>Cumprimento Legal:</strong> Atender a obrigações fiscais, regulatórias e judiciais.
                            </li>
                        </ol>
                    </section>

                    {/* Seção 3 */}
                    <section id="secao-3" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </div>
                            <h2>3. Compartilhamento de Dados</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            A Solaris Power <strong>não vende nem aluga</strong> seus dados pessoais a terceiros. Compartilhamos suas informações de forma segura e restrita apenas com:
                        </p>
                        <ul className="lista-estilizada">
                            <li><strong>Empresas e Vendedores Cadastrados (Parceiros):</strong> Para que possam emitir a Nota Fiscal, separar, embalar e entregar os produtos adquiridos por você.</li>
                            <li><strong>Gateways e Meios de Pagamento:</strong> Para processar e validar as transações financeiras com segurança.</li>
                            <li><strong>Transportadoras e Logística:</strong> Quando o envio for intermediado diretamente pela plataforma ou pelos vendedores parceiros.</li>
                            <li><strong>Autoridades Governamentais:</strong> Quando exigido por lei ou ordem judicial.</li>
                        </ul>
                    </section>

                    {/* Seção 4 */}
                    <section id="secao-4" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h2>4. Armazenamento e Segurança dos Dados</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            Adotamos medidas técnicas e administrativas aptas a proteger seus dados contra acessos não autorizados, perdas ou alterações:
                        </p>
                        <ul className="lista-estilizada" style={{ marginBottom: '1.25rem' }}>
                            <li>Utilização de protocolo seguro (criptografia SSL/TLS) para tráfego de dados.</li>
                            <li>Senhas armazenadas de forma hash (criptografadas).</li>
                            <li>Controle estrito de acesso aos bancos de dados da aplicação.</li>
                        </ul>
                        <p style={{ color: '#718096', fontSize: '0.92rem' }}>
                            Os dados serão mantidos apenas pelo período necessário para cumprir as finalidades descritas nesta política ou conforme exigido pela legislação aplicável.
                        </p>
                    </section>

                    {/* Seção 5 */}
                    <section id="secao-5" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h2>5. Direitos do Titular dos Dados (LGPD)</h2>
                        </div>
                        <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                            Conforme a LGPD (Art. 18), você tem o direito de, a qualquer momento e mediante requisição:
                        </p>
                        <ul className="lista-estilizada">
                            <li>Confirmar a existência do tratamento de seus dados.</li>
                            <li>Acessar os seus dados cadastrais armazenados.</li>
                            <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                            <li>Solicitar a exclusão ou anonimização de seus dados, salvo quando o armazenamento for necessário por obrigação legal.</li>
                            <li>Revogar o consentimento prestado anteriormente.</li>
                        </ul>

                        {/* Banner Destaque DPO */}
                        <div className="card-dpo">
                            <div className="card-dpo-info">
                                <h3>Encarregado de Dados (DPO)</h3>
                                <p>Para exercer qualquer um dos seus direitos da LGPD, fale diretamente conosco.</p>
                            </div>
                            <a href="mailto:privacidade@solarispower.com.br" className="btn-dpo-email">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                privacidade@solarispower.com.br
                            </a>
                        </div>
                    </section>

                    {/* Seção 6 */}
                    <section id="secao-6" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.5 2v6h-6"></path>
                                    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                                </svg>
                            </div>
                            <h2>6. Alterações nesta Política</h2>
                        </div>
                        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                            Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente para refletir melhorias no sistema ou mudanças regulatórias. Recomendamos a leitura constante deste documento.
                        </p>
                    </section>

                    {/* Seção 7 */}
                    <section id="secao-7" className="politica-secao">
                        <div className="secao-header">
                            <div className="icone-secao">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <h2>7. Contato</h2>
                        </div>
                        <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: '1.6' }}>
                            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco:
                        </p>
                        <p style={{ color: 'var(--cor-fundo-escuro)', fontWeight: '700', fontSize: '1.05rem' }}>
                            E-mail de Suporte: <a href="mailto:privacidade@solarispower.com.br" style={{ color: 'var(--cor-azul-destaque)', textDecoration: 'none' }}>privacidade@solarispower.com.br</a>
                        </p>
                    </section>

                </main>
            </div>
        </div>
    )
}

export default PoliticaDePrivacidade;