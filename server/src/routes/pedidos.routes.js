const express = require('express');
const router = express.Router();
import * as pedidos from '../controllers/pedidos.controller';

// pedidos

router.post('/', pedidos.createPedidos);
router.get('/', pedidos.getAllPedidos);
router.get('/all', pedidos.getAllPedidosWithFalse);
router.get('/dashboards', pedidos.getAllPedidosDashboards);
router.put('/betweenDates', pedidos.getAllPedidosBetweenDates);

// pedidos/:id

router.put('/:id', pedidos.updatePedidos);
router.put('/delete/:id', pedidos.deletePedidos);
router.get('/:id', pedidos.getPedidosId);

module.exports = router;