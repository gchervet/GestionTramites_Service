var UniPlanService = require('../../service/business/UniPlanService.js');

// UniPlan routes
secureRoutes.get('/UniPlan/GetAll', UniPlanService.GetAll);
secureRoutes.get('/UniPlan/GetPlanByCodigoCarrera', UniPlanService.GetPlanByCodigoCarrera);