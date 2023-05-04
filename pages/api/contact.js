import nodemailer from 'nodemailer';
const { ADMIN_EMAIL } = process.env;

const handler = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const { from, subject, message } = req.body;
  const msg = {
    to: from,
    from: ADMIN_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };
  console.log(msg);
  try {
    let info = await transporter.sendMail(msg);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(201).json({ message: 'Email Sent', id: info.messageId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default handler