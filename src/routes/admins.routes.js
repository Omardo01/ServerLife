const express = require('express');
const routes = express.Router();

routes.get('/:matricula', (req, res) => { 
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM admins WHERE matricula = ?', [req.params.matricula], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows)
            console.log(rows)
            
        })
    })
})

module.exports = routes;