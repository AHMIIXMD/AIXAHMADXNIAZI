import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random fuck image bhejne ke liye
// ==========================================
async function sendFuckImage(conn, mek, m, { from, reply }) {
    try {
        // Image URLs Array
        const imageUrls = [
            'https://files.catbox.moe/yvdjgo.jpg',
            'https://files.catbox.moe/e14pbn.jpg',
            'https://files.catbox.moe/ia9ion.jpg',
            'https://files.catbox.moe/6pe09u.jpg',
            'https://files.catbox.moe/gxpah0.jpg',
            'https://files.catbox.moe/fj5kyr.jpg',
            'https://files.catbox.moe/jr3q6o.jpg',
            'https://files.catbox.moe/wuc1uh.jpg',
            'https://files.catbox.moe/0a7c2a.jpg',
            'https://files.catbox.moe/ojbqal.jpg'
        ];

        // Random image pick
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        // Send image
        await conn.sendMessage(from, {
            image: { url: randomImage },
            caption: "*_FUCK YOU BABY 🍼🥵_*"
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in fuck command:", e);
        await reply("Oops, something went wrong!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.🖕 aur .fuck)
// ==========================================
cmd({
    pattern: "🖕",
    alias: ["fuck"],
    desc: "Send a random fuck reaction image",
    category: "fun",
    react: "🥵",
    filename: __filename,
    use: "🖕"
}, async (conn, mek, m, { from, reply }) => {
    await sendFuckImage(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (🖕 aur fuck)
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
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Triggers (bina prefix)
        const fuckTriggers = ["🖕", "fuck"];

        // Exact match check
        const normalizedText = userText.toLowerCase();
        const matched = fuckTriggers.some(t => t === normalizedText || t === userText);

        if (!matched) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Image bhejo
        await sendFuckImage(conn, mek, { }, { from, reply: replyFn });

    } catch (error) {
        console.error("Fuck No-Prefix Error:", error);
    }
});
