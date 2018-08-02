var MenuService = require('../../service/configuration/MenuService.js');

// Menu-controller routes
secureRoutes.get('/Menu/GetAll', MenuService.GetAll);

module.exports.Test = function(param){
    console.log(param);
}

module.exports.SocketTest = function(param){
    io.emit("showNotification", "HELLO FROM BACK!");
}