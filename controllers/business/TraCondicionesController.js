var TraCondicionesService = require('../../service/business/TraCondicionesService.js');

// TraCondiciones routes
secureRoutes.get('/TraCondiciones/GetByIdCondiciones', TraCondicionesService.GetByIdCondiciones);