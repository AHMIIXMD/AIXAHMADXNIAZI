import { cmd } from "../command.js";
import yts from "yt-search";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const API_CONFIG = {
    AUDIO_API: Buffer.from("aHR0cHM6Ly9hcGkubmV4cmF5LmV1LmNjL2Rvd25sb2FkZXIvc2F2ZXR1YmU/dXJsPQ==", "base64").toString()
};

/**
 * Normalizes YouTube URLs to a standard format
 */
function normalizeYouTubeUrl(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/);
    return match ? `https://youtube.com/watch?v=${match[1]}` : null;
}

// ==========================================
// 🔧 Common function — Naat download karne ke liye
// ==========================================
async function downloadNaat(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) return reply("❌ Please provide a Naat title or YouTube link!");

        // Search Reaction
        await conn.sendMessage(from, { react: { text: "🔎", key: mek.key } });

        let searchQuery = q;
        let videoUrl = q;
        let vid;

        // Check agar input link hai ya text
        const isUrl = q.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g);

        if (isUrl) {
            // Agar link hai to details fetch karo
            const search = await yts({ videoId: q.split('v=')[1] || q.split('/').pop() });
            vid = search;
            videoUrl = q;
        } else {
            // Agar naam search ho raha hai to "Naat" keyword add kar dein
            if (!q.toLowerCase().includes("naat")) {
                searchQuery = `${q} Naat`;
            }
            const search = await yts(searchQuery);
            if (!search || !search.videos.length) return reply("❌ No results found for this Naat.");
            vid = search.videos[0];
            videoUrl = vid.url;
        }

        // Preview Message
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail || vid.image },
            caption: `╭━━〔 🕌 𝗡𝗔𝗔𝗧 𝗙𝗢𝗨𝗡𝗗 〕━━━╮\n┃ 🎧 *Title* : ${vid.title}\n┃ ⏱️ *Duration* : ${vid.timestamp || 'N/A'}\n╰━━━━━━━━━━━━━━━━━╯\n\n⏳ *Downloading audio...*`
        }, { quoted: mek });

        // API Download
        const apiUrl = `${API_CONFIG.AUDIO_API}${encodeURIComponent(videoUrl)}&quality=mp3`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.url) {
            return reply("❌ API error! Try again later.");
        }

        // Sending Audio
        await conn.sendMessage(from, {
            audio: { url: data.result.url },
            mimetype: "audio/mpeg"
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.naat, .playnaat, .naatmp3)
// ==========================================
cmd({
    pattern: "naat",
    alias: ["playnaat", "naatmp3"],
    desc: "Download Naat via name or link.",
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
    await downloadNaat(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (naat, playnaat, naatmp3)
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

        // Naat triggers (bina prefix)
        const naatTriggers = ["naat", "playnaat", "naatmp3"];

        // Check: kya pehla word trigger hai?
        if (!naatTriggers.includes(firstWord)) return;

        // Baaki text (naat title ya link)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Naat download karo
        await downloadNaat(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Naat No-Prefix Error:", error);
    }
});
