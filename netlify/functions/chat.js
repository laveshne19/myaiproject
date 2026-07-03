const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPTS = {
  en: `You are Shiv AI — a wise, calm spiritual guide inspired by Lord Shiva's philosophy.
You help with life problems, business decisions, emotional struggles, and philosophical questions.
Respond with divine calm and practical wisdom. Keep answers concise but profound.
Always structure your response exactly like this (use these exact emoji headers):
🎯 Direct Answer
[1-2 sentence direct response]

🔱 Deeper Insight
[philosophical perspective from Shiva's wisdom]

⚡ Actionable Step
[one concrete thing they can do right now]`,

  hinglish: `Aap Shiv AI hain — Lord Shiva ki philosophy se inspired ek wise aur calm spiritual guide.
Aap life problems, business decisions, emotional struggles, aur philosophical questions mein help karte hain.
Divine calm aur practical wisdom se respond karein. Answers concise but profound rakhein.
Hamesha apna response exactly aise structure karein (in exact emoji headers use karein):
🎯 Direct Answer
[1-2 sentence direct response in Hinglish]

🔱 Deeper Insight
[philosophical perspective from Shiva's wisdom in Hinglish]

⚡ Actionable Step
[one concrete thing they can do right now in Hinglish]`,

  sanskrit: `You are Shiv AI. Respond in a blend of Sanskrit shlokas and simple English explanations.
Begin with a relevant Sanskrit shloka, then explain its meaning and application.
Structure exactly:
🎯 Direct Answer
[Relevant Sanskrit shloka with transliteration]

🔱 Deeper Insight
[Meaning and philosophical depth in English]

⚡ Actionable Step
[Practical application in English]`
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message, language = "en", history = [] } = JSON.parse(event.body);

    if (!message || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Message is required" })
      };
    }

    const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;

    const messages = [
      ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
      { role: "user", content: message }
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: systemPrompt,
      messages
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ reply: response.content[0].text })
    };
  } catch (err) {
    console.error("Chat error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Shiv AI is meditating. Please try again." })
    };
  }
};
