var TraEstadoEstadoService = require('../../service/business/TraEstadoEstadoService.js');

// TraEstadoEstado routes
secureRoutes.get('/TraEstadoEstado/GetByIdEstadoEstado', TraEstadoEstadoService.GetByIdEstadoEstado);