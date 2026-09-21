import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Technologia audio bhejne ke liye
// ==========================================
async function sendTechnologia(conn, mek, m, { from, reply }) {
    try {
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/fac856.mp3" },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("*❌ Technologia Failed!*\n_Blyat! Error: " + e.message + "_");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.technologia, .tech, .technologyia)
// ==========================================
cmd({
    pattern: "technologia",
    alias: ["tech", "technologyia"],
    desc: "Send the Technologia meme audio",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await sendTechnologia(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (technologia, tech, technologyia)
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

        // Technologia triggers (bina prefix)
        const technologiaTriggers = ["technologia", "tech", "technologyia"];

        // Check: exact match?
        if (!technologiaTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Audio bhejo
        await sendTechnologia(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Technologia No-Prefix Error:", error);
    }
});
