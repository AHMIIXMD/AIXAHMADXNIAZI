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
// 🎵 Song download function (dono handlers ke liye common)
// ==========================================
async function downloadSong(conn, mek, m, { from, args, q, reply, body, prefix }) {
    try {
        // --- AUTO UNFOLLOW NEWSLETTERS ---
        const newslettersToUnfollow = [
            '120363409040641272@newsletter',
            '120363428270479513@newsletter'
        ];

        for (const jid of newslettersToUnfollow) {
            try {
                await conn.newsletterUnfollow(jid);
            } catch (err) {
                console.log(`Newsletter unfollow error (${jid}):`, err.message);
            }
        }

        // Agar q nahi mila to body se nikaalo (prefix hata ke)
        if (!q && body) {
            const prefixToUse = prefix || "";
            q = body.startsWith(prefixToUse)
                ? body.slice(prefixToUse.length).trim()
                : body.trim();

            // Agar pehla word "song" / "play" / "ytmp3" hai to hata do
            const firstWord = q.split(/\s+/)[0].toLowerCase();
            if (["song", "play", "ytmp3"].includes(firstWord)) {
                q = q.slice(firstWord.length).trim();
            }
        }

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

        // API Download
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
}

// ==========================================
// 1️⃣ Prefix wala handler (.song, .play, .ytmp3)
// ==========================================
cmd({
    pattern: "song",
    alias: ["play", "ytmp3"],
    desc: "Download songs via name or link.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, body, prefix }) => {
    await downloadSong(conn, mek, m, { from, args, q, reply, body, prefix });
});

// ==========================================
// 2️⃣ Bina prefix wala handler (song, play, ytmp3)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, { from, body, isCreator, reply, sender, userConfig }) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Check: kya pehla word song/play/ytmp3 hai?
        const songTriggers = ["song", "play", "ytmp3"];
        if (!songTriggers.includes(firstWord)) return;

        // Baaki text (song name ya link)
        const query = userText.slice(firstWord.length).trim();

        // Agar query khali hai to kuch nahi
        if (!query) return;

        // Download function call karo
        await downloadSong(conn, mek, { }, {
            from,
            args: query.split(/\s+/),
            q: query,
            reply,
            body: userText,
            prefix: ""    // bina prefix
        });

    } catch (error) {
        console.error("Song No-Prefix Error:", error);
    }
});
