import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

/**
 * Componente Provider responsável por gerenciar o estado global do carrinho de compras e sua persistência.
 */
export const CartProvider = ({ children }) => {
  // Inicializa o estado lendo do localStorage para manter os itens entre atualizações de página
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('@solar-app:cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Erro ao carregar o carrinho do localStorage:', error);
      return [];
    }
  });

  // Atualiza o localStorage sempre que o carrinho mudar
  useEffect(() => {
    try {
      localStorage.setItem('@solar-app:cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar o carrinho no localStorage:', error);
    }
  }, [cartItems]);

  /**
   * Adiciona um item ao carrinho ou incrementa sua quantidade caso já exista.
   */
  const addToCart = (produto, quantidade = 1) => {
    if (!produto || !produto.id) return;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === produto.id);

      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        const novaQtd = updatedItems[existingIndex].quantidade + quantidade;
        const estoqueMax = produto.estoque || updatedItems[existingIndex].estoque || 99;

        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantidade: novaQtd > estoqueMax ? estoqueMax : novaQtd
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            id: produto.id,
            nome: produto.nome,
            categoria: produto.categoria || 'Geral',
            preco: Number(produto.preco) || 0,
            quantidade: quantidade,
            imagemUrl: produto.imagemUrl || produto.imagem || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
            estoque: produto.estoque || 10
          }
        ];
      }
    });
  };

  /**
   * Atualiza a quantidade de um item no carrinho, seja por incremento/decremento ou valor direto.
   */
  const updateQuantity = (id, deltaOuNovaQtd, isDelta = false) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            let novaQtd = isDelta ? item.quantidade + deltaOuNovaQtd : deltaOuNovaQtd;
            
            // Impede ultrapassar o estoque
            if (item.estoque && novaQtd > item.estoque) {
              novaQtd = item.estoque;
            }

            return { ...item, quantidade: novaQtd };
          }
          return item;
        })
        .filter(item => item.quantidade > 0) // Remove o item se a quantidade for 0 ou menor
    );
  };

  /**
   * Remove um item específico do carrinho com base no ID.
   */
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Limpa todos os itens do carrinho de compras.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        // Aliases para compatibilidade de nomes
        handleUpdateQuantity: updateQuantity,
        handleRemoveItem: removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para consumir o contexto do carrinho de compras.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};