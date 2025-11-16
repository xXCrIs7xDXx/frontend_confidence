'use client';

import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [caseIdentifier, setCaseIdentifier] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    if (!caseIdentifier.trim()) {
      alert('Por favor ingresa el ID del caso');
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus({ type: 'loading', message: 'Subiendo archivo a IPFS...' });

      // Crear FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseIdentifier', caseIdentifier);

      // Enviar al backend
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadStatus({ 
            type: 'loading', 
            message: `Subiendo archivo: ${percentCompleted}%` 
          });
        },
      });

      if (response.data.success) {
        setUploadStatus({
          type: 'success',
          message: '✅ Evidencia subida exitosamente',
          data: response.data.data,
        });

        // Limpiar formulario
        setFile(null);
        setCaseIdentifier('');
        
        // Resetear input de archivo
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = '';

        // Refrescar lista de evidencias
        if (onUploadSuccess) {
          onUploadSuccess();
        }

        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setUploadStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error al subir evidencia:', error);
      setUploadStatus({
        type: 'error',
        message: error.response?.data?.error || 'Error al subir evidencia',
        details: error.response?.data?.details,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">
        📤 Subir Nueva Evidencia
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID del Caso */}
        <div>
          <label htmlFor="case-id" className="block text-sm font-medium text-gray-300 mb-2">
            ID del Caso
          </label>
          <input
            id="case-id"
            type="text"
            value={caseIdentifier}
            onChange={(e) => setCaseIdentifier(e.target.value)}
            placeholder="Ej: Caso-001"
            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          />
        </div>

        {/* Archivo */}
        <div>
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-300 mb-2">
            Seleccionar Archivo
          </label>
          <input
            id="file-input"
            type="file"
            accept="video/*,audio/*,image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isUploading}
          />
          {file && (
            <p className="mt-2 text-sm text-gray-400">
              Archivo seleccionado: <span className="text-blue-400">{file.name}</span> ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Botón de Subir */}
        <button
          type="submit"
          disabled={isUploading || !file || !caseIdentifier.trim()}
          className={`w-full py-3 px-4 rounded font-semibold text-white transition-all ${
            isUploading || !file || !caseIdentifier.trim()
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subiendo...
            </span>
          ) : (
            '🚀 Subir Evidencia a Blockchain'
          )}
        </button>
      </form>

      {/* Mensajes de Estado */}
      {uploadStatus && (
        <div className={`mt-4 p-4 rounded ${
          uploadStatus.type === 'success' 
            ? 'bg-green-900/50 border border-green-600' 
            : uploadStatus.type === 'error'
            ? 'bg-red-900/50 border border-red-600'
            : 'bg-blue-900/50 border border-blue-600'
        }`}>
          <p className="font-semibold">{uploadStatus.message}</p>
          
          {uploadStatus.type === 'success' && uploadStatus.data && (
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <strong>CID:</strong>{' '}
                <a 
                  href={uploadStatus.data.ipfsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {uploadStatus.data.cid}
                </a>
              </p>
              <p>
                <strong>TX Hash:</strong>{' '}
                <a 
                  href={`https://sepolia.etherscan.io/tx/${uploadStatus.data.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {uploadStatus.data.transactionHash}
                </a>
              </p>
            </div>
          )}

          {uploadStatus.type === 'error' && uploadStatus.details && (
            <p className="mt-2 text-sm text-red-300">{uploadStatus.details}</p>
          )}
        </div>
      )}
    </div>
  );
}
