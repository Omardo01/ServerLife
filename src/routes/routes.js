const express = require('express');
const routes = express.Router();

routes.get('/us', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM usuario', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
            console.log(rows)
        })
    })
})
routes.get('/pacientes', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT matricula, nombres, apellidos, peso, altura, imc, carrera FROM usuario', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
            console.log(rows)
        })
    })
})
routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM usuario WHERE matricula = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            console.log(rows)
            
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO usuario set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario agregado!')
        })
    })
})

routes.put('/:matricula', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE usuario set ? WHERE matricula = ?', [req.body, req.params.matricula], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Persona actualizada')
        })
    })
})



module.exports = routes;