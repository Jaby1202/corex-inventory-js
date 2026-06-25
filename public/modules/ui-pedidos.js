
export function dibujarTabla(pedidos, onCambio){
    const tabla = document.getElementById('tabla-cuerpo')

    tabla.innerHTML = ""


    pedidos.slice().reverse().slice(0, 10).forEach(pedido => {
        const fila = document.createElement ('tr')

        fila.innerHTML =`
            <td>#${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.cant}kg</td>
            <td><span class="estado estado-${pedido.estado.toLowerCase()}">${pedido.estado}</span></td>
            <td>
                ${pedido.estado === 'Pendiente' 
                    ? `<button class="btn-entregar">Entregar</button>` 
                    : '—'}
            </td>
        `

        const btnEntregar = fila.querySelector('.btn-entregar')
        if (btnEntregar) {
            btnEntregar.addEventListener('click', () => {
                pedido.estado = 'Entregado'
                onCambio()
            })
        }

        tabla.appendChild(fila)
        
    })

}