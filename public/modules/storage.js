export function guardarDatos(datos) {
    localStorage.setItem('corex-datos', JSON.stringify(datos))
}
export function cargarDatos() {
    const guardado = localStorage.getItem('corex-datos')
    return guardado ? JSON.parse(guardado) : null
}