var PayperticService = require('../../service/business/PayperticService.js');

// Notification routes
secureRoutes.get('/Paypertic/GetTransactionWithoutHashClaveList', PayperticService.GetTransactionWithoutHashClaveList);
secureRoutes.get('/Paypertic/UpdateLocalHash', PayperticService.UpdateLocalHash);