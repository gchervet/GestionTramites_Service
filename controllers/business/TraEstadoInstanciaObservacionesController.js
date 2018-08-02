var TraEstadoInstanciaObservacionesService = require('../../service/business/TraEstadoInstanciaObservacionesService.js');

// TraEstadoInstanciaObservacionesController Routes
secureRoutes.post('/TraEstadoInstanciaObservaciones/CreateOrUpdate', TraEstadoInstanciaObservacionesService.CreateOrUpdate)
secureRoutes.post('/TraEstadoInstanciaObservaciones/Create', TraEstadoInstanciaObservacionesService.Create)
secureRoutes.get('/TraEstadoInstanciaObservaciones/GetByIdInstanciaTramite/:idInstanciaTramite', TraEstadoInstanciaObservacionesService.GetByIdInstanciaTramite)
app.get('/TraEstadoInstanciaObservaciones/Notify/:idUsuarioAsignado/:idTramiteInstancia', TraEstadoInstanciaObservacionesService.Notify)