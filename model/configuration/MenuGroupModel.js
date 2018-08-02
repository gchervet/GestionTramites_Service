var sql = require('mssql');
var config = require('../../config/db-configuration.json')


exports.GetAll = function() {
  console.log('MenuGroup/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("exec SP_MenuGroup_Menu_Permission_GetAll")
  });

}

exports.GetById = function(idMenu) {
  console.log('MenuGroup/GetById');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from Menu where IdMenu = ' + idMenu)
  });


}

exports.GetMenuPermissionByMenuId = function(idMenu) {
  console.log('MenuGroup/GetMenuPermissionByMenuId');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from MenuPermission where IdMenu = ' + idMenu)
  });

}