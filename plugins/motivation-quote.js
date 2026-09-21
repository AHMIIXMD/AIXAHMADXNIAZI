import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — motivational quote fetch karne ke liye
// ==========================================
async function getMotivationalQuote(conn, mek, m, { from, reply }) {
    try {
        const apiUrl = 'https://apis.davidcyriltech.my.id/random/quotes';

        const { data } = await axios.get(apiUrl);

        if (!data.success || !data.response) {
            return reply("❌ Couldn't fetch a quote at the moment. Try again later!");
        }

        const quoteMessage = `
✨ *Motivational Quote* ✨

"${data.response.quote}"

_— ${data.response.author}_

_Provided by AHMAD TechXD_
`.trim();

        await reply(quoteMessage);

    } catch (error) {
        console.error('Motivation Error:', error);
        reply("❌ Failed to fetch a motivational quote. Please try again later.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.motivate, .motivation, .inspire)
// ==========================================
cmd({
    pattern: "motivate",
    alias: ["motivation", "inspire"],
    desc: "Get a random motivational quote",
    react: "💪",
    category: "fun",
    use: '.motivate',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getMotivationalQuote(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (motivate, motivation, inspire)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Motivate triggers (bina prefix)
        const motivateTriggers = ["motivate", "motivation", "inspire"];

        // Check: exact match?
        if (!motivateTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Quote fetch karo
        await getMotivationalQuote(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Motivate No-Prefix Error:", error);
    }
});
