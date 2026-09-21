import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random quote fetch karne ke liye
// ==========================================
async function getRandomQuote(conn, mek, m, { from, reply }) {
    try {
        const response = await axios.get("https://api.quotable.io/random");
        const { content, author } = response.data;

        const message = `💬 *"${content}"*\n- ${author}\n\n> *QUOTES BY AHMAD MD*`;
        reply(message);
    } catch (error) {
        console.error("Error fetching quote:", error);
        reply("⚠️ API issue or coding error, please check the logs!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.quote, .quotes)
// ==========================================
cmd({
    pattern: "quote",
    alias: ["quotes", "inspiring"],
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
}, async (conn, m, store, { from, reply }) => {
    await getRandomQuote(conn, m, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (quote, quotes, inspiring)
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

        // Quote triggers (bina prefix)
        const quoteTriggers = ["quote", "quotes", "inspiring"];

        // Check: exact match?
        if (!quoteTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Quote fetch karo
        await getRandomQuote(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Quote No-Prefix Error:", error);
    }
});
