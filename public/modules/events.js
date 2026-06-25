export function iniciarEventos(){
    const botonMenu = document.querySelector('.menu-btn') 
    const sidebar = document.querySelector('aside')

    if (!botonMenu || !sidebar) return // sino existen en HTML entonces sale de esa funcion

    botonMenu.addEventListener('click', function() {
        sidebar.classList.toggle('abierto');
    })
}
