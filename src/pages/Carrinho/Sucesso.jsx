import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export default function Sucesso() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <CheckCircle2 size={64} color="#10B981" />
      <h2>Pagamento Aprovado com Sucesso!</h2>
      <p>Obrigado pela sua compra. O número do seu pedido/pagamento é: <strong>{paymentId}</strong></p>
      <button onClick={() => navigate('/produtos')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Voltar para a Loja
      </button>
    </div>
  );
}