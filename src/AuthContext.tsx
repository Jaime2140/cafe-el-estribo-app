import React, { createContext, useContext, useState } from 'react';

interface User {
  nombre: string;
  email: string;
  puntos: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  register: (nombre: string, email: string, pass: string) => boolean;
  logout: () => void;
  sumarPuntos: (cantidad: number) => void;
  restarPuntos: (cantidad: number) => void; // <- Nueva función
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const loggedInUser = localStorage.getItem('estribo_active_user');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });

  const login = (email: string, pass: string) => {
    const usersStr = localStorage.getItem('estribo_users');
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const foundUser = users.find((u: any) => u.email === email && u.pass === pass);
      if (foundUser) {
        const puntosActuales = foundUser.puntos || 0; 
        const userData = { nombre: foundUser.nombre, email: foundUser.email, puntos: puntosActuales };
        setUser(userData);
        localStorage.setItem('estribo_active_user', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const register = (nombre: string, email: string, pass: string) => {
    const usersStr = localStorage.getItem('estribo_users') || '[]';
    const users = JSON.parse(usersStr);
    
    if (users.find((u: any) => u.email === email)) return false;

    users.push({ nombre, email, pass, puntos: 0 });
    localStorage.setItem('estribo_users', JSON.stringify(users));
    return true;
  };

  const sumarPuntos = (cantidad: number) => {
    if (!user) return;
    const nuevosPuntos = (user.puntos || 0) + cantidad;
    actualizarPuntosUsuario(nuevosPuntos);
  };

  // Lógica para descontar los puntos al reclamar un premio
  const restarPuntos = (cantidad: number) => {
    if (!user) return;
    const nuevosPuntos = Math.max(0, (user.puntos || 0) - cantidad);
    actualizarPuntosUsuario(nuevosPuntos);
  };

  // Función auxiliar para no repetir código al guardar en local
  const actualizarPuntosUsuario = (nuevosPuntos: number) => {
    if(!user) return;
    const usuarioActualizado = { ...user, puntos: nuevosPuntos };
    setUser(usuarioActualizado);
    localStorage.setItem('estribo_active_user', JSON.stringify(usuarioActualizado));

    const usersStr = localStorage.getItem('estribo_users');
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const index = users.findIndex((u: any) => u.email === user.email);
      if (index !== -1) {
        users[index].puntos = nuevosPuntos;
        localStorage.setItem('estribo_users', JSON.stringify(users));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('estribo_active_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, sumarPuntos, restarPuntos }}>
      {children}
    </AuthContext.Provider>
  );
};