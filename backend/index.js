// index.js
// Importa el paquete de express
let express = require('express');
// Obtiene una instancia de express
let app = express();
const cors = require('cors');
let bodyParser = require('body-parser');



// Importa la configuración de la app
let appConfig = require('./configs/app');


app.use(cors());
// servidor entenderá json
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    })
);

// rutas
app.use('/api/pedidos', require('./routes/pedidos'));

// Comienza el servidor en el puerto 3000 de localhost
// para ver el sistema 
app.listen(appConfig.express_port,() => {
    let show = 'App listening on port ' + appConfig.express_port + '! (http://localhost:' + appConfig.express_port +')';
    console.log(show);
});