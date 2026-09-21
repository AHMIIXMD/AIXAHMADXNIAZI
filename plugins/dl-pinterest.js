// ✅ Coded by AHMAD TechX for AHMAD MD

import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Pinterest download karne ke liye
// ==========================================
async function downloadPinterest(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) return await reply("📌 *Please provide a Pinterest URL*");

        // Validate Pinterest URL
        if (!q.includes('pinterest.com') && !q.includes('pin.it')) {
            return await reply("❌ *Invalid Pinterest URL!*\n\nPlease provide a valid Pinterest URL starting with 'pinterest.com' or 'pin.it'");
        }

        // Send processing react
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        // 🎬 Fetch from Pinterest API
        const apiUrl = `https://jawad-tech.vercel.app/download/pinterest?url=${encodeURIComponent(q)}`;
        const res = await axios.get(apiUrl);
        const data = res.data;

        if (!data?.status || !data?.result?.url) {
            return await reply("❌ *Failed to download!*\n\nCould not fetch media from Pinterest. Please check the URL and try again.");
        }

        const pinData = data.result;
        const isVideo = pinData.type === 'video';

        // 📌 Send media with stylish caption
        const caption = `╭━━━〔 *AHMAD-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *PINS DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━❐━⪼
┇๏ *Title:* ${pinData.title || 'No Title'}
┇๏ *Type:* ${isVideo ? 'Video' : 'Image'}
┇๏ *Platform:* Pinterest
┇๏ *Quality:* HD Ultra
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ AHMADX-Aɪ ♡*`;

        if (isVideo) {
            // Send video as document
            await conn.sendMessage(from, {
                document: { url: pinData.url },
                fileName: `Pinterest Video.mp4`,
                mimetype: 'video/mp4',
                caption: caption
            }, { quoted: mek });
        } else {
            // Send image as document
            await conn.sendMessage(from, {
                document: { url: pinData.url },
                fileName: `Pinterest Image.jpg`,
                mimetype: 'image/jpeg',
                caption: caption
            }, { quoted: mek });
        }

        // ✅ React success
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("❌ Error in .pinterest:", e);
        await reply("⚠️ *Something went wrong!*\n\nPlease try again with a different Pinterest URL.");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.pinterest, .pin, .pindl)
// ==========================================
cmd({
    pattern: "pinterest",
    alias: ["pin", "pindl"],
    desc: "Download Pinterest videos/images",
    category: "download",
    react: "📌",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadPinterest(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (pinterest, pin, pindl)
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

        // Pinterest triggers (bina prefix)
        const pinTriggers = ["pinterest", "pin", "pindl"];

        // Check: kya pehla word trigger hai?
        if (!pinTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Pinterest download karo
        await downloadPinterest(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Pinterest No-Prefix Error:", error);
    }
});
