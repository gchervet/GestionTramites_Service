var sql = require('mssql');
var config = require('../../config/db.json')

// Create new TraInstanciaTramiteObservaciones
exports.Create = function(text, idInstanciaTramite) {
    console.log('TraInstanciaTramiteObservaciones/Create');
   return new sql.ConnectionPool(config).connect().then(pool => {
       
    return pool.request().query('INSERT INTO traInstanciaTramiteObservaciones VALUES ' + 
                                 "('" + text + "', " + idInstanciaTramite+ ")")
   });

}

// Update TraInstanciaTramiteObservaciones
exports.Update = function(text, idInstanciaTramite) {
    console.log('TraInstanciaTramiteObservaciones/Update');
    return new sql.ConnectionPool(config).connect().then(pool => {
        
     return pool.request().query("UPDATE traInstanciaTramiteObservaciones SET Texto = '" + text + "' WHERE IdObservaciones = " + idObservaciones)
    });
 
 }

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
exports.CreateOrUpdate = function(text, idInstanciaTramite){
    console.log('TraInstanciaTramiteObservaciones/CreateOrUpdate');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(
            "IF EXISTS (SELECT * FROM traInstanciaTramiteObservaciones WITH(SERIALIZABLE) WHERE FK_IdInstanciaTramite = " + idInstanciaTramite +") " +
            "BEGIN " +
                "UPDATE traInstanciaTramiteObservaciones " +
                "SET Texto = (SELECT Texto FROM traInstanciaTramiteObservaciones WHERE FK_IdInstanciaTramite = " + idInstanciaTramite + ") + '"+ text +"' " +
                "OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite " +
                "WHERE FK_IdInstanciaTramite = " + idInstanciaTramite + " " +
            "END " +
            "ELSE " +
            "BEGIN " +
                "INSERT INTO traInstanciaTramiteObservaciones([Texto],[FK_IdInstanciaTramite]) " +
                "OUTPUT INSERTED.IdObservaciones, INSERTED.Texto, INSERTED.FK_IdInstanciaTramite " +
                "VALUES ('" + text + "', " + idInstanciaTramite +") " +
            "END"

        )
    });
}