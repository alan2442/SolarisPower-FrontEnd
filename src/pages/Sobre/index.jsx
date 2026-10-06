import React, { useState } from 'react';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Leaf, 
  Award, 
  Building2, 
  Home, 
  Tractor, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  Cpu,
  Flame,
  Droplets,
  Box,
  BatteryCharging
} from 'lucide-react';

import './sobre.css';


function Sobre () {

    const [secaoAtiva, setSecaoAtiva] = useState('fotovoltaica');
    const [faqAberto, setFaqAberto] = useState(null);

    const faqItems = [
        {
            pergunta: "O que acontece em dias chuvosos ou nublados?",
            resposta: "Os painéis solares continuam gerando energia em dias nublados ou chuvosos através da radiação difusa, embora com eficiência reduzida (entre 10% e 25% da capacidade máxima)."
        },
        {
            pergunta: "Quanto tempo dura um sistema fotovoltaico?",
            resposta: "A vida útil média dos módulos solares é de 25 a 30 anos com garantia de eficiência de no mínimo 80%. Os inversores costumam durar entre 10 e 15 anos."
        },
        {
            pergunta: "A energia solar valoriza o meu imóvel?",
            resposta: "Sim! Estudos do setor imobiliário indicam uma valorização média de 3% a 6% em imóveis que possuem sistema solar fotovoltaico instalado."
        }
    ];

    const toggleFaq = (index) => {
        setFaqAberto(faqAberto === index ? null : index);
    };



    return(



        <main className="pagina-energia-solar">
            
            {/* Hero Section */}
            <section className="hero-solar">
                <div className="container-solar hero-grid">
                    <div className="hero-conteudo">
                        <div className="badge-tag">
                            <Sun className="icone-sol" size={18} />
                            <span>ENERGIA LIMPA & INESGOTÁVEL</span>
                        </div>
                        <h1>Transforme a Luz do Sol em Autonomia e Economia</h1>
                        <p>
                            A energia solar fotovoltaica é a solução mais eficiente para reduzir custos com eletricidade, valorizar seu patrimônio e contribuir diretamente com a sustentabilidade do planeta.
                        </p>
                        <div className="hero-acoes">
                            <a href="/produtos" className="btn-primario-solar">
                                <span>Ver Nossas Soluções</span>
                                <ArrowRight size={18} />
                            </a>
                            <a href="/calculadoraSolar" className="btn-secundario-solar">
                                Calcular Economia
                            </a>
                        </div>
                    </div>
                    <div className="hero-imagem-wrapper">
                        <img 
                            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000" 
                            alt="Painéis solares fotovoltaicos" 
                            className="hero-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/600x400/0d2240/ffffff?text=Energia+Solar+Fotovoltaica";
                            }}
                        />
                        <div className="card-flutuante-info">
                            <div className="icone-destaque">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <strong>Até 95%</strong>
                                <span>de redução na conta de luz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Métrica / Números em Destaque */}
            <section className="secao-metricas">
                <div className="container-solar grid-metricas">
                    <div className="card-metrica">
                        <Zap className="metrica-icone" size={28} />
                        <h3>25+ Anos</h3>
                        <p>De vida útil com alta performance</p>
                    </div>
                    <div className="card-metrica">
                        <Leaf className="metrica-icone" size={28} />
                        <h3>100% Limpa</h3>
                        <p>Zero emissão de CO₂ durante a geração</p>
                    </div>
                    <div className="card-metrica">
                        <ShieldCheck className="metrica-icone" size={28} />
                        <h3>Retorno Rápido</h3>
                        <p>Payback médio de 3 a 5 anos</p>
                    </div>
                    <div className="card-metrica">
                        <Award className="metrica-icone" size={28} />
                        <h3>Garantia Total</h3>
                        <p>Módulos de altíssima durabilidade</p>
                    </div>
                </div>
            </section>

            {/* Como Funciona - Interativo */}
            <section className="secao-funcionamento">
                <div className="container-solar">
                    <div className="cabecalho-secao text-center">
                        <h2>Como Funciona a Energia Solar?</h2>
                        <p>Entenda a diferença entre as duas principais tecnologias do mercado</p>
                    </div>

                    <div className="seletor-tecnologia">
                        <button 
                            className={`btn-aba ${secaoAtiva === 'fotovoltaica' ? 'ativa' : ''}`}
                            onClick={() => setSecaoAtiva('fotovoltaica')}
                        >
                            <Zap size={18} />
                            <span>Fotovoltaica (Eletricidade)</span>
                        </button>
                        <button 
                            className={`btn-aba ${secaoAtiva === 'termica' ? 'ativa' : ''}`}
                            onClick={() => setSecaoAtiva('termica')}
                        >
                            <Sun size={18} />
                            <span>Térmica (Aquecimento)</span>
                        </button>
                    </div>

                    <div className="painel-tecnologia">
                        {secaoAtiva === 'fotovoltaica' ? (
                            <div className="conteudo-tecnologia fade-in">
                                <div className="texto-tecnologia">
                                    <h3>Energia Solar Fotovoltaica</h3>
                                    <p>
                                        Converte a <strong>luz do sol diretamente em energia elétrica</strong> através do efeito fotovoltaico produzido nas células de silício.
                                    </p>
                                    <ul className="lista-passos">
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Painéis:</strong> Captam a luz solar e geram corrente contínua (CC).</span>
                                        </li>
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Inversor Solar:</strong> Converte CC para corrente alternada (CA), pronta para uso.</span>
                                        </li>
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Quadro de Distribuição:</strong> Distribui a eletricidade para lâmpadas e eletrodomésticos.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Diagrama Visual Fotovoltaico (Substitui imagens instáveis) */}
                                <div className="bloco-diagrama-fotovoltaico">
                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone sol">
                                            <Sun size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>1. Painéis Solares</h4>
                                            <p>Captam a radiação solar e geram Corrente Contínua (CC)</p>
                                        </div>
                                    </div>

                                    <div className="linha-conector"></div>

                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone inversor">
                                            <Cpu size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>2. Inversor Solar</h4>
                                            <p>Converte CC em Corrente Alternada (CA) para uso comum</p>
                                        </div>
                                    </div>

                                    <div className="linha-conector"></div>

                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone quadro">
                                            <Zap size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>3. Quadro Elétrico</h4>
                                            <p>Alimenta os aparelhos da casa e envia o excesso para a rede</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="conteudo-tecnologia fade-in">
                                <div className="texto-tecnologia">
                                    <h3>Energia Solar Térmica</h3>
                                    <p>
                                        Utiliza o <strong>calor do sol</strong> para aquecer fluidos (geralmente água), reduzindo drasticamente o consumo de energia de chuveiros, piscinas e processos industriais.
                                    </p>
                                    <ul className="lista-passos">
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Coletor Solar:</strong> Absorve o calor do sol e o transfere para a água.</span>
                                        </li>
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Reservatório (Boiler):</strong> Armazena a água aquecida para uso em qualquer horário.</span>
                                        </li>
                                        <li>
                                            <CheckCircle2 size={18} className="icone-check" />
                                            <span><strong>Economia Térmica:</strong> Substitui resistências elétricas de alto consumo.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Diagrama Visual Térmico */}
                                <div className="bloco-diagrama-fotovoltaico">
                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone sol">
                                            <Sun size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>1. Coletor Térmico</h4>
                                            <p>Absorve o calor do sol e aquece a água nos tubos</p>
                                        </div>
                                    </div>

                                    <div className="linha-conector"></div>

                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone boiler">
                                            <Flame size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>2. Reservatório (Boiler)</h4>
                                            <p>Mantém a água aquecida e isolada termicamente</p>
                                        </div>
                                    </div>

                                    <div className="linha-conector"></div>

                                    <div className="card-diagrama-etapa">
                                        <div className="circulo-icone agua">
                                            <Droplets size={28} />
                                        </div>
                                        <div className="info-etapa">
                                            <h4>3. Consumo de Água</h4>
                                            <p>Distribui para chuveiros, torneiras e piscinas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Vantagens / Benefícios */}
            <section className="secao-vantagens">
                <div className="container-solar">
                    <div className="cabecalho-secao text-center">
                        <h2>Por que Investir em Energia Solar?</h2>
                        <p>Vantagens claras para o seu bolso e para o planeta</p>
                    </div>

                    <div className="grid-vantagens">
                        <div className="card-vantagem">
                            <div className="icone-box"><TrendingUp size={24} /></div>
                            <h3>Economia Garantida</h3>
                            <p>Reduza drasticamente sua conta de energia e proteja-se contra os aumentos frequentes da tarifa elétrica.</p>
                        </div>
                        <div className="card-vantagem">
                            <div className="icone-box"><Leaf size={24} /></div>
                            <h3>Sustentabilidade</h3>
                            <p>Ajude a preservar os recursos naturais utilizando uma fonte inesgotável e com impacto ambiental mínimo.</p>
                        </div>
                        <div className="card-vantagem">
                            <div className="icone-box"><Home size={24} /></div>
                            <h3>Valorização Imobiliária</h3>
                            <p>Casas e edifícios comercializados com sistemas de energia solar possuem maior liquidez e valor de mercado.</p>
                        </div>
                        <div className="card-vantagem">
                            <div className="icone-box"><ShieldCheck size={24} /></div>
                            <h3>Baixa Manutenção</h3>
                            <p>Os módulos requerem apenas limpezas periódicas simples para manter sua performance máxima por décadas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aplicações no Mundo Real */}
            <section className="secao-aplicacoes">
                <div className="container-solar">
                    <div className="cabecalho-secao text-center">
                        <h2>Aplicações para Todos os Setores</h2>
                        <p>Soluções dimensionadas exatamente para a sua necessidade</p>
                    </div>

                    <div className="grid-aplicacoes">
                        <div className="card-aplicacao">
                            <Home className="icone-app" size={36} />
                            <h3>Residencial</h3>
                            <p>Mais conforto para a sua família sem surpresas na conta de luz no final do mês.</p>
                        </div>
                        <div className="card-aplicacao">
                            <Building2 className="icone-app" size={36} />
                            <h3>Comercial & Indústria</h3>
                            <p>Aumente a margem de lucro reduzindo um dos maiores custos operacionais do seu negócio.</p>
                        </div>
                        <div className="card-aplicacao">
                            <Tractor className="icone-app" size={36} />
                            <h3>Agronegócio</h3>
                            <p>Autonomia energética para irrigação, bombeamento de água, armazenagem e pivôs centrais.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="secao-faq">
                <div className="container-solar max-w-med">
                    <div className="cabecalho-secao text-center">
                        <h2>Dúvidas Frequentes</h2>
                        <p>Respostas rápidas para as principais questões sobre energia solar</p>
                    </div>

                    <div className="lista-accordion">
                        {faqItems.map((item, index) => (
                            <div 
                                key={index} 
                                className={`item-accordion ${faqAberto === index ? 'aberto' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="pergunta-accordion">
                                    <h4>{item.pergunta}</h4>
                                    <ChevronDown className="seta-accordion" size={20} />
                                </div>
                                {faqAberto === index && (
                                    <div className="resposta-accordion">
                                        <p>{item.resposta}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner CTA Final */}
            <section className="secao-cta-final">
                <div className="container-solar text-center">
                    <h2>Pronto para dar o próximo passo rumo à sustentabilidade?</h2>
                    <p>Fale com nossa equipe técnica e descubra o potencial de geração da sua propriedade.</p>
                    <a href="/suporte" className="btn-cta-destaque">
                        Solicitar Orçamento Gratuito
                    </a>
                </div>
            </section>

        </main>



    );
}

export default Sobre;