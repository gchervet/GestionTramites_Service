var PayperticModel = require('../../model/business/PayperticModel');

module.exports.GetTransactionWithoutHashClaveList = function(req, res){

    return PayperticModel.GetTransactionWithoutHashClaveList().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    rtn.push(element.Clave);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.UpdateLocalHash = function(req, res){

    return PayperticModel.UpdateLocalHash(req.body.claveKennedy, req.body.pptHash).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    rtn.push(element.Clave);
                }
            });
        }

        res.json(rtn);
    });
}