const express = require('express');
const routes = express.Router();

routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT id_cita, lugar, fecha, nombre FROM cita inner join doctor on cita.matricula_doctor=doctor.matricula WHERE matricula_usuario = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO cita set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cita programada!')
        })
    })
})

module.exports = routes;