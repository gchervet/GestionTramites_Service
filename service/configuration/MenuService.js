var MenuGroupModel = require('../../model/configuration/MenuGroupModel.js');
var HelperService = require('../helpers/helperService.js');

module.exports.GetAll = function(req, res){

    return MenuGroupModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                var actualMenuGroup = HelperService.findObjectByKey(rtn, 'Id', element.IdMenuGroup);
                
                
                if(actualMenuGroup){
                    
                    var actualMenu = HelperService.findObjectByKey(actualMenuGroup.MenuList, 'Id', element.IdMenu);
                    // El grupo ya fue generado en la lista de devolución.
                    if(!actualMenu)
                    {
                        // Hay un nuevo submenú, se debe agregar. También hay que agregar los permisos
                        var menuToAdd = {
                            Id: element.IdMenu,
                            Name: element.MenuName,
                            IdMenuGroup: element.IdMenuGroup,
                            Detail: element.MenuDetail,
                            PermissionList: []
                        }
                        
                        var permissionToAdd = {
                            Id: element.IdPermission,
                            Name: element.PermissionName
                        }

                        menuToAdd.PermissionList.push(permissionToAdd);
                        actualMenuGroup.MenuList.push(menuToAdd);
                    }
                    else{
                        // El menú ya existe, hay que agregarle los permisos faltantes
                        var permissionToAdd = {
                            Id: element.IdPermission,
                            Name: element.PermissionName
                        }
                        
                        var actualPermission = HelperService.findObjectByKey(actualMenu.PermissionList, 'Id', permissionToAdd.Id);

                        if(!actualPermission){
                            actualMenu.PermissionList.push(permissionToAdd);
                        }
                    }
                }
                else{

                    var menuGroupToAdd = {
                        Id: element.IdMenuGroup,
                        Name: element.MenuGroupName,
                        Detail: element.MenuGroupDetail,
                        MenuList: []
                    }
                    
                    var permissionToAdd = {
                        Id: element.IdPermission,
                        Name: element.PermissionName
                    }

                    var menuToAdd = {
                        Id: element.IdMenu,
                        Name: element.MenuName,
                        IdMenuGroup: element.IdMenuGroup,
                        Detail: element.MenuDetail,
                        PermissionList: []
                    }
                    menuToAdd.PermissionList.push(permissionToAdd);
                    menuGroupToAdd.MenuList.push(menuToAdd);
                    rtn.push(menuGroupToAdd);
                }
            });
        }

        res.json(rtn);
    });
}