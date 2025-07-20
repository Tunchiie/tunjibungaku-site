// Netlify Function to verify password
exports.handler = async (event) => {
  const { password } = JSON.parse(event.body || '{}');
  const correct = process.env.RESUME_GENERATOR_PASSWORD;

  if (password === correct) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false }),
  };
};
