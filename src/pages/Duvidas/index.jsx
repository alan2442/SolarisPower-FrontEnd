import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './duvidas.css';


const listaPerguntas = [
    {
        id: 1,
        categoria: "tecnologia",
        pergunta: "Como a energia solar é transformada em energia elétrica através das placas?",
        resposta: "A radiação solar incide sobre os painéis fotovoltaicos fabricados com silício. Quando os fótons de luz atingem as células de silício, eles liberam elétrons, gerando uma corrente contínua (CC). Essa corrente é direcionada para um inversor solar, que a converte em corrente alternada (CA), o padrão utilizado na sua rede elétrica e eletrodomésticos."
    },
    {
        id: 2,
        categoria: "tecnologia",
        pergunta: "Durante chuvas ou com o céu nublado o sistema continua gerando energia?",
        resposta: "Sim! Os painéis fotovoltaicos necessitam da radiação solar e não do calor direto. Em dias nublados ou chuvosos, a geração continua ocorrendo, porém em uma taxa menor (aproximadamente entre 10% e 30% da capacidade total), pois as nuvens dispersam a luz mas não a bloqueiam por completo."
    },
    {
        id: 3,
        categoria: "instalacao",
        pergunta: "Qual a certificação que o técnico de instalação ou projetista deve possuir?",
        resposta: "Para a equipe de instalação técnica, são exigidas as certificações de Eletricista com NR 10 (Segurança em Instalações e Serviços em Eletricidade) e NR 35 (Trabalho em Altura). Para os projetistas responsáveis pela homologação junto à concessionária de energia, é obrigatório registro ativo no CREA (Engenharia) ou CFT/CRQ (Técnicos de nível médio e Tecnólogos)."
    },
    {
        id: 4,
        categoria: "cursos",
        pergunta: "A SolarisPower ministra cursos e treinamentos?",
        resposta: "Sim, a SolarisPower oferece certificações e treinamentos técnicos presenciais e EAD (incluindo diretrizes das NR 10, NR 23 e NR 35) sob supervisão direta de profissionais Habilitados e Engenheiros qualificados no setor fotovoltaico."
    },
    {
        id: 5,
        categoria: "financeiro",
        pergunta: "Qual é o tempo médio de retorno sobre o investimento (Payback)?",
        resposta: "O tempo médio de retorno varia entre 3 a 5 anos, dependendo da tarifa local de energia e do volume de consumo. Como os painéis possuem durabilidade média garantida de 25 anos, a economia gerada cobre o investimento inicial com uma margem expressiva de lucro a longo prazo."
    }
];


function Duvidas() {

    const [itemAberto, setItemAberto] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

    const alternarItem = (id) => {
        setItemAberto(itemAberto === id ? null : id);
    };

    const perguntasFiltradas = listaPerguntas.filter((item) => {
        const atendeCategoria = categoriaAtiva === 'todas' || item.categoria === categoriaAtiva;
        const atendeBusca = item.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) ||
            item.resposta.toLowerCase().includes(termoBusca.toLowerCase());
        return atendeCategoria && atendeBusca;
    });


    return (

        <div className="pagina-duvidas">
            {/* Banner de Apresentação */}
            <section className="banner-duvidas">
                <div className="conteiner-banner-duvidas">
                    <h1>Central de <span className="destaque-texto">Ajuda & FAQ</span></h1>
                    <p>Tire suas dúvidas sobre instalação, homologação, economia e tecnologias de energia solar.</p>

                    {/* Campo de Pesquisa Interativo */}
                    <div className="caixa-pesquisa-wrapper">
                        <input
                            type="text"
                            placeholder="Digite o que você procura (ex: chuva, certificação, NR 10)..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            className="campo-pesquisa-faq"
                        />
                    </div>
                </div>
            </section>

            {/* Conteúdo Principal do FAQ */}
            <section className="conteudo-duvidas">
                <div className="conteiner-duvidas">
                    {/* Filtros por Categoria */}
                    <div className="filtros-categoria">
                        <button
                            className={`botao-filtro ${categoriaAtiva === 'todas' ? 'ativo' : ''}`}
                            onClick={() => setCategoriaAtiva('todas')}
                        >
                            Todas
                        </button>
                        <button
                            className={`botao-filtro ${categoriaAtiva === 'tecnologia' ? 'ativo' : ''}`}
                            onClick={() => setCategoriaAtiva('tecnologia')}
                        >
                            Tecnologia & Geração
                        </button>
                        <button
                            className={`botao-filtro ${categoriaAtiva === 'instalacao' ? 'ativo' : ''}`}
                            onClick={() => setCategoriaAtiva('instalacao')}
                        >
                            Instalação & Projetos
                        </button>
                        <button
                            className={`botao-filtro ${categoriaAtiva === 'cursos' ? 'ativo' : ''}`}
                            onClick={() => setCategoriaAtiva('cursos')}
                        >
                            Cursos & CIPA
                        </button>
                    </div>

                    {/* Lista Accordion */}
                    <div className="lista-accordion">
                        {perguntasFiltradas.length > 0 ? (
                            perguntasFiltradas.map((item) => {
                                const estaAberto = itemAberto === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        className={`cartao-accordion ${estaAberto ? 'aberto' : ''}`}
                                    >
                                        <button
                                            className="cabecalho-accordion"
                                            onClick={() => alternarItem(item.id)}
                                            aria-expanded={estaAberto}
                                        >
                                            <span className="titulo-pergunta">{item.pergunta}</span>
                                            <span className="icone-indicador">{estaAberto ? '−' : '+'}</span>
                                        </button>
                                        {estaAberto && (
                                            <div className="corpo-accordion">
                                                <p>{item.resposta}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="sem-resultados">
                                <p>Nenhuma pergunta encontrada para sua busca.</p>
                            </div>
                        )}
                    </div>

                    {/* Chamada para Suporte Adicional */}
                    <div className="cartao-suporte-extra">
                        <h3>Ainda com dúvidas sobre o seu projeto?</h3>
                        <p>Nossa equipe técnica e de consultoria está disponível para te atender diretamente.</p>
                        <div className="acoes-suporte">
                            <Link to="/suporte" className="botao-contato-suporte">Falar com Consultor</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
}

export default Duvidas;