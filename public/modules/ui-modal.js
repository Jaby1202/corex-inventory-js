export function iniciarModal(inventario, onNuevoPedido) {
    const overlay = document.getElementById('modal-pedido')
    const btnAbrir = document.querySelector('.registrar button')
    const btnCerrar = document.getElementById('modal-cerrar')
    const btnCancelar = document.getElementById('btn-cancelar')
    const btnGuardar = document.getElementById('btn-guardar-pedido')
    const selectFruta = document.getElementById('input-fruta')

    inventario.forEach(item => {
        const opcion = document.createElement('option')
        opcion.value = item.fruta
        opcion.textContent = item.fruta
        selectFruta.appendChild(opcion)
    })

    
    btnAbrir.addEventListener('click', () => {
        overlay.classList.add('activo')
    })

    
    btnCerrar.addEventListener('click', () => overlay.classList.remove('activo'))
    btnCancelar.addEventListener('click', () => overlay.classList.remove('activo'))

    
    btnGuardar.addEventListener('click', () => {
        const cliente = document.getElementById('input-cliente').value.trim()
        const fruta = document.getElementById('input-fruta').value
        const cant = Number(document.getElementById('input-cantidad').value)
        const fechaEntrega = document.getElementById('input-fecha').value

        if (!cliente || !fruta || !cant || !fechaEntrega) {
            alert('Por favor completa todos los campos')
            return
        }

        const nuevoPedido = {
            id: Date.now().toString(),
            cliente,
            fruta,
            cant,
            fecha: new Date().toISOString().split('T')[0],
            fechaEntrega,
            estado: 'Pendiente'
        }

        onNuevoPedido(nuevoPedido)
        overlay.classList.remove('activo')
    })
}