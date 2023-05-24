export const sendEmail = async (vals) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset="UTF-8"',
      },
      body: JSON.stringify(vals),
    });
    if (!response.ok) throw response;
  } catch (err) {
    console.log(err);
  }
};
