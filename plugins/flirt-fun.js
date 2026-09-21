import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random flirty message fetch karne ke liye
// ==========================================
async function getFlirtMessage(conn, mek, m, { from, reply }) {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo';

        const { data } = await axios.get(apiUrl);

        if (!data.result) {
            return reply("❌ Couldn't fetch a flirty message. Try again later!");
        }

        const flirtMessage = `${data.result}`.trim();

        await reply(flirtMessage);

    } catch (error) {
        console.error('Flirt Error:', error);
        reply("❌ Failed to fetch a flirty message. Maybe try being romantic yourself?");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.flirt, .line)
// ==========================================
cmd({
    pattern: "flirt",
    alias: ["line"],
    desc: "Get a random flirty message",
    react: "😘",
    category: "fun",
    use: '.flirt',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getFlirtMessage(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (flirt, line)
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

        // Flirt triggers (bina prefix)
        const flirtTriggers = ["flirt", "line"];

        // Check: exact match?
        if (!flirtTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Flirt message fetch karo
        await getFlirtMessage(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Flirt No-Prefix Error:", error);
    }
});
