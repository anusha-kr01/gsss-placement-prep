const askBtn = document.getElementById("askBtn");
const userInput = document.getElementById("userInput");
const responseArea = document.getElementById("responseArea");

const GEMINI_API_KEY = import.meta.env.API_KEY; 



askBtn.addEventListener("click", async () => {
  const prompt = userInput.value.trim();
  if (!prompt) return;

  responseArea.innerHTML = "⏳ Gemini is thinking...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a placement preparation AI mentor. A student asks: ${prompt}` }]
          }]
        })
      }
    );

    const data = await response.json();
    console.log("Full Gemini Response:", data);

    if (data?.candidates?.length > 0 && data.candidates[0].content.parts.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      responseArea.innerHTML = `<strong>Gemini says:</strong><br><pre>${reply}</pre>`;
    } else {
      const reason = data?.promptFeedback?.blockReason || "No reason given";
      responseArea.innerHTML = `❌ No valid response from Gemini.<br>🔍 Reason: ${reason}`;
    }

  } catch (err) {
    console.error("Gemini API Error:", err);
    responseArea.innerHTML = "❌ Network or API Error. Check Console.";
  }
});