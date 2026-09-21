import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — CapCut template download
// ==========================================
async function downloadCapcut(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) {
            return await reply("🎬 *Please provide a CapCut template link*");
        }

        await reply("*⏳ Fetching CapCut template, please wait...*");

        const apiUrl = `https://api.deline.web.id/downloader/capcut?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || data.result.error) {
            return await reply("❌ Failed to fetch CapCut template.");
        }

        const result = data.result;

        // Prefer No Watermark > HD No Watermark
        let media =
            result.medias.find(v => v.quality === "No Watermark") ||
            result.medias.find(v => v.quality.includes("No Watermark")) ||
            result.medias[0];

        const caption = `🎬 *CapCut Template Downloaded*

📌 *Title:* ${result.title}
👤 *Author:* ${result.author}
⏱ *Duration:* ${Math.floor(result.duration / 1000)}s
🎞 *Quality:* ${media.quality}

✨ Powered By AHMAD Tech`;

        await conn.sendMessage(
            from,
            {
                video: { url: media.url },
                caption
            },
            { quoted: mek }
        );

    } catch (err) {
        console.error("CAPCUT ERROR:", err);
        await reply("❌ Error downloading CapCut template. Try again later.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.capcut)
// ==========================================
cmd({
    pattern: "capcut",
    desc: "Download CapCut templates",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadCapcut(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (capcut)
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

        // CapCut trigger (bina prefix)
        if (firstWord !== "capcut") return;

        // Baaki text (CapCut link)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // CapCut download karo
        await downloadCapcut(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("CapCut No-Prefix Error:", error);
    }
});
