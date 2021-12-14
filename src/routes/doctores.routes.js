const express = require('express');
const routes = express.Router();

routes.get('/doc', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM doctor', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
        })
    })
})

routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM doctor WHERE matricula = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO doctor set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Doctor agregado!')
        })
    })
})

routes.delete('/:matricula', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM doctor WHERE matricula = ?', [req.params.matricula], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Doctor Eliminado')
        })
    })
})

module.exports = routes;