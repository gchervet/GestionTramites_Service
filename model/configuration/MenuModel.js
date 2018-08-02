var sql = require('mssql');
var config = require('../../config/db-configuration.json')

exports.GetAll = function() {
  console.log('Menu/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('exec SP_MenuGroup_Menu_Permission_GetAll')
  });

}