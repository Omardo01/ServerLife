const express = require('express');
const routes = express.Router();

routes.get('/todo', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT id_correo, contenido, nombres, apellidos, leido FROM correo inner join usuario on correo.matricula_usuario=usuario.matricula', (err, rows) => {
            if(err) return res.send(err);

            res.json(rows)
        })
    })
})


routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO correo set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Correo Enviado!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM correo WHERE id_correo = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Correo Leido')
        })
    })
})

module.exports = routes;