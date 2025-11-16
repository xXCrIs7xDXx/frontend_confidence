// Configuración de la API
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  timeout: 30000, // 30 segundos
};

// URLs de exploradores
export const EXPLORER_URLS = {
  sepolia: 'https://sepolia.etherscan.io',
  ipfs: 'https://ipfs.io/ipfs',
  pinata: 'https://gateway.pinata.cloud/ipfs',
};

// Tipos de archivos permitidos
export const ALLOWED_FILE_TYPES = {
  video: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  image: ['image/jpeg', 'image/png', 'image/gif'],
  document: ['application/pdf'],
};

// Función para formatear bytes a tamaño legible
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Función para formatear fecha
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Función para acortar hashes
export const shortenHash = (hash, start = 6, end = 4) => {
  if (!hash) return 'N/A';
  if (hash.length <= start + end) return hash;
  return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
};

// Función para validar tipo de archivo
export const isValidFileType = (fileType) => {
  const allTypes = Object.values(ALLOWED_FILE_TYPES).flat();
  return allTypes.includes(fileType);
};

// Función para obtener el ícono según el tipo de archivo
export const getFileIcon = (fileType) => {
  if (!fileType) return '📄';
  
  if (fileType.startsWith('video/')) return '🎥';
  if (fileType.startsWith('audio/')) return '🎵';
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType.includes('pdf')) return '📕';
  
  return '📄';
};
