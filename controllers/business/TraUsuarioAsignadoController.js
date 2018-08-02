var TraUsuarioAsignadoService = require('../../service/business/TraUsuarioAsignadoService.js');

// TraUsuarioAsignado routes
app.get('/api/TraUsuarioAsignado/GetUsuarioInfoByUsername/:username', TraUsuarioAsignadoService.GetUsuarioInfoByUsername)
secureRoutes.get('/TraUsuarioAsignado/GetTipoUsuarioByUsername/:username', TraUsuarioAsignadoService.GetTipoUsuarioByUsername);