

import { iniciarEventos } from './modules/events.js'
import { dibujarAlertas } from './modules/ui-alertas.js'
import { dibujarTabla } from './modules/ui-pedidos.js'
import { calcularTotalKilos } from './modules/totalKilos.js'
import { stockBajo } from './modules/stockBajo.js'
import { calculoVentasHoy } from './modules/ventasHoy.js'
import { pedidosPendientes } from './modules/pedidos.js'
import { dibujarGrafica } from './modules/grafica.js'
import { cargarDatos, guardarDatos } from './modules/storage.js'
import { iniciarModal } from './modules/ui-modal.js'


async function iniciarApp() {
    try {
        iniciarEventos()
        

        const datosGuardados = cargarDatos()

        let datos
        if (datosGuardados) {
            
            datos = datosGuardados
        } else {
            
            const respuesta = await fetch('public/data.json')
            datos = await respuesta.json()
        }

        const totalKg = calcularTotalKilos(datos.inventario)
        const stockHTML = document.getElementById('stats-stock')
        if (stockHTML) {
            stockHTML.textContent = `${totalKg} kg`
        }

        const stock = stockBajo(datos.inventario) 
        const stockHTML1 = document.getElementById('stock-bajo')
        if (stockHTML1) {
            stockHTML1.textContent = `${stock}`
        }

        const ventasHoy = calculoVentasHoy(datos.pedidos, datos.inventario)
        const ventasHTML = document.getElementById('stats-ventas')
        if (ventasHTML){
            ventasHTML.textContent = `$${ventasHoy.toLocaleString('es-CO')} COP`
        }

        const pendiente = pedidosPendientes(datos.pedidos)
        const pendientes = document.getElementById('pedidos-pendientes')
        if (pendientes){
            pendientes.textContent = `${pendiente}`
        }


        dibujarTabla(datos.pedidos, () => {
            guardarDatos(datos)
            dibujarTabla(datos.pedidos, () => {
                guardarDatos(datos)
            })
            // actualizar métricas
            document.getElementById('pedidos-pendientes').textContent = pedidosPendientes(datos.pedidos)
            const ventasHoy = calculoVentasHoy(datos.pedidos, datos.inventario)
            document.getElementById('stats-ventas').textContent = `$${ventasHoy.toLocaleString('es-CO')} COP`
        })

        dibujarAlertas(datos.inventario, () => guardarDatos(datos))

        dibujarGrafica(datos.pedidos, datos.inventario)

        //callback nuevo pedido
        iniciarModal(datos.inventario, (nuevoPedido) => {
            datos.pedidos.push(nuevoPedido)
            guardarDatos(datos)
            dibujarTabla(datos.pedidos)
        })
        
        
    } catch (error) {
        console.error("Error al iniciar el SaaS:", error)
        
    }
}

iniciarApp();