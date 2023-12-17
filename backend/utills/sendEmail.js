const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{

    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })
    console.log(options.to)
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.to,
        subject:`${options.subject}`,
        text:options.message
    }
    console.log(mailOptions)
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;