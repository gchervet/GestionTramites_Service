var MenuGroupService = require('../../service/configuration/MenuGroupService.js');

secureRoutes.get('/MenuGroup/GetAll', MenuGroupService.GetAll);


module.exports.Test = function(param){
    console.log(param);
}