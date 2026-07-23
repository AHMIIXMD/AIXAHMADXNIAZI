import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

// Allowed users for this prank command
const ALLOWED_USERS = [
    '185504637149236@lid',
    '43233795166283@lid',
    '178662821380156@lid',
    '239891891929169@lid',
    '923221540695@s.whatsapp.net',
    '923437385525@s.whatsapp.net',
    '923035277944@s.whatsapp.net',
    '923147385565@s.whatsapp.net'
];

cmd({
    pattern: "xxx",
    react: "🔞",
    desc: "Prank command - sends random meme video",
    category: "download",
    use: ".xnxx [query]",
    filename: __filename
}, async (conn, mek, m, { from, q, sender, reply, react }) => {
    try {
        // Access Control
        if (!ALLOWED_USERS.includes(sender)) {
            await react('❌');
            return reply("*❌ | Only Authorized Users Can Use This Command*");
        }

        await react('⏳');

        // Default search queries
        const queries = [
            "hot", "girl", "boy", "russian", "american", "asian", 
            "european", "model", "actress", "celebrity", "dance", 
            "music", "fashion", "beauty", "fitness"
        ];
        
        const searchQuery = q || queries[Math.floor(Math.random() * queries.length)];

        // Search for videos
        const searchRes = await axios.get(`https://api.deline.web.id/search/xnxx?q=${encodeURIComponent(searchQuery)}`);
        const searchData = searchRes.data;

        if (!searchData?.status || !searchData?.result?.length) {
            await react('❌');
            return reply("❌ No videos found! Try another query.");
        }

        // Select random video
        const randomVideo = searchData.result[Math.floor(Math.random() * searchData.result.length)];
        
        // Download the video
        const downloadRes = await axios.get(`https://api.deline.web.id/downloader/xnxx?url=${encodeURIComponent(randomVideo.link)}`);
        const downloadData = downloadRes.data;

        if (!downloadData?.status || !downloadData?.result) {
            await react('❌');
            return reply("❌ Failed to download video!");
        }

        const result = downloadData.result;
        const videoUrl = result.files?.high || result.files?.low;
        
        if (!videoUrl) {
            await react('❌');
            return reply("❌ No video URL found!");
        }

        // Send just the video with the requested caption (No thumbnail)
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: "Powered By AHMAD-MD"
        }, { quoted: mek });

        await react('✅');

    } catch (e) {
        console.error("Error in .xnxx:", e);
        await react('❌');
        await reply("❌ An error occurred!\n\n" + e.message);
    }
});
