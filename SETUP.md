# 🚀 Guía de Configuración - Frontend de Evidencia Segura

Esta guía te ayudará a configurar y poner en marcha el frontend paso a paso.

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener:

- [ ] Node.js v18+ instalado ([Descargar](https://nodejs.org/))
- [ ] Backend corriendo en `http://localhost:5001`
- [ ] npm instalado (viene con Node.js)

---

## 📦 Paso 1: Instalar Dependencias

Abre una terminal en la carpeta `frontend/` y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- next
- react
- react-dom
- axios
- tailwindcss

---

## ⚙️ Paso 2: Configurar Variables de Entorno (Opcional)

### 2.1 Copiar archivo de ejemplo:

```bash
cp .env.example .env.local
```

### 2.2 Editar `.env.local` si es necesario:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

💡 **Nota:** Si tu backend está en otra dirección, actualiza esta URL.

---

## 🚀 Paso 3: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

Deberías ver algo como:

```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

---

## 🧪 Paso 4: Probar la Aplicación

### 4.1 Abrir en el navegador

Ve a `http://localhost:3000`

### 4.2 Verificar conexión con el backend

La página debería:
- ✅ Cargar sin errores
- ✅ Mostrar el formulario de subida
- ✅ Mostrar la sección de evidencias registradas

Si ves "Cargando evidencias..." indefinidamente:
- ⚠️ Verifica que el backend esté corriendo
- ⚠️ Revisa la consola del navegador (F12) para errores

### 4.3 Subir una evidencia de prueba

1. **Ingresa un ID de caso:**
   - Ejemplo: `Caso-Test-001`

2. **Selecciona un archivo:**
   - Puede ser cualquier video, audio, imagen o PDF
   - Tamaño máximo: 100MB

3. **Click en "Subir Evidencia a Blockchain"**

4. **Espera el resultado:**
   - Verás el progreso de subida
   - Al finalizar, aparecerá:
     - ✅ CID de IPFS (con enlace)
     - ✅ Hash de transacción (con enlace a Etherscan)

5. **Verifica la tabla:**
   - La nueva evidencia debería aparecer automáticamente
   - Puedes hacer click en "Ver" para ver el archivo en IPFS

---

## 📱 Paso 5: Probar Responsive Design

### Desktop
- Abre en pantalla completa
- Deberías ver una tabla con todas las columnas

### Mobile
- Abre las DevTools del navegador (F12)
- Activa el modo responsive (Ctrl + Shift + M)
- Selecciona un dispositivo móvil
- Deberías ver tarjetas en lugar de tabla

---

## ✅ Checklist de Verificación

- [ ] El frontend inicia sin errores
- [ ] La página carga correctamente
- [ ] Se puede ver la lista de evidencias (aunque esté vacía)
- [ ] El formulario de subida se muestra correctamente
- [ ] Se pueden seleccionar archivos
- [ ] Se puede ingresar el ID del caso
- [ ] Al subir un archivo:
  - [ ] Se muestra el progreso
  - [ ] Se obtiene el CID de IPFS
  - [ ] Se obtiene el hash de transacción
  - [ ] La tabla se actualiza automáticamente
- [ ] Los enlaces a IPFS funcionan
- [ ] Los enlaces a Etherscan funcionan
- [ ] El diseño responsive funciona

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module 'axios'"
```bash
npm install
```

### Error: "Network Error"
**Causa:** El backend no está corriendo o está en otra dirección.

**Solución:**
1. Verifica que el backend esté corriendo:
   ```bash
   cd ../backend
   npm start
   ```

2. Si el backend está en otra dirección, actualiza `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://tu-backend-url/api
   ```

### Error: "CORS policy"
**Causa:** El backend no permite requests desde el frontend.

**Solución:**
Verifica que el backend tenga CORS habilitado en `server.js`:
```javascript
app.use(cors());
```

### La tabla está vacía
**Posibles causas:**
1. No hay evidencias registradas todavía
   - **Solución:** Sube una evidencia usando el formulario

2. Error al conectar con el backend
   - **Solución:** Revisa la consola del navegador (F12) para ver el error
   - Verifica la URL del backend

### El archivo no se sube
**Posibles causas:**
1. Archivo muy grande (> 100MB)
   - **Solución:** Usa un archivo más pequeño o aumenta el límite en el backend

2. Tipo de archivo no permitido
   - **Solución:** Verifica que sea video/audio/imagen/PDF

3. Backend sin conexión a Pinata o Sepolia
   - **Solución:** Revisa las variables de entorno del backend

### El diseño no se ve bien
**Causa:** Tailwind CSS no está cargando.

**Solución:**
1. Verifica que `globals.css` esté importado en `layout.tsx`
2. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 🎨 Personalización

### Cambiar el título de la página

Edita `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Mi Título Personalizado",
  description: "Mi descripción personalizada",
};
```

### Cambiar colores

Los componentes usan Tailwind CSS. Puedes cambiar los colores editando las clases:

- `bg-gray-900` → Color de fondo principal
- `bg-blue-600` → Color primario (botones)
- `bg-purple-500` → Color secundario (acentos)

### Agregar más campos

En `UploadForm.js`, puedes agregar más campos al formulario:

```javascript
const [nuevoCampo, setNuevocampo] = useState('');

// En el JSX:
<input
  type="text"
  value={nuevocampo}
  onChange={(e) => setNuevocamp(e.target.value)}
  className="..."
/>

// En handleSubmit:
formData.append('nuevoCampo', nuevocamp);
```

---

## 🌐 Despliegue en Producción

### Opción A: Vercel (Recomendado)

1. **Crear cuenta en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Crea una cuenta con GitHub

2. **Importar proyecto:**
   - Click en "Add New Project"
   - Selecciona tu repositorio
   - Configura las variables de entorno:
     - `NEXT_PUBLIC_API_URL` → URL de tu backend en producción

3. **Deploy:**
   - Click en "Deploy"
   - ¡Listo! Tu app estará en `https://tu-app.vercel.app`

### Opción B: Build Manual

1. **Crear build de producción:**
   ```bash
   npm run build
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```

3. **Servidor corriendo en:**
   ```
   http://localhost:3000
   ```

---

## 📚 Recursos Adicionales

- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Docs:** [https://react.dev/](https://react.dev/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Axios Docs:** [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

---

## 🎉 ¡Listo!

Si llegaste hasta aquí, tu frontend está completamente configurado y funcionando.

### Próximos pasos sugeridos:
1. ✅ Personalizar el diseño
2. ✅ Agregar más funcionalidades (filtros, búsqueda, etc.)
3. ✅ Implementar autenticación
4. ✅ Optimizar para SEO
5. ✅ Desplegar en producción

---

## 📸 Capturas de Pantalla

### Vista Desktop
- Tabla completa con todas las columnas
- Formulario de subida en la parte superior

### Vista Mobile
- Tarjetas verticales
- Diseño optimizado para pantallas pequeñas

---

## 🤝 Soporte

Si tienes problemas:
1. Revisa esta guía paso a paso
2. Revisa la consola del navegador (F12)
3. Revisa la consola del terminal donde corre Next.js
4. Verifica que el backend esté corriendo correctamente
