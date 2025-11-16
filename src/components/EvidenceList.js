'use client';

export default function EvidenceList({ evidence, isLoading }) {
  // Función para formatear la fecha
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para acortar el hash
  const shortenHash = (hash) => {
    if (!hash) return 'N/A';
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          📋 Evidencia Registrada
        </h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-400">Cargando evidencias...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!evidence || evidence.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          📋 Evidencia Registrada
        </h2>
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-400 text-lg">No hay evidencias registradas</p>
          <p className="text-gray-500 text-sm mt-2">Sube tu primera evidencia usando el formulario de arriba</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-400">
          📋 Evidencia Registrada
        </h2>
        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {evidence.length} {evidence.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* Vista de tabla para pantallas grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID Caso
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre Archivo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Uploader
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Archivo IPFS
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {evidence.map((item) => (
              <tr key={item.id} className="hover:bg-gray-750 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                  #{item.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.caseIdentifier}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  <div className="max-w-xs truncate" title={item.fileName}>
                    {item.fileName}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-gray-700 rounded text-gray-300 text-xs">
                    {item.fileType}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDate(item.timestamp)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                  <a
                    href={`https://sepolia.etherscan.io/address/${item.uploader}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    title={item.uploader}
                  >
                    {shortenHash(item.uploader)}
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <a
                    href={`https://ipfs.io/ipfs/${item.fileCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Ver
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para pantallas pequeñas */}
      <div className="md:hidden space-y-4">
        {evidence.map((item) => (
          <div key={item.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <span className="text-blue-400 font-bold">#{item.id}</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                {item.caseIdentifier}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Archivo:</span>
                <p className="text-gray-300 truncate">{item.fileName}</p>
              </div>
              
              <div>
                <span className="text-gray-400">Tipo:</span>
                <p className="text-gray-300">{item.fileType}</p>
              </div>
              
              <div>
                <span className="text-gray-400">Fecha:</span>
                <p className="text-gray-300">{formatDate(item.timestamp)}</p>
              </div>
              
              <div>
                <span className="text-gray-400">Uploader:</span>
                <p className="text-gray-300 font-mono text-xs">{shortenHash(item.uploader)}</p>
              </div>
            </div>

            <a
              href={`https://ipfs.io/ipfs/${item.fileCid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver en IPFS
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
