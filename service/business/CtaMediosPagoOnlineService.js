var CtaMediosPagoOnlineModel = require('../../model/business/CtaMediosPagoOnlineModel.js');

module.exports.GetAll = function (req, res) {

    return CtaMediosPagoOnlineModel.GetAll().then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {
                    // Se arma el DTO
                    var resultDTO = {
                        Codigo: element.Codigo,
                        Nombre: element.Nombre,
                        FinancieraPropiaId: element.FinancieraPropiaId,
                        Habilitado: element.Habilitado,
                        TipoTransaccion: element.TipoTransaccion,
                        IngresaNumeroPago: element.IngresaNumeroPago,
                        TipoNumeroPago: element.TipoNumeroPago,
                        TipoTransaccion1Cuota: element.TipoTransaccion1Cuota
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}
