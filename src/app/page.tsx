'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from '@/components/UploadForm';
import EvidenceList from '@/components/EvidenceList';

const API_URL = 'http://localhost:5001/api';

export default function Home() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener todas las evidencias del backend
  const fetchEvidence = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/evidence`);
      
      if (response.data.success) {
        setEvidenceList(response.data.data);
      }
    } catch (error) {
      console.error('Error al obtener evidencias:', error);
      setEvidenceList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar evidencias al montar el componente
  useEffect(() => {
    fetchEvidence();
  }, []);

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🔐 Sistema de Evidencia Segura
          </h1>
          <p className="text-gray-400">
            Almacenamiento descentralizado en IPFS + Blockchain Ethereum (Sepolia)
          </p>
        </div>

        {/* Formulario de Subida */}
        <UploadForm onUploadSuccess={fetchEvidence} />

        {/* Lista de Evidencias */}
        <EvidenceList evidence={evidenceList} isLoading={isLoading} />
      </div>
    </main>
  );
}
