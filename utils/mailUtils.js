const transporter = require("../config/mailConfig");

const sendMail = async ({
  from,
  to,
  subject,
  text,
  html,
  attachments,
  alternatives,
}) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
    alternatives,
  });
};

const welcomeMail = async ({ from, to, user, alternatives, html }) => {
  await sendMail({
    from,
    to,
    subject: `Verification email to ${user.firstName} ${user.lastName}`,
    text: `${user.firstName} ${user.lastName} welcome to masai`,
    html,
    alternatives,
  });
};

module.exports = {
  sendMail,
  welcomeMail,
};
