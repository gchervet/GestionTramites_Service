var sql = require('mssql');
var config = require('../../config/db.json')

/*
IF EXISTS (SELECT * FROM traInstanciaTramiteObservaciones WITH(SERIALIZABLE) WHERE FK_IdInstanciaTramite = 209)
   BEGIN
       UPDATE traInstanciaTramiteObservaciones
       SET Texto = (SELECT Texto FROM traInstanciaTramiteObservaciones WHERE FK_IdInstanciaTramite = 209) + '<br>HEYYY YA'
       OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite
       WHERE FK_IdInstanciaTramite = 209
   END
   ELSE
   BEGIN
       INSERT INTO traInstanciaTramiteObservaciones([Texto],[FK_IdInstanciaTramite])
       OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite
       VALUES ('<br>HEYYY YA', 209)
   END
*/

exports.CreateOrUpdate = function (text, idInstanciaTramite, idEstadoInstancia, idUsuarioAsignado) {
    console.log('traEstadoInstanciaObservaciones/CreateOrUpdate');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(
            "IF EXISTS (SELECT * FROM traEstadoInstanciaObservaciones WITH(SERIALIZABLE) WHERE FK_IdInstanciaTramite = " + idInstanciaTramite + ") " +
            "BEGIN " +
                "UPDATE traEstadoInstanciaObservaciones " +
                "SET Texto = (SELECT Texto FROM traEstadoInstanciaObservaciones WHERE FK_IdInstanciaTramite = " + idInstanciaTramite + ") + '" + text + "' " +
                "OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite " +
                "WHERE FK_IdInstanciaTramite = " + idInstanciaTramite + " " +
            "END " +
            "ELSE " +
            "BEGIN " +
                "INSERT INTO traEstadoInstanciaObservaciones([Texto],[FK_IdInstanciaTramite],[FK_IdEstadoInstancia],[FK_IdUsuarioAsignado]) " +
                "OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite " +
                "VALUES ('" + text + "', " + idInstanciaTramite + "," + idEstadoInstancia + "," + idUsuarioAsignado + ") " +
            "END " //+ 
            /*
            "DECLARE @maxID int SET @maxID = (SELECT max(IdObservaciones) FROM traEstadoInstanciaObservaciones) " +
            "DECLARE @url varchar(max) " +
            "SET @url =  ('http://10.9.0.112:9000/api/Notification/ShowNotification/traInstanciaTramiteObservaciones.Updated/%7B' + " +
            "'%22' + 'Title' + '%22%3A%22' + 'Comentario actualizado' + '%22' + " +
            //"'%22' + 'Entity' + '%22%3A%22' + 'traInstanciaTramiteObservaciones' + '%22,' + " +
            //"'%22' + 'IdInstanciaTramite' + '%22%3A' + (SELECT CONVERT(varchar(255), FK_IdInstanciaTramite) FROM traEstadoInstanciaObservaciones WHERE IdObservaciones = @maxID) + ',' + " +
            //"'%22' + 'IdObservaciones' + '%22%3A' + (SELECT CONVERT(varchar(255), IdObservaciones) FROM traEstadoInstanciaObservaciones WHERE IdObservaciones = @maxID) + " +
            "'%7D'); " +
            "EXEC sp_CallWebServices @url"
            */
        )
    });
}

exports.Create = function (text, idInstanciaTramite, idEstadoInstancia, idUsuarioAsignado) {
    console.log('traEstadoInstanciaObservaciones/Create');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(
                "INSERT INTO traEstadoInstanciaObservaciones([Texto],[FK_IdInstanciaTramite],[FK_IdEstadoInstancia],[FK_IdUsuarioAsignado]) " +
                "OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite " +
                "VALUES ('" + text + "', " + idInstanciaTramite + "," + idEstadoInstancia + "," + idUsuarioAsignado + ") "
        )
    });
}

exports.GetByIdInstanciaTramite = function (idInstanciaTramite) {
    console.log('traEstadoInstanciaObservaciones/GetByIdInstanciaTramite');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(
            "SELECT IdObservaciones, Fecha, FK_IdEstadoInstancia, texto, FK_IdInstanciaTramite, FK_IdUsuarioAsignado, ua.Username, ua.Email " + 
            "FROM traEstadoInstanciaObservaciones eio WITH(SERIALIZABLE)  " + 
               "INNER JOIN traUsuarioAsignado ua ON ua.IdUsuario = eio.FK_IdUsuarioAsignado " + 
            "WHERE FK_IdInstanciaTramite =  " + idInstanciaTramite
        )
    });
}