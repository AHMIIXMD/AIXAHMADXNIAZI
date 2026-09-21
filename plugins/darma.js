import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — YouTube video download
// ==========================================
async function downloadDrama(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) {
            return reply("❌ Please send YouTube link\n\nExample:\n.drama https://youtu.be/dQw4w9WgXcQ");
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const api = `https://apis.prexzyvilla.site/download/youtube-video?url=${encodeURIComponent(q.trim())}`;

        const { data } = await axios.get(api);

        console.log("YT API RESPONSE:", data);

        if (!data || data.status === false) {
            return reply("❌ Video not found or API error");
        }

        const videoUrl =
            data.url ||
            data.result?.url ||
            data.download_url ||
            data.video;

        if (!videoUrl) {
            return reply("❌ Download link not found in API response");
        }

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `╔════════════╗\n📥 YOUTUBE VIDEO DOWNLOADER\n╚════════════╝\n\n🤖 𝆺𝅥𝆬𓍢ִ໋͙⋆𝘼𝙃𝙈𝘼𝘿 𝚫𝚰💸˚₊· ͟͟͞͞➳`,
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.log(e);
        reply("❌ Error downloading video");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.drama, .ytvideo, .video)
// ==========================================
cmd({
    pattern: "drama",
    alias: ["ytvideo", "video"],
    desc: "YouTube video downloader",
    category: "download",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadDrama(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (drama, ytvideo, video)
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

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Drama triggers (bina prefix)
        const dramaTriggers = ["drama", "ytvideo", "video"];

        // Check: kya pehla word trigger hai?
        if (!dramaTriggers.includes(firstWord)) return;

        // Baaki text (YouTube link)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Video download karo
        await downloadDrama(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Drama No-Prefix Error:", error);
    }
});
