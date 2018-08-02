var TraInstanciaTramiteService = require('../../service/business/TraInstanciaTramiteService.js');

// Notification routes
app.get('/api/Notification/ShowNotification/:name/:body', function (req) {
    io.emit(req.params.name, req.params.body);
    return true;
});

/*

DECLARE @obj INT
DECLARE @return INT
DECLARE @sUrl VARCHAR(200)
DECLARE @response VARCHAR(8000)
DECLARE @hr INT
DECLARE @src VARCHAR(255)
DECLARE @desc VARCHAR(255)

SET @sUrl = 'http://10.9.0.112:9000/api/notification/showNotification/notificationTest/%7B%22name%3A%22ABC%22,%22id%22%3A%221%22%7D' -- WEB SERVICE URL

EXEC sp_OACreate 'MSXML2.ServerXMLHttp', @obj OUT
EXEC sp_OAMethod @obj, 'Open', NULL, 'GET', @sUrl, false
EXEC sp_OAMethod @obj, 'send'
EXEC sp_OAGetProperty @obj, 'responseText', @response OUT

SELECT @response [response]
EXEC sp_OADestroy

*/