var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetTransactionWithoutHashClaveList = function () {
    console.log('Paypertic/GetTransactionWithoutHashClaveList');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select Clave from CtaPagoOnlineTransacciones where IdTransaccionPagoOnline=''")
    });
}

exports.UpdateLocalHash = function (claveKennedy, hashPPT) {
    console.log('Paypertic/UpdateLocalHash');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("UPDATE CtaPagoOnlineTransacciones SET IdTransaccionPagoOnline = '" + hashPPT + "' WHERE Clave = " + claveKennedy);
    });
}