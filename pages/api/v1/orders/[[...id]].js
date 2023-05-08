const {
  ADMIN_EMAIL,
  SENDGRID_API_KEY
} = process.env;

const handler = async (req, res) => {
    res.status(200).end();
}

export default handler;