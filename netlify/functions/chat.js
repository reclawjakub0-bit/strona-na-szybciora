
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
          contents: [{ parts: [{ text:
            "Jesteś Szybcior AI. Odpowiadasz po polsku jako asystent firmy tworzącej strony internetowe. Pytanie klienta: " + message
          }]}]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Brak odpowiedzi.";
    return { statusCode: 200, body: JSON.stringify({ reply: text }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ reply: "Błąd połączenia z AI." }) };
  }
};
