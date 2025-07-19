import React from 'react';
import ReservasList from './components/ReservasList';
import FacturaForm from './components/FacturaForm';
import MenuList from './components/MenuList';
import ClientesPage from './pages/ClientesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <ReservasList />
      <FacturaForm />
      <ClientesPage />
      <MenuList />
    </>
  );
}
