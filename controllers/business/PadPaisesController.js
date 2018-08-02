var PadPaisesService = require('../../service/business/PadPaisesService.js');

// PadPaises routes
secureRoutes.get('/PadPaises/GetAll', PadPaisesService.GetAll);