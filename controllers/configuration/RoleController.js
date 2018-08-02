var RoleService = require('../../service/configuration/RoleService.js');

// Role-controller routes
secureRoutes.get('/Role/GetRolePermissionByUsername', RoleService.GetRolePermissionByUsername);