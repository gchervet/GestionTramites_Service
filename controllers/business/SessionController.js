var SessionService = require('../../service/configuration/SessionService.js');
var jwt = require('jsonwebtoken');

//Service Routes
app.post('/api/authenticate', SessionService.Authenticate);
app.post('/api/ValidateAuthentication', SessionService.ValidateAuthentication);
app.post('/api/ValidateAdminAuthentication', SessionService.ValidateAdminAuthentication);
app.post('/api/ExpireToken', SessionService.ExpireToken);