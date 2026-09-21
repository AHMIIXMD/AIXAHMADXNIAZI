import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — TikTok #1 (multi-API)
// ==========================================
async function downloadTikTok1(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt link");

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        let videoUrl, title, author, username;

        // Try First API
        try {
            const api1 = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
            const res1 = await axios.get(api1);
            const data1 = res1.data;

            if (data1?.status && data1?.result) {
                videoUrl = data1.result;
                title = data1.metadata?.title || "Unknown Title";
                author = data1.metadata?.author || "Unknown Author";
                username = data1.metadata?.username || "unknown";
            } else {
                throw new Error("First API failed");
            }
        } catch (api1Error) {
            // Try Second API
            try {
                const api2 = `https://jawad-tech.vercel.app/download/ttdl?url=${encodeURIComponent(q)}`;
                const res2 = await axios.get(api2);
                const data2 = res2.data;

                if (data2?.status && data2?.result) {
                    videoUrl = data2.result;
                    title = data2.metadata?.title || "Unknown Title";
                    author = data2.metadata?.author?.nickname || data2.metadata?.author || "Unknown Author";
                    username = data2.metadata?.author?.username?.replace('@', '') || "unknown";
                } else {
                    throw new Error("Second API also failed");
                }
            } catch (api2Error) {
                return await reply("❌ Both APIs failed! Try again later.");
            }
        }

        if (!videoUrl) return await reply("❌ Download failed! No video URL found.");

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `🎵 ${title}\n👤 *Author:* ${author}\n⚡ *Username:* @${username}\n\n> *Powered by AHMAD-MD ✅*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in .tiktok:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 🔧 Common function — TikTok #2
// ==========================================
async function downloadTikTok2(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt2 link");

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const api = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result)
            return await reply("❌ Download failed! Try again later.");

        const meta = json.metadata;

        await conn.sendMessage(from, {
            video: { url: json.result },
            mimetype: 'video/mp4',
            caption: `🎵 *${meta.title}*\n👤 *Author:* ${meta.author}\n📱 *Username:* @${meta.username}\n🌍 *Region:* ${meta.region}\n\n✨ *Powered by AHMAD Tech*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in .tiktok2:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 🔧 Common function — TikTok #3 (HD + stats)
// ==========================================
async function downloadTikTok3(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt3 link");

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const api = `https://jawad-tech.vercel.app/download/ttdl?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result)
            return await reply("❌ Download failed! Try again later.");

        const meta = json.metadata;

        const caption = `
🎬 *${meta.title}*

👤 *Author:* ${meta.author.nickname} (${meta.author.username})
🎵 *Music:* ${meta.music.title}
💿 *By:* ${meta.music.author}

📊 *Stats:*
   • Views: ${meta.stats.views}
   • Likes: ${meta.stats.likes}
   • Shares: ${meta.stats.shares}
   • Comments: ${meta.stats.comments}
   • Downloads: ${meta.stats.downloads}

🌍 *Region:* ${meta.region}
🕒 *Duration:* ${meta.duration}s
📅 *Published:* ${meta.published}

✨ *Powered By AHMAD Tech*
        `.trim();

        await conn.sendMessage(from, {
            video: { url: json.result },
            mimetype: 'video/mp4',
            caption
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in .tiktok3:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.tiktok, .tt, .ttdl)
// ==========================================
cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Download TikTok video using multiple APIs",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadTikTok1(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Prefix wala handler (.tiktok2, .tt2, .ttdl2)
// ==========================================
cmd({
    pattern: "tiktok2",
    alias: ["tt2", "ttdl2"],
    desc: "Download TikTok video using JawadTech API",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadTikTok2(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 3. Prefix wala handler (.tiktok3, .tt3, .ttdl3)
// ==========================================
cmd({
    pattern: "tiktok3",
    alias: ["tt3", "ttdl3"],
    desc: "Download HD TikTok videos using JawadTechXD API",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadTikTok3(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 4. Bina prefix wala handler
// (tiktok, tt, ttdl, tiktok2, tt2, ttdl2, tiktok3, tt3, ttdl3)
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

        // Triggers
        const tt1Triggers = ["tiktok", "tt", "ttdl"];
        const tt2Triggers = ["tiktok2", "tt2", "ttdl2"];
        const tt3Triggers = ["tiktok3", "tt3", "ttdl3"];

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // TikTok #1
        if (tt1Triggers.includes(firstWord)) {
            await downloadTikTok1(conn, mek, { }, { from, q: query, reply: replyFn });
            return;
        }

        // TikTok #2
        if (tt2Triggers.includes(firstWord)) {
            await downloadTikTok2(conn, mek, { }, { from, q: query, reply: replyFn });
            return;
        }

        // TikTok #3
        if (tt3Triggers.includes(firstWord)) {
            await downloadTikTok3(conn, mek, { }, { from, q: query, reply: replyFn });
            return;
        }

    } catch (error) {
        console.error("TikTok No-Prefix Error:", error);
    }
});
