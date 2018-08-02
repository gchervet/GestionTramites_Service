var TraGrupoAsignadoService = require('../../service/business/TraGrupoAsignadoService.js');

// TraGrupoAsignado routes
secureRoutes.get('/TraGrupoAsignado/GetByIdInstanciaTramite', TraGrupoAsignadoService.GetByIdInstanciaTramite);