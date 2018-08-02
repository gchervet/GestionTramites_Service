var UniEdificioModel = require('../../model/business/UniEdificioModel');

module.exports.GetAll = function(req, res){

    return UniEdificioModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var uniEdificioDTO = {
                        CodIns : element.codins,
                        NomIns : element.nomins,
                        DomIns : element.domins,
                        Usrnom : element.usrnom,
                        Ftrn : element.ftrn,
                        CantLab : element.cantlab,
                        CantTal : element.canttal,
                        CantAul : element.cantaul,
                        CantCli : element.cantcli,
                        CantCco : element.cantcco,
                        Regional : element.regional
                    }
                    rtn.push(uniEdificioDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetEdificioByCodins = function(req, res){

    var codins = '';
    if(typeof req === 'string')
    {
        codins = req;
    }
    else
    {
        codins = req.param('codins');
    }
    return UniEdificioModel.GetEdificioByCodins(codins).then(function(result, $filter){
        
        var rtn = null;
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var uniEdificioDTO = {
                        CodIns : element.codins,
                        NomIns : element.nomins,
                        DomIns : element.domins,
                        Usrnom : element.usrnom,
                        Ftrn : element.ftrn,
                        CantLab : element.cantlab,
                        CantTal : element.canttal,
                        CantAul : element.cantaul,
                        CantCli : element.cantcli,
                        CantCco : element.cantcco,
                        Regional : element.regional
                    }
                    rtn = uniEdificioDTO;
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetEdificioConstancia = function(req, res){

    return UniEdificioModel.GetEdificioConstancia().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var uniEdificioDTO = {
                        CodIns : element.codins,
                        NomIns : element.nomins,
                        DomIns : element.domins,
                        Usrnom : element.usrnom,
                        Ftrn : element.ftrn,
                        CantLab : element.cantlab,
                        CantTal : element.canttal,
                        CantAul : element.cantaul,
                        CantCli : element.cantcli,
                        CantCco : element.cantcco,
                        Regional : element.regional
                    }
                    rtn.push(uniEdificioDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetEdificioLibretaUniversitaria = function(req, res){

    return UniEdificioModel.GetEdificioLibretaUniversitaria().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var uniEdificioDTO = {
                        CodIns : element.codins,
                        NomIns : element.nomins,
                        DomIns : element.domins,
                        Usrnom : element.usrnom,
                        Ftrn : element.ftrn,
                        CantLab : element.cantlab,
                        CantTal : element.canttal,
                        CantAul : element.cantaul,
                        CantCli : element.cantcli,
                        CantCco : element.cantcco,
                        Regional : element.regional
                    }
                    rtn.push(uniEdificioDTO);
                }
            });
        }

        res.json(rtn);
    });
}