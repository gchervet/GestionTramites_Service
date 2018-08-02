var RoleModel = require('../../model/configuration/RoleModel.js');

module.exports.GetRolePermissionByUsername = function(req, res){
    
    var username = '';

    if (typeof req === 'string') {
        username = req;
    }
    else{
        username = req.param('username');
    }
    return RoleModel.GetRolePermissionByUsername(username).then(result => {
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                rtn.push(element.Name);
            });
        }

        if(res)
        {

            res.json(rtn);
        }
        else{
            return rtn;
        }
    });
}