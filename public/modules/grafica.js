let graficaActual = null
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00')
    return fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
}
export function dibujarGrafica(pedidos,inventario, numDias = 7){
    if (graficaActual) graficaActual.destroy() //Destruimos la grafica que ya existe//

    const dias = []
    const hoy = new Date()
    

    for (let i = numDias; i >= 0; i--) {
        const fecha = new Date(hoy)
        fecha.setDate(hoy.getDate() - i)
        dias.push(fecha.toISOString().split('T')[0])
    }

    const etiquetas = dias.map(fecha => formatearFecha(fecha))
    const kilosPorDia = dias.map(fecha => {
        const entregados = pedidos.filter(p =>
            p.fecha === fecha && p.estado === 'Entregado'
        )
        return entregados.reduce((acc, p) => acc + p.cant, 0)
    })

    const ingresosPorDia = dias.map(fecha => {
        const entregados = pedidos.filter(p =>
            p.fecha === fecha && p.estado === 'Entregado'
        )
        return entregados.reduce((acc, p) => {
            const fruta = inventario.find(item => item.fruta === p.fruta)
            const precio = fruta ? fruta.precio_kg : 0
            return acc + (p.cant * precio)
        }, 0)
    })

    const botones = document.querySelectorAll('.btn-filtro')
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            botones.forEach(b => b.classList.remove('activo'))
            boton.classList.add('activo')

            document.querySelector('.cardsg small').textContent = `Últimos ${boton.textContent}`


            const dias = Number(boton.dataset.dias)
            dibujarGrafica(pedidos, inventario, dias)
        })
    })

    const canvas = document.getElementById('grafica-ventas')
    graficaActual = new Chart(canvas, {
        data: {
            labels: etiquetas,
            datasets: [
                {
                    type: 'bar',
                    label: 'Kg despachados',
                    data: kilosPorDia,
                    backgroundColor: '#22c55e',
                    yAxisID: 'y'
                },
                {
                    type: 'line',
                    label: 'Ingresos (COP)',
                    data: ingresosPorDia,
                    borderColor: '#3b82f6',
                    backgroundColor: 'transparent',
                    tension: 0.5,
                    yAxisID: 'y2'
                },
                {
                    type: 'line',
                    label: 'Meta diaria',
                    data: Array(numDias).fill(28.5),
                    borderDash: [5, 4],
                    borderColor: '#BA7517',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            scales: {
                y: {
                    position: 'left',
                    title: { display: true, text: 'Kg' }
                },
                y2: {
                    position: 'right',
                    min: 0,
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'COP' }
                }
            }
        }
    })

}