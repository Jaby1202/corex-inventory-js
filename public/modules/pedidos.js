export function pedidosPendientes(pedidos){
    const pendiente = pedidos.filter(pedido => pedido.estado === "Pendiente")

    return pendiente.length
}