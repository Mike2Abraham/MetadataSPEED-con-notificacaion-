// ---------------- Configuración de API Keys ----------------
const CLAVES_API = [
    'a63f1ef4',    // tu key principal
    // 'tu_key_2',
    // 'tu_key_3'
].filter(clave => clave && clave !== '' && !clave.includes('tu_key_'));

// ---------------- Limpieza de títulos ----------------
function limpiarTitulo(texto) {
  if (!texto) return '';
  return String(texto)
    .replace(/\d+[xX]\d+/g, ' ')   // quitar 2x6, 02x06, 12X24, etc
    .replace(/\bNombre:\s*/i, '')
    .replace(/[\\/]+/g, ' ')
    .replace(/\.(mkv|mp4|avi|srt|m4v|webm|mov|wmv|mpg|mpeg)$/i, '')
    .replace(/[_\.\-=\+]+/g, ' ')
    .replace(/[,\(\)\[\]\{\}]+/g, ' ')
    .replace(/\b(19|20)\d{2}\b/g, ' ')
    .replace(/\b(480p|720p|1024p|1080p|2160p|4k|HD|DVD|bluray|brrip|webrip|x264|x265|dvdrip|HDRip|HDTV|WEB-DL|CAM|Repack|Final|Special|hdr|hevc|aac|ac3|dts|xvid|r5|ts|FULL|Full|full|full)\b/ig, ' ')
    .replace(/\b(?:Cap|Capítulo|Capitulo|capitulo|Episodio|Ep|Episode|Season|Temporada)\b\s*\d*/ig, ' ')
    .replace(/\b(Temp|Temporada|season|Season)\s*\d+\b/ig, ' ')
    .replace(/[-\s]\d+$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ')
    .map(palabra => palabra ? palabra[0].toUpperCase() + palabra.slice(1).toLowerCase() : '')
    .join(' ');
}


const OMDB_BASE = 'https://www.omdbapi.com/';
let indiceClaveActual = 0;

// ---------------- Función para rotar claves ----------------
function obtenerSiguienteClave() {
    if (CLAVES_API.length === 0) throw new Error("No hay API Keys configuradas");
    const clave = CLAVES_API[indiceClaveActual];
    indiceClaveActual = (indiceClaveActual + 1) % CLAVES_API.length;
    return clave;
}

// ---------------- Petición con rotación automática ----------------
async function pedirConRotacion(url) {
  let ultimoError;
  for (let i = 0; i < CLAVES_API.length; i++) {
    const clave = obtenerSiguienteClave();
    const urlCompleta = `${url}${url.includes('?') ? '&' : '?'}apikey=${clave}`;
    console.log("Probando URL:", urlCompleta);

    try {
      const respuesta = await fetch(urlCompleta);
      if (!respuesta.ok) {
          throw new Error(`Error HTTP! status: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      console.log("Respuesta OMDb:", datos);

      // si OMDb responde con éxito
      if (datos.Response === "True") {
          return datos;
      }

      // guardamos el último error textual de OMDb
      ultimoError = datos.Error || "Película no encontrada";
    } catch (error) {
        ultimoError = error.message;
        console.warn(`Clave ${clave} falló:`, error);
    }
  }

  // devolvemos null en vez de lanzar excepción, para permitir fallback en nombreClave()
  return { Response: "False", Error: ultimoError || "Todas las claves fallaron" };
}

// ---------------- Búsqueda principal ----------------
async function nombreClave(tituloManual) {
  try {
    await new Promise(r => setTimeout(r, 200));

    let titulo = tituloManual || '';
    if (!titulo) {
        const el = document.querySelector('.nombre-del-video#marquee-text');
        if (!el) {
            console.warn('No existe #marquee-text en el DOM');
            return;
        }
        titulo = limpiarTitulo(el.textContent || '');
    }
    if (!titulo) {
        console.warn('No se pudo obtener título');
        return;
    }
    const cont = document.querySelector('.KEY-MOVIE');
    if (!cont) {
        console.warn('No existe contenedor .KEY-MOVIE en el DOM');
        return;
    }
    // --- intento con ?t=
    let datos = await pedirConRotacion(`${OMDB_BASE}?t=${encodeURIComponent(titulo)}`);
    // --- fallback con ?s=
    if (!datos || datos.Response === "False") {
        const busqueda = await pedirConRotacion(`${OMDB_BASE}?s=${encodeURIComponent(titulo)}`);
        if (busqueda.Response === "True" && busqueda.Search && busqueda.Search.length > 0) {
            datos = await pedirConRotacion(`${OMDB_BASE}?i=${busqueda.Search[0].imdbID}`);
        }
    }
    // --- mostrar resultados
    if (datos && datos.Response === "True") {
        document.querySelectorAll('.KEY-MOVIE').forEach(contenedor => {
            contenedor.innerHTML = `
                <div class="movie-card">
                    <img src="${datos.Poster !== "N/A" ? datos.Poster : 'default-poster.jpg'}" 
                         style="float:left; margin-right:10px; width: 100px; height: auto;">
                    <div class="classTex">
                        <div class="classTex1"><b>${datos.Title}</b> (${datos.Year})</div>
                        <div class="classTex2">${datos.Genre}</div>
                        <div class="classTex2"><small>${datos.Actors}</small></div>
                        <div class="classTex3">${datos.Plot}</div>
                    </div>
                </div>
            `;
        });

        notificarPeliculaEncontrada(datos);
    } else {
        cont.innerHTML = `<div style="color:red">No se pudo encontrar: ${titulo}<br><small>${datos.Error || 'Error desconocido'}</small></div>`;
    }

  } catch (error) {
      console.error("Error:", error);
      MostrarInfoScreen(`Ocurrió un error: ${error.message}`);
  }
}



//esta funcion es para pasarle los datos a la llamada de notificacion
function notificarPeliculaEncontrada(datosPelicula) {
  if (!datosPelicula) return;
  // Validación más robusta del poster
  let posterUrl = (datosPelicula.Poster && datosPelicula.Poster !== "N/A") 
    ? datosPelicula.Poster 
    : "./iconodVideoSP.png"; // una imagen por defecto genérica por si no hay poster
  MostrarInfoScreen({
    img: posterUrl,
    text: `Estás mirando: ${datosPelicula.Title || 'Sin título'} (${datosPelicula.Year || 'No tiene año'})`,
    text2: datosPelicula.Genre ? `Género: ${datosPelicula.Genre}` : '',
    text3: datosPelicula.Director ? `Director: ${datosPelicula.Director}` : '',
    duration: 8000
  });
}
