# MetadataSPEED-con-notificacaion-
Este proyecto permite extraer metadatos de películas o series desde la OMDb API Sistema de notificaciones elegante: Muestra posters, múltiples líneas de texto y animaciones  Interfaz minimalista: Input para búsqueda manual y renderizado automático
🎬 Metadata Notifier + OMDb API
https://img.shields.io/badge/JavaScript-ES6+-yellow.svg
https://img.shields.io/badge/OMDb-API-orange.svg
https://img.shields.io/badge/License-MIT-green.svg

Este proyecto permite extraer metadatos de películas o series desde la OMDb API usando el nombre de archivo como entrada. Incluye un sistema de notificaciones personalizadas en pantalla que se puede reutilizar para cualquier propósito.

🚀 Características principales
Limpieza inteligente de títulos: Convierte nombres de archivos complejos en títulos legibles

Rotación de API Keys: Soporta hasta 3 claves API con rotación automática

Búsqueda en OMDb: Búsqueda exacta y con fallback inteligente

Sistema de notificaciones elegante: Muestra posters, múltiples líneas de texto y animaciones

Interfaz minimalista: Input para búsqueda manual y renderizado automático

📦 Instalación
Clona o descarga los archivos del proyecto

Regístrate en OMDb API para obtener tu API key

Configura tus keys en el archivo JavaScript:

javascript
const API_KEYS = [
    'tu_api_key_principal',
    // 'tu_api_key_2',  // Descomenta y agrega keys adicionales
    // 'tu_api_key_3'   // para tener rotación automática
];
🖥️ Uso básico
En tu HTML:
html
<!-- Elemento que contiene el nombre del archivo -->
<div class="nombre-del-video" id="marquee-text">avatar.2009.hd.mp4</div>

<!-- Contenedor donde se mostrarán los metadatos -->
<div class="KEY-MOVIE"></div>

<!-- Input para búsqueda manual (opcional) -->
<input type="text" id="entrada-titulo" placeholder="Escribe título y presiona Enter">
Inicialización:
javascript
// Ejecución automática al cargar la página
window.addEventListener('load', () => {
    nombrekey();
});

// O ejecución manual con un título específico
nombrekey("The Matrix");
🔔 Sistema de notificaciones
Ejemplos de uso:
javascript
// Notificación simple
MostrarInfoScreen("¡Mensaje de ejemplo!");

// Con imagen
MostrarInfoScreen({
  img: "poster.png",
  text: "Texto de ejemplo"
});

// Notificación completa
MostrarInfoScreen({
  img: "poster.png",
  audio: "sonido.mp3",
  text: "Línea principal",
  text2: "Segunda línea",
  text3: "Tercera línea",
  duration: 5000
});
🎨 Personalización
CSS incluido:
El proyecto incluye estilos modernos con:

Efectos glassmorphism y blur

Animaciones suaves

Diseño responsive

Modal para metadata completa

Variables personalizables:
Duración de notificaciones

Colores y estilos

Posición de los elementos

Comportamiento de las animaciones

📁 Estructura del proyecto
text
project/
│
├── index.html              # Ejemplo de implementación
├── style.css               # Estilos del sistema de notificaciones
├── video-notifier.js       # Lógica principal del metadata notifier
│
└── README.md               # Este archivo
🔧 Funciones principales
Función	Descripción
cleanTitle()	Limpia nombres de archivo para extraer el título
fetchWithKeyRotation()	Gestiona la rotación de API keys
nombrekey()	Función principal que orquesta la búsqueda
notificarPeliculaEncontrada()	Prepara datos para notificación
MostrarInfoScreen()	Sistema de notificaciones personalizable
💡 Casos de uso
Reproductores multimedia personalizados: Muestra información cuando cambia el video

Catálogos de películas locales: Extrae metadata de archivos locales

Sistemas de streaming: Preview de información al seleccionar contenido

Sistema de notificaciones genérico: Para cualquier tipo de alerta en tu aplicación

🛠️ Requisitos
Navegador moderno con soporte para ES6+

Conexión a Internet para acceder a OMDb API

API key de OMDb API

📝 Licencia
Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo.

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si mejoras este proyecto, considera:

Hacer un fork del proyecto

Crear una rama para tu feature (git checkout -b feature/AmazingFeature)

Commitear tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abrir un Pull Request

📞 Soporte
Si tienes preguntas o encuentras issues:

Revisa la documentación de OMDb API

Asegúrate de que tu API key sea válida y tenga requests disponibles

Verifica la consola del navegador para mensajes de error

¡Disfruta usando el Metadata Notifier! 🎉
