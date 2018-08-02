var TraGrupoUsuariosService = require('../../service/business/TraGrupoUsuariosService.js');

module.exports.AddAlumnoToGrupoAlumnos = TraGrupoUsuariosService.AddAlumnoToGrupoAlumnos;

// TraGrupoUsuarios routes
secureRoutes.get('/TraGrupoUsuarios/GetGruposByIdUsuario', TraGrupoUsuariosService.GetGruposByIdUsuario);
secureRoutes.get('/TraGrupoUsuarios/GetGruposByUsername/:username', TraGrupoUsuariosService.GetGruposByUsername);
secureRoutes.get('/TraGrupoUsuarios/GetUsuariosByIdGrupo', TraGrupoUsuariosService.GetUsuariosByIdGrupo);
secureRoutes.get('/TraGrupoUsuarios/GetGrupoAsignadoByUsername/:username', TraGrupoUsuariosService.GetGrupoAsignadoByUsername);