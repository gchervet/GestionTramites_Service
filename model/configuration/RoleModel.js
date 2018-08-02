var sql = require('mssql');
var config = require('../../config/db-configuration.json')

exports.GetRolePermissionByUsername = function(username) {
  console.log('Role/GetRolePermissionByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("EXEC SP_Get_PermissionByUsername '"+ username + "'");
  });
}
