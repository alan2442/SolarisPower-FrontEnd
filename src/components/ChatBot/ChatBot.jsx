import React, { useState } from 'react';
import './ChatBot.css';

function Chatbot() {
  const [aberto, setAberto] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const [mensagens, setMensagens] = useState([
        {
            autor: 'bot',
            texto: 'Olá! Sou o assistente virtual da SolarisPower. Como posso ajudar você com energia solar?'
        }
    ]);

    const enviarMensagem = async (e) => {
        e.preventDefault();

        const texto = mensagem.trim();

        if (!texto || carregando) {
            return;
        }

        if (texto.length > 2000) {
            return;
        }

        setMensagens((anteriores) => [
            ...anteriores,
            { autor: 'usuario', texto }
        ]);

        setMensagem('');
        setCarregando(true);

        try {
            const resposta = await fetch(
                'http://localhost:8080/api/chat',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mensagem: texto
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.resposta || 'Não foi possível enviar a mensagem.'
                );
            }

            setMensagens((anteriores) => [
                ...anteriores,
                {
                    autor: 'bot',
                    texto: dados.resposta
                }
            ]);

        } catch (erro) {
            setMensagens((anteriores) => [
                ...anteriores,
                {
                    autor: 'bot',
                    texto: erro.message ||
                        'Não consegui responder agora. Tente novamente.'
                }
            ]);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="chatbot-container">

            {aberto && (
                <section
                    className="chatbot-janela"
                    aria-label="Chat da SolarisPower"
                >
                    <header className="chatbot-cabecalho">
                        <div>
                            <h3>SolarisPower</h3>
                            <p>Assistente virtual</p>
                        </div>

                        <button
                            type="button"
                            className="chatbot-fechar"
                            onClick={() => setAberto(false)}
                            aria-label="Fechar chatbot"
                        >
                            ×
                        </button>
                    </header>

                    <div
                        className="chatbot-mensagens"
                        aria-live="polite"
                    >
                        {mensagens.map((item, indice) => (
                            <div
                                key={indice}
                                className={`chatbot-mensagem ${
                                    item.autor === 'usuario'
                                        ? 'mensagem-usuario'
                                        : 'mensagem-bot'
                                }`}
                            >
                                {item.texto}
                            </div>
                        ))}

                        {carregando && (
                            <div className="chatbot-mensagem mensagem-bot">
                                Estou preparando sua resposta...
                            </div>
                        )}
                    </div>

                    <form
                        className="chatbot-formulario"
                        onSubmit={enviarMensagem}
                    >
                        <input
                            type="text"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            placeholder="Digite sua dúvida..."
                            maxLength={2000}
                            disabled={carregando}
                            aria-label="Digite sua mensagem"
                        />

                        <button
                            type="submit"
                            disabled={carregando || !mensagem.trim()}
                        >
                            Enviar
                        </button>
                    </form>
                </section>
            )}

            <button
                type="button"
                className="chatbot-botao-flutuante"
                onClick={() => setAberto(!aberto)}
                aria-expanded={aberto}
                aria-label={
                    aberto
                        ? 'Fechar assistente virtual'
                        : 'Abrir assistente virtual'
                }
            >
                {aberto ? '×' : '💬'}
            </button>
        </div>
    );
}


export default Chatbot;