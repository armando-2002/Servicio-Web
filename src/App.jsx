import React from 'react';
import ReservasList from './components/ReservasList';
import FacturaForm from './components/FacturaForm';
import MenuList from './components/MenuList';
import ClientesPage from './pages/ClientesPage';


export default function App() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <ReservasList />
      <FacturaForm />
      <ClientesPage />
      <MenuList />
    </div>
  );
}
