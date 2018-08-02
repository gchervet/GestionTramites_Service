var fileManager = require('../../service/external/fileManager.js');

// External-controller routes
secureRoutes.post('/FileManager/GetList', fileManager.GetList);
secureRoutes.post('/FileManager/Rename', fileManager.Rename);
secureRoutes.post('/FileManager/CreateFolder', fileManager.CreateFolder);
secureRoutes.post('/FileManager/Move', fileManager.Move);
secureRoutes.post('/FileManager/Copy', fileManager.Copy);
secureRoutes.post('/FileManager/Remove', fileManager.Remove);
secureRoutes.post('/FileManager/GetContent', fileManager.GetContent);
secureRoutes.post('/FileManager/Compress', fileManager.Compress);
secureRoutes.post('/FileManager/Extract', fileManager.Extract);
secureRoutes.get('/FileManager/Download', fileManager.Download);
secureRoutes.post('/FileManager/Edit', fileManager.Edit);
secureRoutes.post('/FileManager/ChangePermissions', fileManager.ChangePermissions);