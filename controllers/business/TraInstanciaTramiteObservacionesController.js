var TraInstanciaTramiteObservacionesService = require('../../service/business/TraInstanciaTramiteObservacionesService.js');

// TraInstanciaTramiteObservaciones Routes
secureRoutes.post('/TraInstanciaTramiteObservaciones/CreateOrUpdate', TraInstanciaTramiteObservacionesService.CreateOrUpdate)