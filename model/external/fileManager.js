var rp = require('request-promise-native');
var fs = require('fs');
var Promise = require('bluebird');
//var fileManagerPath = 'http://localhost:8085/angular-filemanager/bridges/php-local/index.php';
var fileManagerPath = 'http://10.1.0.108:80/angular-filemanager/bridges/php-local/index.php';
//var fileManagerPath = 'http://10.9.0.111:8085/TEST_Client/angular-filemanager/';

var post = function (param, res) {
  var options = {
    method: 'POST',
    uri: fileManagerPath,
    body: param,
    json: true // Automatically stringifies the body to JSON
  };

  rp.post(options)
    .then(result => {
      var rtn = result;
      res.json(result);
    })
    .catch(function (err) {
      var rtn = err.message;
      res.json(rtn);
    });
}

var postParam = function (param) {
  var options = {
    method: 'POST',
    uri: fileManagerPath,
    body: param,
    json: true // Automatically stringifies the body to JSON
  };

  return rp.post(options);
}

module.exports.GetList = function (path) {
  var param = {
    "action": "list",
    "path": path
  };

  return postParam(param);
}

module.exports.Rename = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "rename",
    "item": payload.path,
    "newItemPath": payload.newItemPath
  };

  return post(param, res);
}

module.exports.Upload = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "createFolder",
    "newPath": payload.newPath
  };

  return post(param, res);
}

module.exports.CreateFolder = function (newPath) {
  var param = {
    "action": "createFolder",
    "newPath": newPath
  };

  return postParam(param);
}

module.exports.Move = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "move",
    "items": payload.items,
    "newPath": payload.newPath
  };

  return post(param, res);
}

module.exports.Copy = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "copy",
    "items": payload.items,
    "newPath": payload.newPath
  };

  return post(param, res);
}

module.exports.Remove = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "remove",
    "items": payload.items,
  };

  return post(param, res);
}

module.exports.GetContent = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "getContent",
    "item": payload.item,
  };

  return post(param, res);
}

module.exports.Compress = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "compress",
    "items": payload.items,
    "destination": payload.destination,
    "compressedFilename": payload.compressedFilename
  };

  return post(param, res);
}

module.exports.Extract = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "extract",
    "destination": payload.destination,
    "item": payload.item,
    "folderName": payload.folderName
  };

  return post(param, res);
}

module.exports.Download = function (req, res) {
  var query = req._parsedUrl.query;

  var url = fileManagerPath + "?action=download&" + query;

  res.redirect(url);
}

module.exports.Edit = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "edit",
    "item": payload.item,
    "content": payload.content
  };

  return post(param, res);
}

module.exports.ChangePermissions = function (req, res) {
  var payload = req.body;

  var param = {
    "action": "changePermissions",
    "items": payload.items,
    "perms": payload.perms,
    "permsCode": payload.permsCode,
    "recursive": payload.recursive
  };

  return post(param, res);
}

module.exports.Upload = function (file, directory, fileName) {
  return new Promise(function (resolve, reject) {
    resolve(true);
  });
}