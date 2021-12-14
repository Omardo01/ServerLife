const express = require('express');
const routes = express.Router();

routes.get('/todos', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT id_producto, nombre, link, calorias, precio, nombre_proveedor FROM producto inner join proveedor on producto.matricula_pro=proveedor.matricula', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
        })
    })
})

routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM producto WHERE matricula_pro = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            console.log(rows)
            
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO producto set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto agregado!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM producto WHERE id_producto = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto Eliminado')
        })
    })
})

module.exports = routes;