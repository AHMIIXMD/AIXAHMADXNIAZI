import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Fallback quotes (API fail hone pe)
const FALLBACK_QUOTES = [
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
];

// ==========================================
// 🔧 Quote fetch function
// ==========================================
async function getRandomQuote(reply) {
    try {
        const { data } = await axios.get("https://api.quotable.io/random", { timeout: 5000 });
        return reply(`💬 *"${data.content}"*\n- ${data.author}\n\n> *QUOTES BY AHMAD MD*`);
    } catch (e) {
        console.error("Quote API error:", e.message);
        const q = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        return reply(`💬 *"${q.content}"*\n- ${q.author}\n\n> *QUOTES BY AHMAD MD*`);
    }
}

// ==========================================
// 📌 Prefix handler
// ==========================================
cmd({
    pattern: "quote",
    alias: ["quotes", "inspiring"],
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    await getRandomQuote(reply);
});

// ==========================================
// 📌 No-prefix handler
// ==========================================
cmd({ 'on': "body" }, async (conn, mek, store, {
    from, body, reply, prefix
}) => {
    try {
        // Prefix wale skip karo
        if (body && prefix && body.startsWith(prefix)) return;

        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        const triggers = ["quote", "quotes", "inspiring"];
        if (!triggers.includes(userText)) return;

        // Double execution guard
        if (mek._quoteHandled) return;
        mek._quoteHandled = true;

        await getRandomQuote(reply);

    } catch (error) {
        console.error("Quote No-Prefix Error:", error);
    }
});
