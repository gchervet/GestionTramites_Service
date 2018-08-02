var TraPrecioItemModel = require('../../model/business/TraPrecioItemModel');

module.exports.GetByPrecioItemByIdPantalla = function(req, res){

    return TraPrecioItemModel.GetByPrecioItemByIdPantalla(req.params.idPrecioLista, req.params.idPantalla).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var precioItemDTO = {
                        ConceptoId : element.ConceptoId,
                        Descripcion : element.Descripcion,
                        Valor : element.Valor,
                    }
                    rtn.push(precioItemDTO);
                }
            });
        }

        res.json(rtn);
    });
}