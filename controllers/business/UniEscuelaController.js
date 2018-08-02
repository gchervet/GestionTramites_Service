var UniEscuelaService = require('../../service/business/UniEscuelaService.js');

// UniEscuela routes
secureRoutes.get('/UniEscuela/GetAll', UniEscuelaService.GetAll);
