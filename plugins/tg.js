import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd } from '../command.js';
import axios from 'axios';
import { getBuffer } from "../lib/functions.js";
import { videoToWebp } from '../lib/video-utils.js';
import { Sticker, StickerTypes } from "wa-sticker-formatter";

const __filename = fileURLToPath(import.meta.url);

// Telegram Bot Token
const BOT_TOKEN = '8717187428:AAHo9IgdtcQztOT572ixLJNSliFSulA_30M';

cmd({
    pattern: "tsticker",
    alias: ["tg", "tgs", "tgstick", "telegramsticker"],
    react: "🛡️",
    desc: "Download Telegram sticker pack",
    category: "download",
    use: ".tstick <telegram_sticker_url>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, isCreator }) => {
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

        // Extract pack name from URL
        let packName = q.replace("https://t.me/addstickers/", "").replace("http://t.me/addstickers/", "").replace("https://telegram.me/addstickers/", "").replace("http://telegram.me/addstickers/", "");
        packName = packName.split('?')[0].trim();

        if (!packName) {
            return await reply("❌ Invalid sticker pack URL!");
        }

        // Fetch sticker pack info from Telegram API
        const apiURL = `https://api.telegram.org/bot${BOT_TOKEN}/getStickerSet?name=${encodeURIComponent(packName)}`;
        
        const response = await axios.get(apiURL, {
            timeout: 30000,
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });

        const stickerSet = response.data;

        if (!stickerSet.ok || !stickerSet.result) {
            return await reply("❌ Sticker pack not found or invalid!");
        }

        // Process stickers to get download URLs
        const stickers = [];
        
        for (const sticker of stickerSet.result.stickers) {
            try {
                // Get file path for each sticker
                const fileResponse = await axios.get(
                    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${sticker.file_id}`
                );

                if (fileResponse.data.ok && fileResponse.data.result.file_path) {
                    const filePath = fileResponse.data.result.file_path;
                    const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
                    
                    stickers.push({
                        emoji: sticker.emoji || "❓",
                        is_animated: sticker.is_animated || false,
                        is_video: sticker.is_video || false,
                        image_url: imageUrl,
                        file_id: sticker.file_id
                    });
                }
            } catch (fileError) {
                console.error(`Error processing sticker ${sticker.file_id}:`, fileError.message);
                continue;
            }
        }

        if (stickers.length === 0) {
            return await reply("❌ No stickers found or could not process stickers!");
        }

        const stickerData = {
            name: stickerSet.result.name,
            title: stickerSet.result.title,
            sticker_type: stickerSet.result.sticker_type,
            is_animated: stickerSet.result.is_animated || false,
            is_video: stickerSet.result.is_video || false,
            stickers: stickers
        };

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
        let pack = "𝘼𝙃𝙈𝘼𝘿🚩";

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
