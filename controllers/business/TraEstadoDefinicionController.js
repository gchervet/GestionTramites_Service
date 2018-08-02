var TraEstadoDefinicion = require('../../service/business/TraEstadoDefinicionService');

// TraEstadoDefinicion routes
secureRoutes.get('/TraEstadoDefinicion/GetByIdEstado', TraEstadoDefinicion.GetByIdEstado);
secureRoutes.get('/TraEstadoDefinicion/GetNextEstadosByIdEstadoActual/:idEstadoActual', TraEstadoDefinicion.GetNextEstadosByIdEstadoActual);
secureRoutes.get('/TraEstadoDefinicion/GetNextEstadoByIdEstado', TraEstadoDefinicion.GetNextEstadoByIdEstado);
secureRoutes.get('/TraEstadoDefinicion/GetEstadoInicialByIdTramite/:idTramite', TraEstadoDefinicion.GetEstadoInicialByIdTramite);