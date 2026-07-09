import config from '../config.js';
import { cmd } from '../command.js';
import axios from 'axios';
import { getBuffer } from "../lib/functions.js";
import { videoToWebp } from '../lib/video-utils.js';
import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Telegram Sticker API configuration
const stickerAPI = {
    baseURL: "https://jawad-tech.vercel.app/tgsticker"
};

cmd({
    pattern: "tsticker",
    alias: ["tg", "tgs", "tgstick", "telegramsticker"],
    react: "🛡️",
    desc: "Download Telegram sticker pack",
    category: "download",
    use: ".tstick <telegram_sticker_url>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, quoted, isCreator }) => {
    try {
        // Owner restriction
        if (!isCreator) {
            return await reply("📛 This is an owner command.");
        }

        if (!q) return await reply("❌ Please provide a Telegram sticker pack URL!\nExample: .tstick https://t.me/addstickers/packname");

        // Validate Telegram sticker URL
        if (!q.includes('t.me/addstickers/') && !q.includes('telegram.me/addstickers/')) {
            return await reply("❌ Please provide a valid Telegram sticker pack URL!\nIt should look like: https://t.me/addstickers/packname");
        }

        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });
        
        await reply("📦 Downloading sticker pack... Please wait!");

        // Get sticker pack data from API
        const apiUrl = `${stickerAPI.baseURL}?url=${encodeURIComponent(q)}`;
        
        const res = await axios.get(apiUrl, {
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'accept': '*/*'
            }
        });

        if (!res.data || !res.data.status || !res.data.result || !res.data.result.stickers) {
            return await reply("❌ Failed to fetch sticker pack. Invalid URL or API error.");
        }

        const stickerData = res.data.result;
        const stickers = stickerData.stickers;

        if (!stickers || stickers.length === 0) {
            return await reply("❌ No stickers found in this pack!");
        }

        // Send sticker pack info
        await reply(`📦 *Sticker Pack Info*\n\n` +
                   `*Name:* ${stickerData.name || 'N/A'}\n` +
                   `*Title:* ${stickerData.title || 'N/A'}\n` +
                   `*Type:* ${stickerData.sticker_type || 'regular'}\n` +
                   `*Stickers:* ${stickers.length}\n\n` +
                   `⏳ Processing stickers...`);

        let sentCount = 0;
        let failedCount = 0;
        const totalStickers = stickers.length;
        let pack = "𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 ⿻⃮͛ 🏴‍☠️💀";

        // Send each sticker
        for (const [index, sticker] of stickers.entries()) {
            try {
                const stickerUrl = sticker.image_url;
                const fileExtension = stickerUrl.split('.').pop().toLowerCase();
                
                // Detect sticker type from file extension
                if (fileExtension === 'webp') {
                    // Static WebP sticker - send directly
                    await conn.sendMessage(from, {
                        sticker: { url: stickerUrl }
                    }, { quoted: mek });
                    
                } else if (fileExtension === 'tgs' || fileExtension === 'webm') {
                    // Animated sticker - TGS or WEBM
                    // Download, convert to WebP and send as animated sticker
                    try {
                        const videoBuffer = await getBuffer(stickerUrl);
                        
                        // Convert video to WebP sticker
                        const webpBuffer = await videoToWebp(videoBuffer);
                        
                        // Create sticker with proper metadata
                        let stickerObj = new Sticker(webpBuffer, {
                            pack: pack, 
                            type: StickerTypes.FULL,
                            categories: ["🤩", "🎉"], 
                            id: "12345",
                            quality: 75, 
                            background: 'transparent',
                        });
                        
                        const buffer = await stickerObj.toBuffer();
                        await conn.sendMessage(from, { 
                            sticker: buffer 
                        }, { quoted: mek });
                        
                    } catch (convertError) {
                        console.error(`[TSTICK] Conversion failed for sticker ${index + 1}:`, convertError.message);
                        // Fallback: send as document
                        await conn.sendMessage(from, {
                            document: { url: stickerUrl },
                            fileName: `sticker_${index + 1}.${fileExtension}`,
                            mimetype: 'application/octet-stream'
                        }, { quoted: mek });
                    }
                    
                } else {
                    // Unknown format - try as image first, then document
                    try {
                        await conn.sendMessage(from, {
                            image: { url: stickerUrl }
                        }, { quoted: mek });
                    } catch (imageError) {
                        await conn.sendMessage(from, {
                            document: { url: stickerUrl },
                            fileName: `sticker_${index + 1}.${fileExtension}`,
                            mimetype: 'application/octet-stream'
                        }, { quoted: mek });
                    }
                }
                
                sentCount++;
                
                // Delay between stickers (no progress messages)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
            } catch (stickerError) {
                console.error(`[TSTICK] Error sending sticker ${index + 1}:`, stickerError.message);
                failedCount++;
                // Continue with next sticker even if one fails
            }
        }

        // ✅ React - success
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        
        const resultMessage = `✅ Sticker pack download completed!\n\n` +
                             `*Pack:* ${stickerData.name || 'Unknown'}\n` +
                             `*Success:* ${sentCount}/${totalStickers}\n` +
                             `*Failed:* ${failedCount}\n` +
                             (failedCount > 0 ? `\nNote: Some animated stickers may have failed to convert.` : '');
        
        await reply(resultMessage);

    } catch (error) {
        console.error('[TSTICK] Command Error:', error?.message || error);
        await reply("❌ Download failed: " + (error?.message || 'Unknown error'));
    }
});
