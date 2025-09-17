//Esta es la funcion de notificacion podemos pasarles dato atra vez de config
function MostrarInfoScreen(config) {
    // Crear contenedor si no existe
    let container = document.getElementById('notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);  
    }
    
    // Procesar parámetros
    let text, text2, text3, img, audio, duration;
    
    if (typeof config === 'string') {
        text = config;
    } else {
        text = config.text || '';
        text2 = config.text2 || '';
        text3 = config.text3 || '';
        img = config.img;
        audio = config.audio;
        duration = config.duration;
    }
    
    duration = duration || 5000;
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    if (img) {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.className = 'notification-img';
        imgElement.onerror = function() { this.style.display = 'none'; };
        notification.appendChild(imgElement);
    }
    
    const contentElement = document.createElement('div');
    contentElement.className = 'notification-content';
    
    // Agregar cada línea de texto si existe
    //[text, text2, text3].forEach(line => {
    //    if (line) {
    //        const p = document.createElement('p');
    //        p.className = 'notification-text';
    //        p.textContent = line;
    //        contentElement.appendChild(p);
    //    }
    //});

    //la cambie por darle class diferente a cada texto pero si usted quiere usar el mismo class par aambas 
    // solo descomente la anterior y comente la de abajo solo es a gusto su diseno
    [text, text2, text3].forEach((line, index) => {
        if (line) {
            const p = document.createElement('p');
            p.className = `notification-text${index + 1}`; // text1, text2, text3
            p.textContent = line;
            contentElement.appendChild(p);
        }
    });
    notification.appendChild(contentElement);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => closeNotification(notification));
    notification.appendChild(closeButton);
    
    container.appendChild(notification);
    
    void notification.offsetWidth;
    notification.classList.add('visible');
    
    if (audio) {
        const audioElement = new Audio(audio);
        audioElement.play().catch(e => console.log('No se pudo reproducir el audio:', e));
    }
    
    let timeoutId = setTimeout(() => closeNotification(notification), duration);
    
    notification.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    notification.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => closeNotification(notification), duration);
    });
    
    function closeNotification(notificationEl) {
        notificationEl.classList.remove('visible');
        notificationEl.classList.add('hiding');
        setTimeout(() => {
            if (notificationEl.parentNode) notificationEl.parentNode.removeChild(notificationEl);
        }, 500);
    }
}


//asi la usamos casi para cualquier caso que usted necesite o solo para metadatos>> 
// Llamada simple
//MostrarInfoScreen("¡Compre un desodorante!");
//
// Con imagen
//MostrarInfoScreen({
//    img: "ruta/a/imagen.png",
//    text: "Texto de ejemplo"
//});
//
//// Completa con imagen, audio y duración personalizada
//MostrarInfoScreen({
//    img: "ruta/a/imagen.png",
//    audio: "ruta/a/audio.mp3",
//    text: "Texto de ejemplo",
//    duration: 3000 << en segundos
//});
//varias lineas 
//MostrarInfoScreen({
//    img: "ruta/a/imagen.png",
//    audio: "ruta/a/audio.mp3",
//    text: "Texto de ejemplo",
//    text2: "Texto de ejemplo",
//    text3: "Texto de ejemplo",
//    duration: 3000
//});