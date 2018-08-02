var UniCtaCteEstadoService = require('../../service/business/UniCtaCteEstadoService.js');

// UniCtaCteEstado routes
secureRoutes.get('/UniCtaCteEstado/GetSaldoByLegajo/:legajo', UniCtaCteEstadoService.GetSaldoByLegajo);