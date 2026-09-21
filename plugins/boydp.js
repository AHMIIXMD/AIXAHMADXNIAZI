import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Boy DP URLs Array
const boyDpUrls = [
    'https://files.catbox.moe/y1l7ed.jpg',
    'https://files.catbox.moe/4kujce.jpg',
    'https://files.catbox.moe/vrrn72.jpg',
    'https://files.catbox.moe/7w87wk.jpg',
    'https://files.catbox.moe/jf7cwz.jpg',
    'https://files.catbox.moe/gc3c1g.jpg',
    'https://files.catbox.moe/nufhim.jpg',
    'https://files.catbox.moe/yfce44.jpg',
    'https://files.catbox.moe/gdhv0h.jpg',
    'https://files.catbox.moe/ptwcm0.jpg',
    'https://files.catbox.moe/3upyka.jpg',
    'https://files.catbox.moe/erj2f8.jpg',
    'https://files.catbox.moe/g50vs5.jpg',
    'https://files.catbox.moe/1jta5y.jpg',
    'https://files.catbox.moe/siph10.jpg',
    'https://files.catbox.moe/mxlbfq.jpg',
    'https://files.catbox.moe/3aqy6x.jpg',
    'https://files.catbox.moe/0qvy21.jpg',
    'https://files.catbox.moe/szdoa0.jpg',
    'https://files.catbox.moe/3upyka.jpg',
    'https://files.catbox.moe/jadoal.jpg',
    'https://files.catbox.moe/yfce44.jpg'
];

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// ==========================================
// 🔧 Common function — random boy DP bhejne ke liye
// ==========================================
async function sendRandomBoyDP(conn, mek, m, { from, reply }) {
    try {
        // Random URL pick karo
        const randomUrl = boyDpUrls[Math.floor(Math.random() * boyDpUrls.length)];

        await conn.sendMessage(from, {
            image: { url: randomUrl },
            mimetype: 'image/jpeg',
            caption
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in boydp command:", e);
        await reply("Failed to send image.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.boydp)
// ==========================================
cmd({
    pattern: "boydp",
    alias: ["bdp", "boypic"],
    desc: "Send random boy DP",
    category: "boydp",
    react: "👦",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await sendRandomBoyDP(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (boydp)
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

        // Triggers (bina prefix)
        const triggers = ["boydp", "bdp", "boypic"];

        // Check: exact match?
        if (!triggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Random image bhejo
        await sendRandomBoyDP(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("BoyDP No-Prefix Error:", error);
    }
});
