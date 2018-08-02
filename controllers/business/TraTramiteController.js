var TraTramiteService = require('../../service/business/TraTramiteService.js');

// TraTramite routes
secureRoutes.get('/TraTramite/GetAll', TraTramiteService.GetAll);