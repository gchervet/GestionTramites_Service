var UniRegionalModel = require('../../model/business/UniRegionalModel.js');

module.exports.GetAll = function(req, res){

    return UniRegionalModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var regionalDTO = {
                        Codigo : element.codigo,
                        Nombre : element.Nombre,
                        NombreCustom : element.NombreCustom,
                    }
                    rtn.push(regionalDTO);
                }
            });
        }

        res.json(rtn);
    });
}