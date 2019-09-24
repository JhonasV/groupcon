const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const emailInviteTemplate = require("./emailTemplates/emailInviteTemplate");
exports.sendInviteLinkMail = async (toEmail, inviteUrl, groupName) => {
  let transporter = await nodemailer.createTransport({
    host: keys.NODEMAILER_AUTH.HOST,
    port: keys.NODEMAILER_AUTH.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: keys.NODEMAILER_AUTH.EMAIL_AUTH.email, // generated ethereal user
      pass: keys.NODEMAILER_AUTH.EMAIL_AUTH.password // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: `"GroupCon 👻" <${keys.NODEMAILER_AUTH.EMAIL_AUTH.email}>`, // sender address
    to: toEmail, // list of receivers
    subject: `GroupCon invite to ${groupName} ✔`, // Subject line
    text: "", // plain text body
    html: emailInviteTemplate(groupName, inviteUrl) // html body
  });
};
