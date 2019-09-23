const nodemailer = require("nodemailer");

exports.sendInviteLinkMail = async (toEmail, inviteUrl, groupName) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: toEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href='${inviteUrl}'>This is the link to join in the group ${groupName}</a>` // html body
  });

  console.log(info);
};
