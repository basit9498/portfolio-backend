import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const sendMail = async (name: string, email: string, token: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Mailgen',
      link: 'https://mailgen.js/',
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  const emailTemplate = {
    body: {
      title: 'Portfolio Maker',
      name: name,
      intro:
        "Welcome to Protfolio Maker ! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Protfolio Maker, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `${process.env.HOST_NAME}/auth/verify?token=${token}`,
        },
      },
      outro: 'Need help, or have questions? Please contact customer line',
      greeting: 'Dear',
      signature: 'Sincerely',
    },
  };

  const emailBody = mailGenerator.generate(emailTemplate);

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: 'Account Verification', // Subject line
    html: emailBody,
  });
};
