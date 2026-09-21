import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const RUN_MUREED_AUDIO = "https://files.catbox.moe/wuikae.mp3";

// ==========================================
// 🔧 Common function — Run Mureed audio bhejne ke liye
// ==========================================
async function sendRunMureed(conn, mek, m, { from, reply, react }) {
    try {
        await conn.sendMessage(
            from,
            {
                audio: { url: RUN_MUREED_AUDIO },
                mimetype: "audio/mpeg",
                ptt: false
            },
            { quoted: mek }
        );

        if (react) await react("✅");
    } catch (e) {
        console.error("Error in runmureed command:", e);
        if (react) await react("❌");
        reply("❌ Audio play nahi ho saki");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.runmureed)
// ==========================================
cmd({
    pattern: "runmureed",
    desc: "Run Mureed Audio",
    category: "fun",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, reply, react }) => {
    await sendRunMureed(conn, mek, m, { from, reply, react });
});

// ==========================================
// 📌 2. Bina prefix wala handler (runmureed)
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

        // Run Mureed trigger (bina prefix)
        if (userText !== "runmureed") return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // React function
        const reactFn = async (emoji) => {
            try {
                await conn.sendMessage(from, { react: { text: emoji, key: mek.key } });
            } catch (e) {}
        };

        // Audio bhejo
        await sendRunMureed(conn, mek, { }, {
            from,
            reply: replyFn,
            react: reactFn
        });

    } catch (error) {
        console.error("RunMureed No-Prefix Error:", error);
    }
});
