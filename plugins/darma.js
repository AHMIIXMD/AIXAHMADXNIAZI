import { cmd } from '../command.js';
import axios from 'axios';

cmd({
    pattern: "drama",
    alias: ["ytvideo", "video"],
    desc: "YouTube video downloader",
    category: "download",
    react: "📥",
    filename: import.meta.url
},
async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) {
            return reply("❌ Please send YouTube link\n\nExample:\n.drama https://youtu.be/dQw4w9WgXcQ");
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

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

        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.log(e);
        reply("❌ Error downloading video");
    }

});
