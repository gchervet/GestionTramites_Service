var express = require('express');
var HelperService = require('./service/helpers/helperService.js');
global.app = express();  
var server = require('http').createServer(app);  
global.io = require('socket.io')(server);

var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

process.env.SECRET_KEY = "KENNEDY_UNI_3142";

global.secureRoutes = express.Router();

// App uses
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/secure-api', secureRoutes);
// Add headers
app.use(cors());
secureRoutes.use(cors());
//Validation middleware
secureRoutes.use(function(req, res, correctCallbackFunction){
    var token = req.body.token || req.headers['token'];

    if(token){
        //res.send("we have a token");
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            if(err){
                io.emit('401_invalid_token_error');
                res.status(401).send("Invalid token");
            } else {
                correctCallbackFunction();
            }
        });
    } else {
        res.status(401);
        res.send("please send a token");
    }

});


var TraEstadoInstanciaService = require('./service/business/TraEstadoInstanciaService.js');

/*1. Se cargan los controladores */

//Configuartion Controllers
var menuController = require('./controllers/configuration/MenuController');
var roleController = require('./controllers/configuration/RoleController');
// Business Controllers
var payperticController = require('./controllers/business/PayperticController');
var authenticateController = require('./controllers/business/SessionController');
var uniAlumnoController = require('./controllers/business/UniAlumnoController');
var uniRegionalController = require('./controllers/business/UniRegionalController');
var uniPlanController = require('./controllers/business/UniPlanController');
var uniEscuelaController = require('./controllers/business/UniEscuelaController');
var uniEdificioController = require('./controllers/business/UniEdificioController');
var uniMateriaController = require('./controllers/business/UniMateriaController');
var UniCtaCteEstadoController = require('./controllers/business/UniCtaCteEstadoController');
var traTramiteController = require('./controllers/business/TraTramiteController');
var traInstanciaTramiteController = require('./controllers/business/TraInstanciaTramiteController');
var traArchivoInstanciaTramiteEstadoController = require('./controllers/business/TraArchivoInstanciaTramiteEstadoController');
var traCondicionesController = require('./controllers/business/TraCondicionesController');
var traEstadoDefinicionController = require('./controllers/business/TraEstadoDefinicionController');
var traEstadoEstadoController = require('./controllers/business/TraEstadoEstadoController');
var traUsuarioAsignadoController = require('./controllers/business/TraUsuarioAsignadoController');
var traEstadoInstanciaController = require('./controllers/business/TraEstadoInstanciaController');
var traGrupoAsignadoController = require('./controllers/business/TraGrupoAsignadoController');
var traGrupoUsuariosController = require('./controllers/business/TraGrupoUsuariosController');
var traTipoPrioridadController = require('./controllers/business/traTipoPrioridadController');
var traPrecioItemController = require('./controllers/business/TraPrecioItemController');
var traInstanciaTramiteObservacionesController = require('./controllers/business/TraInstanciaTramiteObservacionesController');
var traEstadoInstanciaObservacionesController = require('./controllers/business/TraEstadoInstanciaObservacionesController');
var ctaMediosPagoOnlineController = require('./controllers/business/CtaMediosPagoOnlineController');
var notificationController = require('./controllers/business/NotificationController');
var padPaisesController = require('./controllers/business/PadPaisesController');
// External Controllers
var fileManagerController = require('./controllers/external/fileManager');

// TESTING
app.get('/API/TEST', menuController.Test);
app.post('/API/SOCKETTEST', menuController.SocketTest)

// Socket connection
io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(9000, function(){
    console.log("server running on port 9000");
})  
 
//var j = schedule.scheduleJob('*/1 * * * *', function(){

 /*   TraEstadoInstanciaService.GetEstadoInstanciaVencidasAll().then(response => {
        if (response) {
            if (Array.isArray(response))
                for (i in response) {
                    var actualTareaInstanciaConsulta = response[i];
                    var toMail = [];
                    if (actualTareaInstanciaConsulta.Tiempo1Escalabilidad <= actualTareaInstanciaConsulta.DiasVencidos){
                        toMail[0]=actualTareaInstanciaConsulta.EmailEscalado1;
                    }
                    if (actualTareaInstanciaConsulta.Tiempo2Escalabilidad <= actualTareaInstanciaConsulta.DiasVencidos){
                        toMail[1]=actualTareaInstanciaConsulta.EmailEscalado2;
                    }
                    if (actualTareaInstanciaConsulta.Tiempo3Escalabilidad <= actualTareaInstanciaConsulta.DiasVencidos){
                        toMail[2]=actualTareaInstanciaConsulta.EmailEscalado3;
                    }
                    
                    var transporter = nodemailer.createTransport({
                        host: 'alumnos-kennedy-edu-ar.mail.protection.outlook.com',
                        port: 25, // Gmail Port
                        //auth: {
                        //    user: account.user, // Gmail id
                        //    pass: account.pass  // Gmail password
                        //}
                    });
                    var mailOptions = {
                    from: 'mdmartini@kennedy.edu.ar', // sender address
                    to: toMail, // list of receivers
                    subject: 'La Tarea ' + actualTareaInstanciaConsulta.NombreTarea + ' del Tramite nro. ' + actualTareaInstanciaConsulta.NroTramite + ' se ecnuentra vencida hace ' + actualTareaInstanciaConsulta.DiasVencidos + ' dias ',
                    text: 'La Tarea ' + actualTareaInstanciaConsulta.NombreTarea + ' del Tramite nro. ' + actualTareaInstanciaConsulta.NroTramite + ' se ecnuentra vencida hace ' + actualTareaInstanciaConsulta.DiasVencidos + ' dias ',
                    //html:  // html body
                    };
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                    });
                }
        }
      })
      .catch(function (err){
        console.log(err.message);
      });

});*/