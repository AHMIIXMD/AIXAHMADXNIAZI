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

// --- SONG COMMAND ---

cmd({
    pattern: "song",
    alias: ["play", "ytmp3"],
    desc: "Download songs via name or link.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song name or YouTube link!");

        // Search Reaction
        await conn.sendMessage(from, { react: { text: "🔎", key: mek.key } });

        let videoUrl = q;
        let vid;

        // Check agar input link hai ya name
        const isUrl = q.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g);

        if (isUrl) {
            // Agar link hai to details fetch karo
            const search = await yts({ videoId: q.split('v=')[1] || q.split('/').pop() });
            vid = search;
            videoUrl = q;
        } else {
            // Agar naam hai to search karo
            const search = await yts(q);
            if (!search || !search.videos.length) return reply("❌ No results found.");
            vid = search.videos[0];
            videoUrl = vid.url;
        }

        // Preview Message
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail || vid.image },
            caption: `╭━━〔 🎵 𝗠𝗨𝗦𝗜𝗖 𝗙𝗢𝗨𝗡𝗗 〕━━━╮\n┃ 🎧 *Title* : ${vid.title}\n┃ ⏱️ *Duration* : ${vid.timestamp || 'N/A'}\n╰━━━━━━━━━━━━━━━━━╯\n\n⏳ *Downloading audio...*`
        }, { quoted: mek });

        // API Download (Using updated audio API)
        const apiUrl = `${API_CONFIG.AUDIO_API}${encodeURIComponent(videoUrl)}&quality=mp3`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.url) {
            return reply("❌ API error! Try again later.");
        }

        // Sending Audio only
        await conn.sendMessage(from, {
            audio: { url: data.result.url },
            mimetype: "audio/mpeg"
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});
