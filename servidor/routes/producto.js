const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller')
// api produtos
router.post('/', productoController.crearProducto)
router.get('/',productoController.obtenerProductos)
router.get('/:id',productoController.buscarUno)
router.put('/:id',productoController.editarProducto)
router.delete('/:id',productoController.eliminarProducto)
module.exports = router;