# Corex Inventory

Dashboard de gestión de inventario construido para una microempresa familiar de pulpa de fruta en Bogotá, Colombia. Permite monitorear stock, registrar pedidos y analizar tendencias de despacho en tiempo real.

🔗 **[Ver demo en vivo](https://jaby1202.github.io/corex-inventory-js/)**

---

## Funcionalidades

- **Dashboard en tiempo real** — métricas de stock, ventas del día, pedidos pendientes y productos con stock bajo
- **Gráfica de tendencia de despachos** — kilos despachados e ingresos por día con filtros de 7 días, 30 días y 3 meses
- **Gestión de pedidos** — registro de nuevos pedidos con modal, cambio de estado de Pendiente a Entregado
- **Alertas de stock bajo** — detección automática de productos por debajo del mínimo con botón de reabastecimiento
- **Persistencia de datos** — todos los cambios se guardan en localStorage y persisten al recargar la página

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas y diseño responsive
- JavaScript vanilla con ES6 modules
- Chart.js para visualización de datos
- localStorage para persistencia

## Arquitectura

El proyecto usa una arquitectura modular donde cada responsabilidad vive en su propio archivo:

```
public/
├── modules/
│   ├── app.js          # Punto de entrada y orquestación
│   ├── ui-alertas.js   # Renderizado de alertas de stock
│   ├── ui-pedidos.js   # Tabla de pedidos recientes
│   ├── ui-modal.js     # Modal de registro de pedidos
│   ├── grafica.js      # Gráfica de tendencia con Chart.js
│   ├── storage.js      # Capa de persistencia con localStorage
│   ├── ventasHoy.js    # Cálculo de ventas del día
│   ├── totalKilos.js   # Cálculo de stock total
│   ├── stockBajo.js    # Detección de stock bajo
│   └── pedidos.js      # Conteo de pedidos pendientes
└── data.json           # Datos de inventario y pedidos
```

## Contexto

Proyecto construido como solución real para una microempresa de pulpa de fruta, con el objetivo de reemplazar el seguimiento manual en papel o Excel. Los datos mostrados son simulados para la demo.

---

Desarrollado por [Jhonathan Burrel](https://www.linkedin.com/in/jhonathan-arvey-burrel-yopasa-044540241) — Bogotá, Colombia
