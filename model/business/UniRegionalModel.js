var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetAll = function() {
  console.log('UniRegional/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from uniRegionales')
  });

}