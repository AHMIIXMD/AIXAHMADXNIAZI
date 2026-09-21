import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Couple DP URLs Array
const coupleDpUrls = [
    'https://files.catbox.moe/b1o0kp.jpg',
    'https://files.catbox.moe/3ovw4e.jpg',
    'https://files.catbox.moe/ubg3fb.jpg',
    'https://files.catbox.moe/izlx32.jpg',
    'https://files.catbox.moe/6kvhkt.jpg',
    'https://files.catbox.moe/y0tkz9.jpg',
    'https://files.catbox.moe/nzbf1k.jpg',
    'https://files.catbox.moe/zuy3qn.jpg',
    'https://files.catbox.moe/z5qtah.jpg',
    'https://files.catbox.moe/6clonp.jpg',
    'https://files.catbox.moe/p83bjn.jpg',
    'https://files.catbox.moe/2bgvp8.jpg',
    'https://files.catbox.moe/g6c4i7.jpg',
    'https://files.catbox.moe/1h7n5a.jpg',
    'https://files.catbox.moe/k5458j.jpg',
    'https://files.catbox.moe/1l9cr3.jpg',
    'https://files.catbox.moe/ew0j67.jpg',
    'https://files.catbox.moe/pi0thx.jpg',
    'https://files.catbox.moe/msgvm8.jpg',
    'https://files.catbox.moe/s1vola.jpg',
    'https://files.catbox.moe/5x3sze.jpg',
    'https://files.catbox.moe/phe2wh.jpg'
];

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// ==========================================
// 🔧 Common function — random couple DP bhejne ke liye
// ==========================================
async function sendRandomCoupleDP(conn, mek, m, { from, reply }) {
    try {
        // Random URL pick karo
        const randomUrl = coupleDpUrls[Math.floor(Math.random() * coupleDpUrls.length)];

        await conn.sendMessage(from, {
            image: { url: randomUrl },
            mimetype: 'image/jpeg',
            caption: caption
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in coupledp command:", e);
        await reply("Failed to send image. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.coupledp, .cp)
// ==========================================
cmd({
    pattern: "coupledp",
    alias: ["cp", "couplepic"],
    desc: "Send random couple DP",
    category: "coupledp",
    react: "💑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await sendRandomCoupleDP(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (coupledp, cp, couplepic)
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
        const triggers = ["coupledp", "cp", "couplepic"];

        // Check: exact match?
        if (!triggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Random image bhejo
        await sendRandomCoupleDP(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("CoupleDP No-Prefix Error:", error);
    }
});
