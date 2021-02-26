require('dotenv').config();
import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-handlebars';

// console.log('MAILER_HOST    => ', process.env.MAIL_HOST)
// console.log('MAILER_PORT    => ', process.env.MAIL_PORT)
// console.log('MAILER_USER    => ', process.env.MAIL_USERNAME)
// console.log('MAILER_PASS    => ', process.env.MAIL_PASSWORD)

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

transport.use('compile', hbs({
  // viewPath: path.resolve('../../views/'),
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "../../views"),
    defaultLayout: false        // <-----   added this
  },
  viewPath: path.resolve(__dirname, "../../views"),
  extName: ".handlebars"
}));

export async function sendEmail(userEmail, admEmail, subjectText, template, context, attachments=[]) {
  console.log('SEND EMAIL')
  console.log(
    "sendEmail: ",
    userEmail,
    admEmail,
    subjectText,
    template,
    context
  );

  return new Promise((resolve, reject) => {

    transport.sendMail(
      {
        to: userEmail,
        from: admEmail,
        subject: subjectText,
        attachDataUrls: true,
        template: template,
        context,
        attachments
      },
      (error) => {
        console.log("Error: ", error);
        if (error) {
          reject({ok: false, error});
        } else {
          resolve({ok: true, message: 'Email sent'})
        }
      }
    );

  });
  
}


export default transport;