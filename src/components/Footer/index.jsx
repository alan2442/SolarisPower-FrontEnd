import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';


function Footer() {
    const anoAtual = new Date().getFullYear();
    return (


        <footer className="rodape">
            <div className="rodape-conteiner">
                <div className="rodape-conteudo">

                    {/* Seção Categorias */}
                    <div className="rodape-secao">
                        <h4>Categorias</h4>
                        <ul>
                            <li><Link to="/produtos">Painéis Solares</Link></li>
                            <li><Link to="/produtos">Baterias</Link></li>
                            <li><Link to="/produtos">Inversores</Link></li>
                            <li><Link to="/produtos">Kits Completos</Link></li>
                        </ul>
                    </div>

                    {/* Seção Institucional */}
                    <div className="rodape-secao">
                        <h4>Institucional</h4>
                        <ul>
                            <li><Link to="/sobreNos">Quem Somos</Link></li>
                            <li><Link to="/sobre">Sobre Energia Solar   </Link></li>
                            <li><Link to="/duvidas">Central de Ajuda</Link></li>
                        </ul>
                    </div>

                    {/* Seção Atendimento */}
                    <div className="rodape-secao">
                        <h4>Atendimento</h4>
                        <ul>
                            <li><Link to="/suporte">Fale Conosco</Link></li>
                            <li><Link to="/politicaDePrivacidade">Política de Privacidade</Link></li>
                            <li><Link to="/termosDeUso">Termos de Uso</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Direitos Autorais */}
                <div className="rodape-direitos">
                    <p>&copy; {anoAtual} SolarisPower. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>


    );
}

export default Footer;