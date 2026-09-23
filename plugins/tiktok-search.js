// Ahmad Tech

import { cmd } from "../command.js";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "tiktoksearch",
    alias: ["tiktoks", "tiks", "ttsearch"],
    desc: "Search for TikTok videos using a query",
    react: '🚀',
    category: 'download',
    use: ".tiktoksearch <query>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🔍 Please provide a search query\nExample: .tiktoksearch Moye Moye");
        }

        await reply(`🔎 Searching TikTok for: "${query}"...`);
        
        // Using the new API endpoint
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate response based on the provided JSON structure
        if (!data?.meta || !data.meta.length) {
            return reply("❌ No TikTok videos found. Try different keywords");
        }
        
        const results = data.meta;
        
        // Get up to 5 random videos
        const selectedVideos = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
        
        for (const video of selectedVideos) {
            // Format the caption
            const caption = `📱 *TikTok Video*\n\n` +
                          `*🎵 Title*: ${video.title || 'No Title'}\n` +
                          `*👤 Author*: ${video.author?.nickname || 'Unknown'}\n` +
                          `*⏱️ Duration*: ${video.duration || 0}s\n` +
                          `*❤️ Likes*: ${video.like?.toLocaleString() || '0'}\n` +
                          `*💬 Comments*: ${video.coment?.toLocaleString() || '0'}\n` +
                          `*🔁 Shares*: ${video.share?.toLocaleString() || '0'}\n` +
                          `*🌐 Region*: ${video.region || 'Unknown'}\n\n` +
                          `> *© Powered by AHMAD-MD*`;
            
            if (video.hd) {
                await conn.sendMessage(
                    from,
                    { 
                        video: { url: video.hd },
                        caption: caption
                    },
                    { quoted: mek }
                );
            } else {
                reply(`❌ Failed to retrieve video for: "${video.title || 'Unknown'}"`);
            }
            
            // Add delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
    } catch (error) {
        console.error('TikTok Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch TikTok videos"}`);
    }
});

cmd({
    pattern: "tiktoksearch2",
    alias: ["tiktoks2", "tiks2"],
    react: "🔍",
    desc: "🔎 Search for TikTok videos",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ *Please provide a search query!*\n\nExample: `.tiktoksearch trending songs`");

        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        await reply(`🔍 *Searching TikTok for:* ${q}`);

        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(q)}`);
        const data = await response.json();

        if (!data || !data.data || data.data.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await reply("❌ *No TikTok videos found for your query.*\nTry a different keyword.");
        }

        // Get up to 5 random results
        const results = data.data.slice(0, 5).sort(() => Math.random() - 0.5);
        
        let successCount = 0;
        
        for (const video of results) {
            try {
                const caption = `🎵 *${video.title || 'TikTok Video'}*\n\n👤 Author: ${video.author || 'Unknown'}\n⏱️ Duration: ${video.duration || "Unknown"}\n🔗 URL: ${video.link}\n\n_Powered by AHMAD-MD-BOT_`;

                if (video.nowm) {
                    await conn.sendMessage(from, {
                        video: { url: video.nowm },
                        caption: caption
                    }, { quoted: mek });
                    successCount++;
                    
                    // Small delay between sends
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (videoError) {
                console.error(`Error sending video ${video.title}:`, videoError);
                // Continue with next video
            }
        }

        if (successCount > 0) {
            // ✅ React - success
            await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        } else {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            await reply("❌ *Failed to download any videos.*\nThe API might be temporarily unavailable.");
        }

    } catch (error) {
        console.error("Error in TikTokSearch command:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply("❌ *An error occurred while searching TikTok.*\nPlease try again later.");
    }
});
