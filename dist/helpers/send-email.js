"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (name, email, token) => {
    let transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // send mail with defined transport object
    var mailGenerator = new mailgen_1.default({
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
            intro: "Welcome to Protfolio Maker ! We're very excited to have you on board.",
            action: {
                instructions: 'To get started with Protfolio Maker, please click here:',
                button: {
                    color: '#22BC66',
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
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Verification',
        html: emailBody,
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=send-email.js.map