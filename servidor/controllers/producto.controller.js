const Producto = require('../models/producto')
exports.crearProducto = async (req, res) => {
try {
    let producto;
    producto = new Producto(req.body)
    await producto.save();
    res.send(producto);

} catch (e) {
    console.log(e);
    res.status(500).send('hubo Error');
}
 //   console.log(req.body);

}

exports.obtenerProductos = async (req,res) => {
    try {
        const productos = await Producto.find();
        res.json(productos)
    } catch (e) {
        console.log(e);
        res.status(500).send('hubo Error obtener productos');
    }
}

exports.editarProducto = async (req,res) => {
    try {
        const {
            nombre, categoria, ubicacion, precio
        } = req.body;
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg: ' No exite el producto'})
        }
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;
        producto = await Producto.findByIdAndUpdate({_id: req.params.id},producto, {new:true})
        res.json(producto)
    } catch (e) {
        console.log(e);
        res.status(500).send('hubo Error editar productos');
    }
}

exports.buscarUno = async (req,res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg: ' No exite el producto'})
        }
        res.json(producto)
    } catch (e) {
        console.log(e);
        res.status(500).send('hubo Error buscar uno producto');
    }
}

exports.eliminarProducto = async (req,res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg: ' No exite el producto'})
        }
        await Producto.findByIdAndRemove({_id: req.params.id})
        res.json({msg: 'Prodcuto Eliminado Correctamente'})
    } catch (e) {
        console.log(e);
        res.status(500).send('hubo Error buscar uno producto');
    }
}