var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'alumnos-kennedy-edu-ar.mail.protection.outlook.com',
    port: 25, // Gmail Port
    //auth: {
    //    user: account.user, // Gmail id
    //    pass: account.pass  // Gmail password
    //}
});


var mailOptions = {
from: 'gchervet@kennedy.edu.ar', // sender address
to: 'gblumberg@kennedy.edu.ar, mdmartini@kennedy.edu.ar, DRuggirello@kennedy.edu.ar', // list of receivers
subject: 'Ruggi hacker',
text: 'That was easy!',
//html:  // html body
};

// send mail with defined transport object

transporter.sendMail(mailOptions, function(error, info){
if(error){
    return console.log(error);
}
console.log('Message sent: ' + info.response);
});