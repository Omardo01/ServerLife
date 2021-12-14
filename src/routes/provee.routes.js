const express = require('express');
const routes = express.Router();

routes.get('/pro', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM proveedor', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
        })
    })
})

routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM proveedor WHERE matricula = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            console.log(rows)
            
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO proveedor set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Proveedor agregado!')
        })
    })
})

routes.delete('/:matricula', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM proveedor WHERE matricula = ?', [req.params.matricula], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Proveedor Eliminado')
        })
    })
})

module.exports = routes;