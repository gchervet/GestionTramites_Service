var fileManager = require('../../model/external/fileManager.js');

module.exports.GetList = function(req, res){
    return fileManager.GetList(req.body.path).then(function(result, $filter){
        var rtn = result;
        res.json(result);
    })
    .catch(function (err) {
        var rtn = err.message;
        res.json(rtn);
    });
}

module.exports.Rename = fileManager.Rename;

module.exports.CreateFolder = function(req, res){
    return fileManager.CreateFolder(req.body.newPath).then(function(result, $filter){
        var rtn = result;
        res.json(result);
    })
    .catch(function (err) {
        var rtn = err.message;
        res.json(rtn);
    });
}

module.exports.Move = fileManager.Move;

module.exports.Copy = fileManager.Copy;

module.exports.Remove = fileManager.Remove;

module.exports.GetContent = fileManager.GetContent;

module.exports.Compress = fileManager.Compress;

module.exports.Extract = fileManager.Extract;

module.exports.Download = fileManager.Download;

module.exports.Edit = fileManager.Edit;

module.exports.ChangePermissions = fileManager.ChangePermissions;