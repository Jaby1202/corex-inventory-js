export function calculoVentasHoy(pedidos, inventario){
    const hoy = new Date().toISOString().split('T')[0]

    const venta = pedidos.filter(pedido => 
        pedido.estado === "Entregado" && pedido.fecha === hoy 
    )

    const total = venta.reduce((acumulador, pedido) => {
        const fruta = inventario.find(item => item.fruta === pedido.fruta)
        const precio = fruta ? fruta.precio_kg : 0

        return acumulador + (pedido.cant * precio)
    }, 0)

    return total
}