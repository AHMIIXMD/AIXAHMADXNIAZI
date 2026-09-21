import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random shayari fetch karne ke liye
// ==========================================
async function getRandomShayari(conn, mek, m, { from, reply }) {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo';

        const { data } = await axios.get(apiUrl);

        if (!data.result) {
            return reply("❌ Shayari dil mein nahi aayi, phir try karo!");
        }

        const shayariMessage = `${data.result}`.trim();

        await reply(shayariMessage);

    } catch (error) {
        console.error('Shayari Error:', error);
        reply("❌ Aaj dil mein shayari nahi hai... Kal try karna!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.shayari, .shayar, .poetry)
// ==========================================
cmd({
    pattern: "shayari",
    alias: ["shayar", "poetry"],
    desc: "Get a random romantic shayari",
    react: "💖",
    category: "fun",
    use: '.shayari',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getRandomShayari(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (shayari, shayar, poetry)
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

        // Shayari triggers (bina prefix)
        const shayariTriggers = ["shayari", "shayar", "poetry"];

        // Check: exact match?
        if (!shayariTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Shayari fetch karo
        await getRandomShayari(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Shayari No-Prefix Error:", error);
    }
});
