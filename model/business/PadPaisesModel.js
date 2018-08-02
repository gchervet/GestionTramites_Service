var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetAll = function() {
  console.log('PadPaises/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from padPaises')
  });

}