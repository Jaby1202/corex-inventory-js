
export function dibujarAlertas(inventario, onCambio){
    const tabla = document.getElementById('tabla-alertas')

    tabla.innerHTML = ""

    const bajoStock = inventario.filter(item => item.stock_actual < item.stock_minimo)
    
    bajoStock.slice(0, 10).forEach(item => {
        const fila = document.createElement ('tr')

        fila.innerHTML =`
            <td>#${item.fruta}</td>
            <td>${item.stock_actual}kg</td>
            <td><button class="btn-reabastecer">Reabastecer</button></td>
        `

        const botonReabastecer = fila.querySelector('.btn-reabastecer')
        botonReabastecer.addEventListener('click', function() {
            const cantidad = Number(prompt('¿Cuántos kg quieres agregar?')) 
            if (isNaN(cantidad) || cantidad <=0) return
            item.stock_actual += cantidad 
            onCambio()
            dibujarAlertas(inventario, onCambio)  
        })

        tabla.appendChild(fila)
        
    })

    if (bajoStock.length === 0) {
        tabla.innerHTML = "<tr><td colspan='3'>✅ Todo el stock está al día</td></tr>";
    }

}