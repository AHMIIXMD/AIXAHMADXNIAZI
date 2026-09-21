import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Facebook video download
// ==========================================
async function downloadFacebook(conn, mek, m, { from, reply, args }) {
    try {
        const fbUrl = args[0];
        if (!fbUrl || !fbUrl.includes("facebook.com")) {
            return reply('❌ Please provide a valid Facebook video URL.\n\nExample:\n.fb4 https://facebook.com/...');
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(fbUrl)}`;
        const response = await axios.get(apiUrl);

        const data = response.data;

        if (!data.status || !data.result || !Array.isArray(data.result)) {
            return reply('❌ Unable to fetch the video. Please check the URL and try again.');
        }

        // Prefer HD, fallback to SD
        const hd = data.result.find(v => v.quality === "HD");
        const sd = data.result.find(v => v.quality === "SD");
        const video = hd || sd;

        if (!video) return reply("❌ Video not found in the response.");

        await reply(`Downloading video Please wait`);

        await conn.sendMessage(from, {
            video: { url: video.url },
            caption: `🎥 *Facebook Video Downloader*\n\n> Quality: ${video.quality}\n\n> Powered By AHMAD TechX 💜`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('FB4 Error:', error);
        reply('❌ Failed to download the video. Please try again later.');
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.fb, .facebook, .fbdl)
// ==========================================
cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    react: '📥',
    desc: "Download videos from Facebook (API v4)",
    category: "download",
    use: ".fb4 <Facebook video URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    await downloadFacebook(conn, mek, m, { from, reply, args });
});

// ==========================================
// 📌 2. Bina prefix wala handler (fb, facebook, fbdl)
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

        // Facebook triggers (bina prefix)
        const fbTriggers = ["fb", "facebook", "fbdl"];

        // Check: kya pehla word fb/facebook/fbdl hai?
        if (!fbTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Facebook video download karo
        await downloadFacebook(conn, mek, { }, {
            from,
            reply: replyFn,
            args: query.split(/\s+/)
        });

    } catch (error) {
        console.error("Facebook No-Prefix Error:", error);
    }
});
