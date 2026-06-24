
exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body || "{}");
    const key = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.toString()
      })
    };
  }
};
