var UniCtaCteEstadoModel = require('../../model/business/UniCtaCteEstadoModel');

module.exports.GetSaldoByLegajo = function(req, res){

    return UniCtaCteEstadoModel.GetSaldoByLegajo(req.params.legajo).then(function(result, $filter){
        
        var rtn = {};
        if(result.recordset){
            if(result.recordset.length > 0)
            {
                rtn.Legajo = result.recordset[0].legajo,
                rtn.Saldo = result.recordset[0].Deuda - result.recordset[0].InscrcripcionAFavor
            }
        }

        res.json(rtn);
    });
}