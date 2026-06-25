export function stockBajo (itemBajo){
    const bajoStock = itemBajo.filter(item => item.stock_actual < item.stock_minimo)

    return bajoStock.length
}