import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Girl DP URLs Array
const girlDpUrls = [
    'https://files.catbox.moe/yrv3t8.jpg',
    'https://files.catbox.moe/mgxcmh.jpg',
    'https://files.catbox.moe/p7bs.jpg',
    'https://files.catbox.moe/ct3x5i.jpg',
    'https://files.catbox.moe/i32r8e.jpg',
    'https://files.catbox.moe/9vx3oh.jpg',
    'https://files.catbox.moe/tvy3fg.jpg',
    'https://files.catbox.moe/wt1017.jpg',
    'https://files.catbox.moe/3fklx4.jpg',
    'https://files.catbox.moe/blfy4i.jpg',
    'https://files.catbox.moe/kafz5k.jpg',
    'https://files.catbox.moe/rrb30k.jpg',
    'https://files.catbox.moe/5vb4n9.jpg',
    'https://files.catbox.moe/57p7bs.jpg',
    'https://files.catbox.moe/6f6qob.jpg',
    'https://files.catbox.moe/48itao.jpg',
    'https://files.catbox.moe/dsqk27.jpg',
    'https://files.catbox.moe/1uygix.jpg',
    'https://files.catbox.moe/80r3n0.jpg',
    'https://files.catbox.moe/ieyqak.jpg',
    'https://files.catbox.moe/c9bi22.webp',
    'https://files.catbox.moe/a0vrdt.jpg'
];

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// Helper to get mimetype
function getMime(url) {
    return url.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
}

// ==========================================
// 🔧 Common function — random girl DP bhejne ke liye
// ==========================================
async function sendRandomGirlDP(conn, mek, m, { from, reply }) {
    try {
        // Random URL pick karo
        const randomUrl = girlDpUrls[Math.floor(Math.random() * girlDpUrls.length)];

        await conn.sendMessage(from, {
            image: { url: randomUrl },
            mimetype: getMime(randomUrl),
            caption: caption
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in girldp command:", e);
        await reply("Failed to send image. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.girldp, .gdp)
// ==========================================
cmd({
    pattern: "girldp",
    alias: ["gdp", "girlpic"],
    desc: "Send random girl DP",
    category: "girldp",
    react: "🌸",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await sendRandomGirlDP(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (girldp, gdp, girlpic)
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

        // Girl DP triggers (bina prefix)
        const triggers = ["girldp", "gdp", "girlpic"];

        // Check: exact match?
        if (!triggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Random image bhejo
        await sendRandomGirlDP(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("GirlDP No-Prefix Error:", error);
    }
});
