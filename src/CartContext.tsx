import React, { createContext, useState, useContext } from 'react';

export type Producto = { id: number; nombre: string; precio: number; img: string; desc?: string };
export type CartItem = Producto & { cantidad: number };

interface CartContextType {
  carrito: CartItem[];
  agregarAlCarrito: (producto: Producto) => void;
  restarDelCarrito: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const restarDelCarrito = (id: number) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === id);
      if (existe && existe.cantidad > 1) {
        return prev.map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart error');
  return context;
};