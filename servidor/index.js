const express = require('express');
const conectionDB = require('./config/db')
const cors = require('cors')
// Creamos el server

const app = express();

conectionDB();
app.use(cors());
app.use(express.json())
app.use('/api/productos', require('./routes/producto'))
app.listen(4000,() => {
    console.log('El servidor esta levando completamente')
})