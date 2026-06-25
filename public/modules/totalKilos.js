export function calcularTotalKilos (productos){
    let acumulador = 0

    productos.forEach(item => {
        
        acumulador += (item.stock_actual || 0)
    })


    return acumulador
}