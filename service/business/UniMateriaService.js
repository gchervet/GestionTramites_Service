var UniMateriaModel = require('../../model/business/UniMateriaModel.js');

module.exports.GetMateriasAprobadasByLegajoMock = function (req, res) {

    var rtn = UniMateriaModel.getMateriasAprobadasByLegajoMock(req.params.legajo)
    
    res.json(rtn);
}

module.exports.GetMateriasAprobadasByLegajo = function (req, res) {

    UniMateriaModel.getMateriasAprobadasByLegajo(req.params.legajo).then(function (result, $filter) {
        var rtn = {
            Carrera: '',
            Plan: '',
            Materias: []
        };

        if (result.recordset) {
            if (result.recordset.length > 0) {
                rtn.Carrera = result.recordset[0].Carrera;
                rtn.Plan = result.recordset[0].Plan;
            }

            result.recordset.forEach(element => {

                if (element) {
                    // Se arma el DTO
                    var materia = {
                        Materia: element.Materia,
                        Fecha: element.Fecha,
                        Nota: element.Nota,
                        LibroActa: element.LibroActa,
                        Folio: element.Folio,
                        Recono: element.Recono,
                        Anio: element.Anio,
                        FechaReal: element.FechaReal
                    }
                    rtn.Materias.push(materia);
                }
            });
        }


        res.json(rtn);
    });
}