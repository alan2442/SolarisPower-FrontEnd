import { Link } from "react-router-dom";
import './erro.css';

/**
 * Componente responsável por renderizar a página de erro 404 (Página não encontrada).
 */
function Erro() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link to="/">Voltar para a página principal</Link>
        </div>
    );
}

export default Erro;