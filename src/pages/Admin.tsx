
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mock authentication - in a real app this would make a call to Supabase or similar
    setTimeout(() => {
      if (username === 'admin2252' && password === '2252admin') {
        // Successful login
        toast({
          title: "Login exitoso",
          description: "Bienvenido al panel de administración",
        });
        
        // In a real app, we'd set authentication state in a context or store
        // For now, just redirect to a mock admin dashboard
        navigate('/admin/dashboard');
      } else {
        // Failed login
        setError('Usuario o contraseña incorrectos');
        
        toast({
          title: "Error de autenticación",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-racing gradient-text">Panel Administrativo</h1>
                <p className="text-gray-600 mt-2">Inicie sesión para administrar vehículos</p>
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Para fines de demostración: <br />
                  Usuario: admin2252<br />
                  Contraseña: 2252admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AdminLogin;
