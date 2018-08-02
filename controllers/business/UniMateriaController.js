var Materia = require('../../service/business/UniMateriaService.js');

// UniMateria routes
secureRoutes.get('/UniMateria/GetMateriasAprobadasByLegajo/:legajo', Materia.GetMateriasAprobadasByLegajo);