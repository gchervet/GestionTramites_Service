var sql = require('mssql');
var config = require('../../config/db-configuration.json')

exports.ValidateIfTokenAndUserAreLoggedIn = function(data) {
  console.log('SessionToken/ValidateIfTokenAndUserAreLoggedIn');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT Username, ExpirationDate = (SELECT DATEADD(mi, DATEDIFF(mi, GETDATE(), GETUTCDATE()), max(ExpirationDate))) , Expired FROM SessionToken where username = '" + data.username + "'  GROUP BY Username, Expired")
  });
}

exports.DeleteTokenLogically = function(data){
  console.log('SessionToken/DeleteTokenLogically');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("UPDATE SessionToken SET Expired = true where username = '" + data.username + "' and SessionToken = '" + data.token + "'")
  });
}

exports.CreateNewSessionToken = function(data){
  console.log('SessionToken/CreateNewSessionToken');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("INSERT INTO SessionToken values ('"+ data.username +"','"+ data.token + "',getdate(),DATEADD(ss," + data.expireSeconds + ",getdate()),0)")
  });
}

exports.ValidateAuthentication = function(username, sessionToken){
  console.log('SessionToken/ValidateAuthentication');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT [Username] " +
                                ",[SessionToken] " +
                                ",[CreationDate] " +
                                ",[ExpirationDate] " +
                                ",[Expired] " +
                                "FROM [SessionToken] " +
                                "where sessiontoken = '" + sessionToken + "' " +
                                "and username = '" + username + "' " +
                                "and expired = 0 ")
  });
}

exports.ExpireToken = function(username, sessionToken){
  console.log('SessionToken/ExpireToken');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("Update [SessionToken] set expired = 1 " +
                                "where sessiontoken = '" + sessionToken + "' ")
  });
}