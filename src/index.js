const express = require('express');
const app = express();
const mysql = require('mysql');
const myconn = require('express-myconnection')
const routes = require('./routes/routes')
const routesAd = require('./routes/admins.routes')
const routesProve = require('./routes/provee.routes')
const routesDoc = require('./routes/doctores.routes')
const routesProductos = require('./routes/productos.routes')
const routesCitas = require('./routes/citas.routes')
const routesCorreos = require('./routes/correos.routes')
const cors = require('cors');

// Settings
app.set('port', process.env.PORT || 8080);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'LifeBD'
}

// Middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//routes
app.get('/', (req, res) => { 
    res.send('Servidor y api de LIFE CONTROL\n Autor: TeamSoft')
})

app.use('/api', routes)
app.use('/api/admin', routesAd)
app.use('/api/provee', routesProve)
app.use('/api/doctores', routesDoc)
app.use('/api/productos', routesProductos)
app.use('/api/citas', routesCitas)
app.use('/api/correos', routesCorreos)

app.get('/user', (req, res) => {
    res.send("Usuarios")
})

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
  });