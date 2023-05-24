import sgMail from '@sendgrid/mail';
const {
  ADMIN_EMAIL,
  SENDGRID_API_KEY
} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const handler = async (req, res) => {
  const {
    from,
    subject,
    message
  } = req.body;
  const msg = {
    to: from,
    cc: ADMIN_EMAIL,
    from: ADMIN_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`
  };

  try {
    await sgMail.send(msg);
    res.status(200).end();
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
    res.status(500).json(error);
  }
  
}

export default handler;