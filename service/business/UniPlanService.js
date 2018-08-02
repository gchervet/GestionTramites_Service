var UniPlanModel = require('../../model/business/UniPlanModel.js');
var uniPlanService = require('../business/UniPlanService.js');

module.exports.GetAll = function(req, res){
    return UniPlanModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            var recordSetLength = result.recordset.length;
            var idx = 0;
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var planDTO = {
                        CodCar : element.codcar,
                        CantOp : element.cantop,
                        NombreCarrera : element.nomcar,
                        Tipo : element.tipo,
                        CantMaterias : element.cantmat,
                        CodEsc : element.codesc,
                        CantidadAnios : element.cantidad_anios,
                        Titulo : element.Titulo,
                        TituloIntermedio : element.TituloIntermedio,
                        AnioTituloIntermedio : element.AnioTituloIntermedio,
                        Publicable : element.publicable,
                        MateriaList: []
                    }

                    rtn.push(planDTO);
                    
                    // uniPlanService.GetPlanByCodigoCarrera(planDTO.CodCar).then( function(resolve){
                        
                    //     planDTO.MateriaList = resolve;
                    //     rtn.push(planDTO);

                    //     // TODO: SOLUCIONAR LA LISTA DE MATERIAS POR PLAN
                    //     if(idx == (result.recordset.length - 1))
                    //     {
                    //         res.json(rtn);
                    //     }
                    //     idx++;

                    // });
                }
            });
            res.json(rtn);
        }
    });
}

module.exports.GetPlanByCodigoCarrera = function(req, res){
     
    var codcar = '';

    if (typeof req === 'string') {
        codcar = req;
    }
    else{
        codcar = req.param('codcar');
    }
    return UniPlanModel.GetPlanByCodigoCarrera(codcar).then(result => {
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                var uniPlanMateriaDTO = {
                    CodigoMateria : element.codigo,
                    Fila : element.Fila,
                    Anio : element.anio,
                    Cuatri : element.cuatri,
                    TipoMateria : element.TipoMateria,
                    Idioma : element.Idioma,
                    Modalidad : element.modalidad,
                    Clasespresenciales : element.clasespresenciales,
                    Modulosdistancia : element.modulosdistancia,
                    Anual : element.anual,
                    NombreMateria : element.NombreMateria,
                    ConceptoId : element.ConceptoId
                }
                rtn.push(uniPlanMateriaDTO);
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