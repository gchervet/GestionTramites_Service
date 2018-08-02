var PadPaisesModel = require('../../model/business/PadPaisesModel.js');

module.exports.GetAll = function(req, res){

    return PadPaisesModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var paisesDTO = {
                        id : element.Id,
                        code : element.Codigo,
                        name : element.Nombre,
                    }
                    rtn.push(paisesDTO);
                }
            });
        }

        res.json(rtn);
    });
}