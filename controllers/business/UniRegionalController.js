var UniRegionalService = require('../../service/business/UniRegionalService.js');

// UniRegional routes
secureRoutes.get('/UniRegional/GetAll', UniRegionalService.GetAll);