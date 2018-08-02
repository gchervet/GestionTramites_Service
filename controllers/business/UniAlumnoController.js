var UniAlumnoService = require('../../service/business/UniAlumnoService.js');

// AlumnoController routes
secureRoutes.get('/UniAlumno/GetAlumnoByLegajo/:id', UniAlumnoService.GetAlumnoByLegajo);
secureRoutes.get('/UniAlumno/GetAlumnoByUsername/:username', UniAlumnoService.GetAlumnoByUsername);
secureRoutes.get('/UniAlumno/GetDatosPersonalesByLegajo/:id', UniAlumnoService.GetDatosPersonalesByLegajo);
secureRoutes.get('/UniAlumno/GetDatosPersonalesByLegajoMock/:id', UniAlumnoService.GetDatosPersonalesByLegajoMock);
secureRoutes.get('/UniAlumno/ValidateLegajo/:legajo', UniAlumnoService.ValidateLegajo);
secureRoutes.get('/UniAlumno/GetDatosPersonalesByLegajoProgramasLegalizados/:id', UniAlumnoService.GetDatosPersonalesByLegajoProgramasLegalizados);
secureRoutes.post('/UniAlumno/UpdateDatosPersonalesByLegajoProgramasLegalizados', UniAlumnoService.UpdateDatosPersonalesByLegajoProgramasLegalizados);
secureRoutes.get('/UniAlumno/GetDatosPersonalesByLegajoAnalitico/:id', UniAlumnoService.GetDatosPersonalesByLegajoAnalitico);
secureRoutes.post('/UniAlumno/UpdateDatosPersonalesByLegajoAnalitico', UniAlumnoService.UpdateDatosPersonalesByLegajoAnalitico);
secureRoutes.get('/UniAlumno/GetDatosPersonalesByLibretaUniversitaria/:numeroDocumento&:tipoDocumento', UniAlumnoService.GetDatosPersonalesByLibretaUniversitaria);
secureRoutes.post('/UniAlumno/SaveDatosPersonalesByLibretaUniversitaria', UniAlumnoService.SaveDatosPersonalesByLibretaUniversitaria);
app.get('/UniAlumno/GetAlumnoEstadoAcademico/:legprovi', UniAlumnoService.GetAlumnoEstadoAcademico);